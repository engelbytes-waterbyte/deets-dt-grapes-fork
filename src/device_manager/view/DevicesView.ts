import { View } from '../../common';
import EditorModel from '../../editor/model/Editor';
import html from '../../utils/html';
import Devices from '../model/Devices';

export interface DevicesViewConfig {
  em: EditorModel;
  pStylePrefix?: string;
}

export default class DevicesView extends View {
  em: EditorModel;
  config: DevicesViewConfig;
  ppfx: string;
  devicesEl?: JQuery<HTMLElement>;

  template({ ppfx, label }: { ppfx: string; label: string }) {
    return html`
      <div class="${ppfx}field ${ppfx}devices-c bg-green-300">
        <span changeDeviceToDesktop class="${ppfx}pn-btn fa fa-desktop "></span>
        <span changeDeviceToDeetsTerminal class="${ppfx}pn-btn ">
          <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 17.8936V8.58125C0 8.23686 0.0881144 7.89819 0.255961 7.59746L3.56173 1.67463C3.86207 1.13652 4.39177 0.765082 5.00001 0.666065L8.92751 0.0267059C9.50873 -0.067911 10.0646 0.0945823 10.4889 0.42391L10.4903 0.421164L10.5476 0.471262C10.5699 0.489891 10.5917 0.508996 10.6131 0.528561L14.305 3.75629L14.3042 3.7577C14.7278 4.1251 15 4.6676 15 5.28244V20.2933C15 21.3156 14.2358 22.1765 13.2207 22.2977L5.98747 23.1613C5.35839 23.2364 4.76893 23.0149 4.35014 22.6131L0.788414 19.4941C0.311465 19.127 0 18.5504 0 17.8936ZM4.81273 1.99586C4.59931 1.81463 4.27352 1.87342 4.1369 2.11782L1.09408 7.56097C0.990418 7.74641 1.03244 7.97929 1.19439 8.1168L3.84289 10.3657C4.05632 10.5469 4.38211 10.4882 4.51873 10.2438L7.56154 4.80061C7.66521 4.61517 7.62319 4.38229 7.46124 4.24478L4.81273 1.99586Z"
              fill="black"
            />
          </svg>
        </span>
        <span changeDeviceToMobile class="${ppfx}pn-btn fa fa-mobile"></span>
      </div>
    `;
  }

  events() {
    return {
      change: 'updateDevice',
      'click [data-add-trasp]': 'startAdd',
      'click [changeDeviceToDesktop]': 'changeDeviceToDesktop',
      'click [changeDeviceToMobile]': 'changeDeviceToMobile',
      'click [changeDeviceToDeetsTerminal]': 'changeDeviceToDeetsTerminal',
    };
  }

  constructor(o: { config: DevicesViewConfig; collection: Devices }) {
    super(o);
    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';
    this.listenTo(this.em, 'change:device', this.updateSelect);
  }

  changeDeviceToDesktop() {
    console.log('lakjdfsf');
    const { em } = this;

    if (em) {
      const devEl = this.devicesEl;
      em.set('device', 'Desktop');
    }
  }

  changeDeviceToMobile() {
    console.log('lakjdfsasdf');
    const { em } = this;

    if (em) {
      const devEl = this.devicesEl;
      em.set('device', 'mobilePortrait');
    }
  }

  changeDeviceToDeetsTerminal() {
    console.log('lakjdfsf');
    const { em } = this;

    if (em) {
      const devEl = this.devicesEl;
      em.set('device', 'deetsTerminal');
    }
  }

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {}

  /**
   * Update device of the editor
   * @private
   */
  updateDevice() {
    const { em } = this;

    if (em) {
      const devEl = this.devicesEl;
      em.set('device', devEl ? devEl.val() : '');
    }
  }

  /**
   * Update select value on device update
   * @private
   */
  updateSelect() {
    console.log('klasjdfl');
    const { em, devicesEl } = this;

    if (em && em.getDeviceModel && devicesEl) {
      const device = em.getDeviceModel();
      devicesEl.val(device ? device.get('id') : '');
    }
  }

  /**
   * Return devices options
   * @return {string} String of options
   * @private
   */
  getOptions() {
    const { collection, em } = this;
    let result = '';

    collection.forEach(device => {
      const { name, id } = device.attributes;
      const label = (em && em.t && em.t(`deviceManager.devices.${id}`)) || name;
      result += `<option value="${id || name}">${label}</option>`;
    });

    return result;
  }

  render() {
    const { em, ppfx, $el, el } = this;
    const label = em && em.t && em.t('deviceManager.device');
    $el.html(this.template({ ppfx, label }));
    this.devicesEl = $el.find(`.${ppfx}devices`);
    this.devicesEl.append(this.getOptions());
    this.devicesEl.val(em.get('device'));
    el.className = `${ppfx}devices-c`;
    return this;
  }
}
