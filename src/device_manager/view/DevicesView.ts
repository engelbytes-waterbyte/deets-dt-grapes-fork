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
      <span changeDeviceToDesktop class="${ppfx}pn-btn fa fa-desktop text-gray-200"></span>
      <span changeDeviceToDeetsTerminal class="${ppfx}pn-btn text-gray-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.50671 18.3228V9.01045C4.50671 8.66605 4.59483 8.32739 4.76267 8.02666L8.06844 2.10383C8.36878 1.56572 8.89848 1.19428 9.50673 1.09526L13.4342 0.455905C14.0154 0.361288 14.5713 0.523782 14.9956 0.85311L14.997 0.850363L15.0543 0.900461C15.0766 0.919091 15.0984 0.938195 15.1199 0.95776L18.8117 4.18549L18.811 4.18687C19.2345 4.55427 19.5068 5.09678 19.5068 5.71164V20.7225C19.5068 21.7448 18.7426 22.6056 17.7275 22.7268L10.4942 23.5905C9.86543 23.6656 9.27621 23.4443 8.85744 23.0428L5.29513 19.9233C4.81818 19.5562 4.50671 18.9796 4.50671 18.3228ZM9.31941 2.42506C9.10599 2.24384 8.78019 2.30263 8.64357 2.54702L5.60076 7.99018C5.4971 8.17562 5.53912 8.4085 5.70107 8.54601L8.34957 10.7949C8.563 10.9762 8.88879 10.9174 9.02541 10.673L12.0682 5.22982C12.1719 5.04437 12.1299 4.8115 11.9679 4.67398L9.31941 2.42506Z"
          />
        </svg>
      </span>
      <span changeDeviceToMobile class="${ppfx}pn-btn fa fa-mobile"></span>
    `;
  }

  events() {
    return {
      change: 'updateDevice',
      'click [data-add-trasp]': 'startAdd',
      'click [changeDeviceToDesktop]': 'changeDeviceToDesktop',
      'click [changeDeviceToDeetsTerminal]': 'changeDeviceToDeetsTerminal',
      'click [changeDeviceToMobile]': 'changeDeviceToMobile',
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
