import {MarkerStyle} from './types';

const MARKER_DEFAULT_COLOR = '#4A89F3';

type Options = {
  /**
   * Use a custom style for the marker
   */
  markerStyle?: MarkerStyle,
  /**
   * If true, a shape that grows with position accuracy is showed
   */
  showAccuracyRadius?: boolean
}

export default class LocationMarker {
  map: google.maps.Map;
  options: Options;
  innerCircle: google.maps.Marker;
  outerCircle: google.maps.Circle;

  constructor(map: google.maps.Map, options: Options = {}) {
    this.map = map;
    this.options = options;

    const {markerStyle} = options;

    this.innerCircle = new google.maps.Marker({
      map,
      'clickable': markerStyle?.clickable ?? false,
      'cursor': markerStyle?.cursor ?? 'pointer',
      'draggable': markerStyle?.draggable ?? false,
      'icon': {
        'path': google.maps.SymbolPath.CIRCLE,
        'fillColor': markerStyle?.fillColor ?? MARKER_DEFAULT_COLOR,
        'fillOpacity': 1,
        'scale': markerStyle?.scale ?? 6,
        'strokeWeight': markerStyle?.strokeWeight ?? 2,
        'strokeColor': markerStyle?.strokeColor ?? 'white',
      },
      'optimized': false,
      'zIndex': 3,
    });

    this.outerCircle = new google.maps.Circle({
      map,
      fillColor: options.markerStyle?.fillColor ?? MARKER_DEFAULT_COLOR,
      fillOpacity: 0.1,
      strokeWeight: 0,
    });
    this.outerCircle.bindTo('center', this.innerCircle, 'position');
  }

  /**
   * Updates marker position in the map.
   * @param pos Marker position
   * @param moveToCenter If true, the map is centered on the marker positions
   */
  update(pos: GeolocationPosition, moveToCenter = false): void {
    const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    this.innerCircle.setPosition(latLng);
    if (!this.options.showAccuracyRadius) {
      this.outerCircle.setCenter(latLng);
      this.outerCircle.setRadius(pos.coords.accuracy);
    }

    if (moveToCenter) {
      this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    }
  }

  /**
   * Centers map on current marker position
   */
  center():void {
    const pos = this.innerCircle.getPosition();
    if (pos) {
      this.map.setCenter(pos);
    }
  }
}

