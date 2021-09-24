import {ButtonStyle} from './types';

type Options = {
  buttonStyle?: ButtonStyle;
}

export default class LocationButton {
  map: google.maps.Map;
  options: Options;
  controlUI: HTMLButtonElement;
  controlInnerSymbol: HTMLDivElement;

  constructor(map: google.maps.Map, options: Options) {
    this.map = map;
    this.options = options;

    const {buttonStyle} = options;
    const translateSymbol = 'translateY(-50%) translateX(-50%)';

    const controlDiv = document.createElement('div');
    controlDiv.style.margin = buttonStyle?.mainMargin ?? '10px';

    this.controlUI = document.createElement('button');
    this.controlUI.style.backgroundColor = buttonStyle?.backgroundColor ?? '#fff';
    this.controlUI.style.border = buttonStyle?.border ?? 'none';
    this.controlUI.style.borderRadius = buttonStyle?.borderRadius ?? '0px';
    this.controlUI.style.outline = buttonStyle?.outline ?? 'none';
    this.controlUI.style.width = buttonStyle?.height ?? '40px';
    this.controlUI.style.height = buttonStyle?.height ?? '40px';
    this.controlUI.style.boxShadow = buttonStyle?.boxShadow ?? '0 1px 4px rgba(0,0,0,0.3)';
    this.controlUI.style.cursor = buttonStyle?.cursor ?? 'pointer';
    this.controlUI.style.padding = '0px';
    this.controlUI.style.display = 'flex';
    this.controlUI.title = 'Your Location';
    controlDiv.appendChild(this.controlUI);

    const controlOutterSymbol = document.createElement('img');
    // eslint-disable-next-line max-len
    controlOutterSymbol.src = `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224px%22%20fill%3D%22%23${buttonStyle?.symbolColor?.replace('#', '') ?? '6F6F6F'}%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20.94%2011c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83%203.52%203.52%206.83%203.06%2011H1v2h2.06c.46%204.17%203.77%207.48%207.94%207.94V23h2v-2.06c4.17-.46%207.48-3.77%207.94-7.94H23v-2h-2.06zM12%2019c-3.87%200-7-3.13-7-7s3.13-7%207-7%207%203.13%207%207-3.13%207-7%207z%22%2F%3E%3C%2Fsvg%3E`;
    controlOutterSymbol.style.height = '75%';
    controlOutterSymbol.style.position = 'absolute';
    controlOutterSymbol.style.top = '50%';
    controlOutterSymbol.style.left = '50%';
    controlOutterSymbol.style.transform = translateSymbol;
    this.controlUI.appendChild(controlOutterSymbol);

    this.controlInnerSymbol = document.createElement('div');
    this.controlInnerSymbol.style.backgroundColor = buttonStyle?.symbolColor ?? '#6F6F6F';
    this.controlInnerSymbol.style.height = '35%';
    this.controlInnerSymbol.style.width = '35%';
    this.controlInnerSymbol.style.borderRadius = '50%';
    this.controlInnerSymbol.style.position = 'absolute';
    this.controlInnerSymbol.style.top = '50%';
    this.controlInnerSymbol.style.left = '50%';
    this.controlInnerSymbol.style.transform = translateSymbol;

    this.controlUI.appendChild(this.controlInnerSymbol);

    if (buttonStyle?.buttonPosition) {
      map.controls[buttonStyle?.buttonPosition].push(controlDiv);
    } else {
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }
  }

  setEnabled(enable = true): void {
    this.controlUI.disabled = !enable;
  }

  /**
   * Starts/stops pulsing animation
   * @param enable If true, the animation starts
   */
  animate(enable: boolean): void {
    if (enable) {
      this.controlInnerSymbol.animate([
        {
          opacity: '1',
        },
        {
          opacity: '0',
        },
        {
          opacity: '1',
        },
      ], {
        duration: 1000,
        iterations: Infinity,
      });
    } else {
      const animations = this.controlInnerSymbol.getAnimations();
      if (animations.length > 0 && animations[0].playState === 'running') {
        animations[0].cancel();
      }
    }
  }

  setOnClickListener(cb: (this: GlobalEventHandlers, ev: MouseEvent) => void): void {
    this.controlUI.onclick = cb;
  }
}
