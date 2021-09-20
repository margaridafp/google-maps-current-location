# Google Maps Current Location Marker

Add current location marker to your Google Maps. 

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

Props
--------------------------------------------------------------------------------

#### Required

Prop | Description
---- | -----------
`map`| google.maps.Map <br/>Check out how to configure it [here](https://developers.google.com/maps/documentation/javascript/overview).


#### Optional


**buttonStyle**: configures the css and positioning of the button displayed over the map.

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