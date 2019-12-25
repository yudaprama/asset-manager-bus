import React, { Component } from 'react';
import {
  Image,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Updating from '../libs/Updating'
import Icon from './Icon'
import Img from './Img'

let tambahan = (left,tintColor,imageName) => ({
  s:[styles.backRightBtn, {left:left}],
  style: [styles.icon, {tintColor:tintColor}],
  source: Img(imageName)
})

export default ({onHiddenLeft,onHiddenMiddle,onHiddenRight,backgroundColor,tintColor,iconMiddle}) => (
  <View style={[styles.rowBack,{backgroundColor:backgroundColor}]}>
    <Icon {...tambahan(0,tintColor,'garbage')} onPress={()=> onHiddenLeft()} />
    <Icon {...tambahan(50,tintColor,iconMiddle)} onPress={()=> onHiddenMiddle()} />
    <Icon {...tambahan(100,tintColor,'light-bulb')} onPress={()=> onHiddenRight()} />
  </View>
)

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    width:25, 
    height:25
  },
  backRightBtn: {
    alignItems: 'center',
    flex: 1,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  }
});