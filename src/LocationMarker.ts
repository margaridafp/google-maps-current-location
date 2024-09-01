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
  innerCircle: google.maps.marker.AdvancedMarkerElement | null = null;
  outerCircle: google.maps.Circle | null = null;

  constructor(map: google.maps.Map, options: Options = {}) {
    this.map = map;
    this.options = options;

    this.initMarker();
  }

  private async loadMarkerClasses() {
    try {
      const {AdvancedMarkerElement} = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;
      return {AdvancedMarkerElement};
    } catch (error) {
      console.warn('Dynamic import failed, falling back to static imports', error);
      return {
        AdvancedMarkerElement: google.maps.marker.AdvancedMarkerElement,
      };
    }
  }

  private async initMarker() {
    const {AdvancedMarkerElement} = await this.loadMarkerClasses();
    const {markerStyle} = this.options;

    const markerElement = document.createElement('div');
    markerElement.style.backgroundColor = markerStyle?.fillColor ?? MARKER_DEFAULT_COLOR;
    markerElement.style.borderRadius = '50%';
    markerElement.style.width = `${markerStyle?.scale ?? 12}px`;
    markerElement.style.height = `${markerStyle?.scale ?? 12}px`;
    markerElement.style.border = `${markerStyle?.strokeWeight ?? 2}px solid ${markerStyle?.strokeColor ?? 'white'}`;

    const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
      map: this.map,
      gmpClickable: markerStyle?.clickable ?? false,
      gmpDraggable: markerStyle?.draggable ?? false,
      zIndex: 3,
      content: markerElement,
    };

    this.innerCircle = new AdvancedMarkerElement(markerOptions);

    this.outerCircle = new google.maps.Circle({
      map: this.map,
      fillColor: this.options.markerStyle?.fillColor ?? MARKER_DEFAULT_COLOR,
      fillOpacity: 0.1,
      strokeWeight: 0,
    });

    this.innerCircle.addListener('position_changed', () => {
      const position = this.innerCircle?.position;
      if (position && this.outerCircle) {
        this.outerCircle.setCenter(position);
      }
    });
  }

  /**
   * Updates marker position in the map.
   * @param pos Marker position
   * @param moveToCenter If true, the map is centered on the marker positions
   */
  update(pos: GeolocationPosition, moveToCenter = false): void {
    const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    if (this.innerCircle) {
      this.innerCircle.position = latLng;
    }
    if (!this.options.showAccuracyRadius && this.outerCircle) {
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
    const pos = this.innerCircle?.position;
    if (pos) {
      this.map.setCenter(pos);
    }
  }
}

