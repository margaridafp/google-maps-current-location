import LocationButton from './LocationButton';
import LocationMarker from './LocationMarker';
import {ButtonStyle, MarkerStyle} from './types';

type WatchPositionFnType = (successCallback: PositionCallback,
  errorCallback?: PositionErrorCallback | null, options?: PositionOptions) => number

export type Options = {
  buttonStyle?: ButtonStyle,
  markerStyle?: MarkerStyle,
  showAccuracyRadius?: boolean,
  watchPositionFn?: WatchPositionFnType,
}

/**
* Adds a button to the toolbar for user to click and see their current position
* on the map with a marker.
*/
class CurrentLocation {
  controlUI: LocationButton;
  locationMarker: LocationMarker;
  map: google.maps.Map;
  positionCount: number;
  positionOptions: PositionOptions;
  watchId: number;
  watchPositionFn: WatchPositionFnType;

  constructor(map: google.maps.Map, options: Options = {}) {
    this.map = map;

    this.positionOptions = {
      enableHighAccuracy: true,
    };

    this.locationMarker = new LocationMarker(map, options);
    this.controlUI = new LocationButton(map, options);

    this.positionCount = 0;
    this.watchId = 0;

    const defaultWatchPositionFn = (successCallback: PositionCallback,
        errorCallback?: PositionErrorCallback | null, options?: PositionOptions): number => {
      return navigator.geolocation.watchPosition(successCallback, errorCallback, options);
    };

    this.watchPositionFn = options.watchPositionFn || defaultWatchPositionFn;

    this.controlUI.setOnClickListener(() => {
      if (!this.watchId) {
        this.controlUI.setEnabled(false);
        this.controlUI.animate(true);

        this.startWatchPosition();
      } else {
        this.locationMarker.center();
      }
    });
  }

  /**
   * Starts watching for the user position.
   * This will be called automatically each time the position changes.
   * */
  startWatchPosition(): void {
    this.watchId = this.watchPositionFn((pos) => {
      this.updatePosition(pos);
    }, (err: GeolocationPositionError) => {
      throw err;
    }, this.positionOptions);
  }

  /**
   * Everytime the position changes, the location of the marker also changes
   * as well as some ControlUI settings
   * */
  updatePosition(pos: GeolocationPosition): void {
    this.locationMarker.update(pos, ++this.positionCount === 1);
    this.controlUI.setEnabled(true);
    this.controlUI.animate(false);
  }
}

export default function(map: google.maps.Map, options: Options = {}): CurrentLocation {
  return new CurrentLocation(map, options);
}
