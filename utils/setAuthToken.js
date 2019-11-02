import axios from 'axios';
import {AsyncStorage} from 'react-native';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Content-type'] = `application/json`;
    axios.defaults.headers.common['X-CSRFToken'] = `${token}`;
    AsyncStorage.setItem('userToken', token);
  } else {
    delete axios.defaults.headers.common['X-CSRFToken'];
  }
};

export default setAuthToken;
