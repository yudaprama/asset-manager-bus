import React, { Component } from 'react';
import {
  Text,
  ListView,
  View
} from 'react-native';

export default ({adj}) => <View
  style={{
    paddingHorizontal:5,
    height: adj ? 4 : 1,
    backgroundColor: adj ? '#3B5998' : '#CCCCCC',
  }}
/>