import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import ListText from './ListText'
import FormatNumber from '../libs/FormatNumber'

export default ({amount,number,dollar}) => (
	<View style={{flexDirection:'row', alignItems:'center'}}>
	  <ListText text={FormatNumber(amount)} style={number} />
	  <ListText text=' $' style={dollar} />
	</View>
)