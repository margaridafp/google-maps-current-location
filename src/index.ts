import LocationButton from './LocationButton';
import LocationMarker from './LocationMarker';
import {ButtonStyle, MarkerStyle} from './types';

export type Options = {
  buttonStyle?: ButtonStyle,
  markerStyle?: MarkerStyle,
  showAccuracyRadius?: boolean,
}

/**
* Adds a button to the toolbar for user to click and see their current position
* on the map with a marker.
*/
export default function addLocationMarker(
    map: google.maps.Map,
    options: Options = {},
): void {
  const positionOptions: PositionOptions = {
    enableHighAccuracy: true,
  };
  const locationMarker = new LocationMarker(map, options);
  const controlUI = new LocationButton(map, {buttonStyle: options.buttonStyle});

  let positionCount = 0;
  let watchId = 0;

  controlUI.setOnClickListener(() => {
    if (!watchId) {
      controlUI.setEnabled(false);
      controlUI.animate(true);

      watchId = navigator.geolocation.watchPosition((pos) => {
        locationMarker.update(pos, ++positionCount === 1);
        controlUI.setEnabled(true);
        controlUI.animate(false);
      }, (err: GeolocationPositionError) => {
        throw err;
      }, positionOptions);
    } else {
      locationMarker.center();
    }
  });
}
