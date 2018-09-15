import {checkStatus} from './application';

const SERVER_URL = `https://es.dump.academy/pixel-hunter/stats/`;

const APP_ID = 159374862;

const toJSON = (res) => res.json();

export default class Loader {

  static loadResults(name) {
    return fetch(`${SERVER_URL}${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
