import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {AsyncStorage} from 'react-native';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  UPDATE_USER,
  USER_LOADING,
  CONFIRM_USER,
  GET_CODE,
  SET_RDV,
  SUBSCRIBE_USER,
} from './types';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.withCredentials = true;
const URL = 'http://ec2-34-241-63-192.eu-west-1.compute.amazonaws.com/api';
const URL2 = 'http://aquinetic.pythonanywhere.com/api';
export const setRDV = date => dispatch => {
  dispatch({
    type: SET_RDV,
    payload: date,
  });
};
// Login - Get User Token
export const loginUser = (userData, navigation) => dispatch => {
  console.log('loging user');
  dispatch(setUserLoading());
  navigation.navigate('Loading');
  axios
    .post(`${URL}/sign_in`, JSON.stringify(userData), {
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(res => {
      console.log('login res', res);
      if (res.data.status !== 'error') {
        const {csrf_token, user} = res.data;
        const token = csrf_token;
        // Set token to ls
        AsyncStorage.setItem('userToken', token);
        // Set token to Auth header
        //setAuthToken(token);
        // Set current user
        dispatch(setCurrentUser(user));
        if (res.data.user.confirmed === 1) navigation.navigate('App');
        else navigation.navigate('Confirmation');
      } else {
        console.log('login res status error', res.data);
        dispatch(setCurrentUser({}));
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
        navigation.navigate('SignIn');
        alert(res.data.message);
      }
    })
    .catch(err => {
      if (err.request.status === 403) {
        console.log('login err 403', err);
        let token = err.request.responseHeaders['Set-Cookie'];
        token = token.split('=')[1].split(';')[0];
        //setAuthToken(token);
        axios
          .post(`${URL}/sign_in`, JSON.stringify(userData), {
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': `${token}`,
            },
          })
          .then(res => {
            console.log('login res after  403', res);
            const newToken = res.data.csrf_token;
            console.log('newToken', newToken);
            // Set token to ls
            AsyncStorage.setItem('userToken', newToken);
            // Set token to Auth header
            //setAuthToken(newToken);
            // Set current user
            dispatch(setCurrentUser(res.data.user));
            if (res.data.user.confirmed === 1) navigation.navigate('App');
            else navigation.navigate('Confirmation');
          })
          .catch(error => {
            console.log('login err after 403', error);
            dispatch(setCurrentUser({}));
            dispatch({
              type: GET_ERRORS,
              payload: error.data,
            });
            navigation.navigate('AuthLoading');
          });
        // logoutUser(navigation);
        // AsyncStorage.removeItem('userToken');
      } else {
        console.log('login err', err);
        dispatch(setCurrentUser({}));
        dispatch({
          type: GET_ERRORS,
          payload: err.data,
        });
        navigation.navigate('AuthLoading');
      }
    });
};

export const registerUser = (userData, navigation) => dispatch => {
  console.log('Registering User');
  dispatch(setUserLoading());
  navigation.navigate('Confirmation');
  axios
    .post(`${URL}/sign_up`, JSON.stringify(userData), {
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(result => {
      console.log('register res', result);
      const {status, verification_code} = result.data;
      if (status === 'success') {
        dispatch({
          type: GET_CODE,
          payload: verification_code,
        });
        axios
          .post(`${URL}/sign_in`, JSON.stringify(userData), {
            headers: {
              'Content-type': 'application/json',
            },
          })
          .then(res => {
            console.log('register login res', res);
            const {csrf_token, user} = res.data;
            const token = csrf_token;
            // Set token to ls
            AsyncStorage.setItem('userToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Set current user
            dispatch(setCurrentUser(user));
          })
          .catch(err => {
            if (err.request.status === 403) {
              console.log('register login err 403', err.request.status);
              let token = err.request.responseHeaders['Set-Cookie'];
              token = token.split('=')[1].split(';')[0];
              console.log('token', token);
              setAuthToken(token);
              axios
                .post(`${URL}/sign_in`, JSON.stringify(userData), {
                  headers: {
                    'Content-type': 'application/json',
                  },
                })
                .then(res => {
                  console.log('register login err 403 login res', res);
                  const newToken = res.data.csrf_token;
                  // Set token to ls
                  AsyncStorage.setItem('userToken', newToken);
                  // Set token to Auth header
                  setAuthToken(newToken);
                  // Set current user
                  dispatch(setCurrentUser(res.data.user));
                  navigation.navigate('Confirmation');
                })
                .catch(error => {
                  console.log('register login err 403 login err', error);
                  dispatch(setCurrentUser({}));
                  dispatch({
                    type: GET_ERRORS,
                    payload: error,
                  });
                  navigation.navigate('AuthLoading');
                });
              // logoutUser(navigation);
              // AsyncStorage.removeItem('userToken');
            } else {
              console.log('register login err 403 err', err);
              dispatch(setCurrentUser({}));
              dispatch({
                type: GET_ERRORS,
                payload: err,
              });
              navigation.navigate('AuthLoading');
            }
          });
      } else {
        console.log('register status !success', result);
        dispatch({
          type: GET_ERRORS,
          payload: result.data.message,
        });
        navigation.navigate('AuthLoading');
      }
    })
    .catch(err => {
      if (err.request.status === 403) {
        console.log('registration err 403', err.request.status);
        let token = err.request.responseHeaders['Set-Cookie'];
        token = token.split('=')[1].split(';')[0];
        setAuthToken(token);
        axios
          .post(`${URL}/sign_out`, null, {
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': `${token}`,
            },
          })
          .then(res => {
            console.log('registration err 403 sign out res', res);
            // Remove token from localStorage
            AsyncStorage.removeItem('userToken');
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}));
            navigation.navigate('Confirmation');
            axios
              .post(`${URL}/sign_up`, JSON.stringify(userData), {
                headers: {
                  'Content-type': 'application/json',
                },
              })
              .then(result => {
                console.log('registration err 403 signup res', result);
                const {status, verification_code} = result.data;
                if (status === 'success') {
                  dispatch({
                    type: GET_CODE,
                    payload: verification_code,
                  });
                  axios
                    .post(`${URL}/sign_in`, JSON.stringify(userData), {
                      headers: {
                        'Content-type': 'application/json',
                      },
                    })
                    .then(res => {
                      const {csrf_token, user} = res.data;
                      const token = csrf_token;
                      // Set token to ls
                      AsyncStorage.setItem('userToken', token);
                      // Set token to Auth header
                      setAuthToken(token);
                      // Set current user
                      dispatch(setCurrentUser(user));
                    });
                }
              })
              .catch(error => {
                console.log('register err 403 login err', error);
                dispatch(setCurrentUser({}));
                dispatch({
                  type: GET_ERRORS,
                  payload: error,
                });
                navigation.navigate('AuthLoading');
              });
          });
      } else {
        console.log('Registration err', err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
        navigation.navigate('AuthLoading');
      }
    });
};
// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Log user out
export const logoutUser = navigation => dispatch => {
  console.log('loging out user');
  dispatch(setUserLoading());
  navigation.navigate('Auth');
  AsyncStorage.getItem('userToken').then(token =>
    axios
      .post(`${URL}/sign_out`, null, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': `${token}`,
        },
      })
      .then(res => {
        console.log('logout res', res);
        const {status} = res.data;
        if (status === 'success') {
          navigation.navigate('Auth');
          console.log('logout success', status);
          // Remove token from localStorage
          AsyncStorage.removeItem('userToken');
          // Remove auth header for future requests
          setAuthToken(false);
          // Set current user to {} which will set isAuthenticated to false
          dispatch(setCurrentUser({}));
        } else {
          if (res.data.message === "pas d'utilisateur connecté") {
            navigation.navigate('Auth');
            console.log('logout success', status);
            // Remove token from localStorage
            AsyncStorage.removeItem('userToken');
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}));
          } else
            dispatch({
              type: GET_ERRORS,
              payload: res.data,
            });
        }
      })
      .catch(err => {
        console.log('logout err', err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      }),
  );
};

