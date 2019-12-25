import React, {Component} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
// AsyncStorage.clear()

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.Main'
  },
  drawer: {
    left: {
      screen: 'example.SideMenu'
    },
    disableOpenGesture: true
  },
  passProps: {},
  animationType: 'slide-down'
});