import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions
} from 'react-native';
import ListText from './ListText'
import Icon from './Icon'
import Img from './Img'

export default ({onPress,textLeft,textRight,rightIcon,switcher,switchValue,switching}) => (
	<TouchableOpacity style={styles.chapterContainer} onPress={()=> onPress()}>
	  <ListText stylev={styles.textContainer} text={textLeft} style="title" />
    {switcher ? 
      <Switch onTintColor='rgb(46,171,146)' onValueChange={(value)=> switching(value)} value={switchValue} /> : 
      <ListText stylev={styles.textContainer} text={textRight} style="titleRight" />}
	  {rightIcon ? 
      <Icon onPress={()=> onPress()} style={[styles.icon,{tintColor:'#CCCCCC'}]} source={Img('next')} /> : 
      null}
	</TouchableOpacity>
)

var styles = StyleSheet.create({
  chapterContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding:5
  },
  icon: {
    width:20, 
    height:20
  },
  textContainer: {
    flex:7,
    padding:5
  }
});