// Update User
export const updateUser = (user, navigation, next) => dispatch => {
  console.log('updating user', user);
  dispatch(setUserLoading());
  navigation.navigate(`${next}`);
  AsyncStorage.getItem('userToken').then(token =>
    axios
      .post(`${URL}/profile_update`, JSON.stringify(user), {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': `${token}`,
        },
      })
      .then(res => {
        const {status} = res.data;
        console.log('updateUser res status', status);
        if (status === 'success' || 'Success') {
          console.log('updateUser res', res.data);
          dispatch({
            type: UPDATE_USER,
            payload: res.data.user,
          });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: res.data.message,
          });
        }
      })
      .catch(err => {
        console.log('updateUser err', err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      }),
  );
};
// Set loading state
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Confirm User
export const confirmUser = (confirmation, navigation) => dispatch => {
  console.log('confirming user');
  AsyncStorage.getItem('userToken').then(token =>
    axios
      .post(`${URL}/confirm_email`, confirmation, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': `${token}`,
        },
      })
      .then(res => {
        const {status, user} = res.data;
        console.log('confirm email res', res);
        if (status === 'success') {
          if (confirmation.status === 1) {
            dispatch({
              type: CONFIRM_USER,
              payload: user,
            });
            navigation.navigate('UserInfo');
          } else {
            AsyncStorage.removeItem('userToken');
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}));
            navigation.navigate('AuthLoading');
          }
        }
      })
      .catch(err => {
        console.log('confirm email err', err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      }),
  );
};

// Subscribe User
export const subscribeUser = (confirmation, navigation, inApp) => dispatch => {
  console.log('subscribing user');
  AsyncStorage.getItem('userToken').then(token =>
    axios
      .post(`${URL}/code16_verification`, confirmation, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': `${token}`,
        },
      })
      .then(res => {
        console.log('subscribe res', res);
        const {status, user, message} = res.data;
        console.log('subscribe user success', res.data);
        if (status === 'success') {
          dispatch({
            type: SUBSCRIBE_USER,
            payload: user,
          });
          inApp
            ? navigation.navigate('Scanner')
            : navigation.navigate('UserInfo');
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: message,
          });
        }
      })
      .catch(err => {
        console.log('subscribe user err', err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      }),
  );
};
