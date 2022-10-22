const moment = require('moment');

const ACCESS_TOKEN_NAME = "accessToken";
const EXPIRED_TIME_NAME = "expiredTime";

export default {
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_NAME);
  },
  saveToken(token) {
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
  },
  getExpiredTime() {
    return localStorage.getItem(EXPIRED_TIME_NAME);
  },
  saveExpiredTime(expiredTime) {
    localStorage.setItem(EXPIRED_TIME_NAME, expiredTime);
  },
  removeAll() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(EXPIRED_TIME_NAME);
  },
  isExpired() {
    if (this.getToken() == null || this.getExpiredTime() == null)
      return true;

    const expiredTime = this.getExpiredTime();

    const expiredMoment = moment(expiredTime);
    let currentMoment = moment();

    const diffExpiredSeconds = moment.duration(expiredMoment.diff(currentMoment)).asSeconds();
    return diffExpiredSeconds <= 30;
  }
}
