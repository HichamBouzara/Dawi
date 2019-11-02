import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
//import all the basic component we have used

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './pages/HomeScreen';
import SignInScreen from './pages/Authentification/SignInScreen';
import ScheduleScreen from './pages/Domicile/ScheduleScreen';
import DoctorScreen from './pages/Domicile/DoctorScreen';
import SignUpScreen from './pages/Authentification/SignUpScreen';
import UserInfoScreen from './pages/Authentification/UserInfoScreen';
import ConfirmationScreen from './pages/Authentification/ConfirmationScreen';
import AuthScreen from './pages/Authentification/AuthScreen';
import AuthLoadingScreen from './pages/Authentification/AuthLoadingScreen';
import Loading from './pages/Loading';

const AuthStack = createStackNavigator(
  {
    Auth: {screen: AuthScreen},
    SignIn: {screen: SignInScreen},
    SignUp: {screen: SignUpScreen},
    Confirmation: {screen: ConfirmationScreen},
    Loading: {screen: Loading},
    UserInfo: {screen: UserInfoScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'ffffff',
      },
      headerTintColor: '#707070',
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Schedule: {screen: ScheduleScreen},
    Doctor: {screen: DoctorScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'ffffff',
      },
      headerTintColor: '#707070',
    },
  },
);

const App = createBottomTabNavigator(
  {
    Historique: {screen: HomeStack},
    Accueil: {screen: HomeStack},
    Map: {screen: HomeStack},
  },
  {
    resetOnBlur: true,
    initialRouteName: 'Accueil',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Accueil') {
          return (
            <View
              style={{
                marginBottom: 15,
                width: 50,
                height: 50,
                borderRadius: 80 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderWidth: 3,
                borderColor: '#0093e9',
              }}>
              <Image
                source={
                  focused
                    ? require('./assets/images/accueil.png')
                    : require('./assets/images/accueil.png')
                }
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 40 / 2,
                }}
              />
            </View>
          );
        } else if (routeName === 'Historique') {
          return (
            <Image
              source={
                focused
                  ? require('./assets/images/history0.png')
                  : require('./assets/images/history.png')
              }
              style={{
                width: 25,
                height: 25,
                borderRadius: 40 / 2,
              }}
            />
          );
        } else if (routeName === 'Map') {
          return (
            <Image
              source={
                focused
                  ? require('./assets/images/map0.png')
                  : require('./assets/images/map.png')
              }
              style={{
                width: 25,
                height: 25,
                borderRadius: 40 / 2,
              }}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FA5CE4',
      inactiveTintColor: 'white',
      labelStyle: {
        paddingBottom: 5,
        fontWeight: 'bold',
      },
      inactiveBackgroundColor: '#0093e9',
      activeBackgroundColor: '#0093e9',
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: App,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
