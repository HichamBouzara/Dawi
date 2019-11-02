import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './pages/HomeScreen';
import SignInScreen from './pages/Authentification/SignInScreen';
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
  },
  {
    defaultNavigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: 'ffffff',
      },
      headerTintColor: '#fe116e',
    },
  },
);

const App = createStackNavigator(
  {
    Accueil: {screen: HomeStack},
  },
  {
    defaultNavigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: 'ffffff',
      },
      headerTintColor: '#fe116e',
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
