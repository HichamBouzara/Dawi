//import errorReducer from './errorReducer';
import userReducer from './userReducer';
import {persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

export default persistCombineReducers(config, {
  //error: errorReducer,
  user: userReducer,
});
