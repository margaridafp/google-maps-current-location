# Google Maps Current Location Marker

Click on *your location* and display the geographic location of a user or device on a Google map.

<p align="center">
    <img src="assets/readme/main-example.gif" />
</p>

- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

Usage
--------------------------------------------------------------------------------

Install the library: 
```sh
npm install google-maps-current-location
```


```js
import addLocationMarker from 'google-maps-current-location'

...
addLocationMarker(map)
```

or add it directly to your .html file: 

```html
  <script src="https://unpkg.com/google-maps-current-location"></script>
  
  <script>
    ...
    addCurrentLocation(map)
  </script>
```

Props
--------------------------------------------------------------------------------

#### Required

Prop | Description
---- | -----------
`map`| google.maps.Map <br/>Check out how to configure it [here](https://developers.google.com/maps/documentation/javascript/overview).


#### Optional


**buttonStyle**: configures the css and positioning of the button displayed over the map.

<p>
    <img width="50px" height="50px" src="assets/readme/current-location-button.png" />
</p>

Prop | Type  | Description | Default
---- | ----| ----------- | -------
`buttonPosition` | google.maps.ControlPosition | Position of button in relation with map. Check [here](https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning) to find out more. | google.maps.ControlPosition.RIGHT_BOTTOM
`mainMargin`| string |	The button's margin	| 10px
`backgroundColor`|string| The button's background color. All CSS3 colors are supported|#fff
`symbolColor`|string|The symbol's fill color. Only HEX color supported|#6F6F6F
`border`|string|The button's border|0px
`borderRadius`|string|The button's border radius|0px
`outline`|string|The button's outline|0px
`height`|string|The button's height (height===width)|40px
`boxShadow`|string|The button's boxShadow|0 1px 4px rgba(0,0,0,0.3)
`cursor`|string|Mouse cursor type to show on hover|pointer


**markerStyle**: configures the css of the marker displayed over the map, on the current location coordinates. To learn more about `google.maps.Marker` click [here](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions).

<p>
    <img width="100px" height="100px" src="assets/readme/current-location-marker.png" />
</p>

Prop | Type | Description | Default
---- | ----| ----------- | -------
`clickable`|boolean|If true, the marker receives mouse and touch events|false
`cursor`|string|Mouse cursor type to show on hover|pointer
`draggable`|boolean|If true, the marker can be dragged| false
`fillColor`|string|The symbol's fill color. All CSS3 colors are supported except for extended named colors|#4A89F3
`scale`|number|The amount by which the symbol is scaled in size|6
`strokeWeight`|number|The symbol's stroke weight|2
`strokeColor`|string|The symbol's stroke color. All CSS3 colors are supported except for extended named colors|white


**showAccuracyRadius**: boolean. If true, a shape that grows with position accuracy is showed.

Examples
--------------------------------------------------------------------------------

**React:**

```js
import React from 'react';
import addLocationMarker from 'google-maps-current-location'

export default function App() {

  React.useEffect(()=>{
    const mapEl = document.getElementById('map');
    if (!mapEl) {
      throw new Error('Cannot get map element');
    }

    const map = new google.maps.Map(mapEl, {
      center: new google.maps.LatLng(41.1493987, -8.1900724),
      zoom: 12,
      disableDefaultUI: true,
    });

    addLocationMarker(map)
  
  }, []);

  return (
    <div className="App">
      <div id="map" />
    </div>
  );
}
```

**Html:**

```html
<!DOCTYPE html>
<html>

  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script async
        src="https://maps.googleapis.com/maps/api/js?key=YOUR-KEY&callback=initMap&libraries=&v=weekly&lng=en"></script>
    <script src="https://unpkg.com/google-maps-current-location"></script>

    <script>
      let map;

      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            disableDefaultUI: true,
        });

        addCurrentLocation(map)
      }
    </script>
  </head>

  <body>
    <div id="map" style="height:500px; width:500px"></div>
  </body>

</html>
```