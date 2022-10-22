import jwt from '../common/jwt.js';

export default {
  requestRegisterUser(user, store) {
    const param = {
      email: user.email,
      password: user.password,
      name: user.name,
      phoneNumber: user.phoneNumber,
      businessNumber: user.businessNumber,

      storeName: store.storeName,
      storePhoneNumber: store.storePhoneNumber,
      address: store.storeAddress,
      zipcode: store.zipcode,
      latitude: store.latitude,
      longitude: store.longitude,
    }

    return axios.post("/user-service/api/owner/store-owner", param);
  },

  async requestLoginUser(email, password) {
    const user = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post("/user-service/login", user);
      const data = response.data.data;

      jwt.saveToken(data.accessToken);
      jwt.saveExpiredTime(data.expiredTime);

      axios.defaults.headers.common['Authorization'] = "Bearer " + data.accessToken;

      return true;
    } catch (err) {
      console.log("Error = ", err);
      return false;
    }

  },
  requestUserInfo() {
    return axios.get( '/user-service/store-owner');
  }
}

import axios from "axios";
