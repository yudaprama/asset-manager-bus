import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default (props) => props.stylev !== undefined ? <ViewText {...props} /> : <Teks {...props} />

let ViewText = ({text,style,stylev}) => (
  <View style={stylev}>
    <Teks text={text} style={style} />
  </View>
)

let Teks = ({text,style}) => (
  <Text numberOfLines={1} style={styles[style]}>
    {text}
  </Text>
)


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color:'#8E8E93'
  },
  titleRight: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Bold',
    color:'grey',
    textAlign:'right'
  },
  description: {
    fontSize: 12, 
    fontFamily: 'AppleSDGothicNeo-Regular',
    paddingBottom: 2,
    color:'rgb(46,171,146)'
  },
  number: {
  	fontSize:25, 
    fontFamily:'AppleSDGothicNeo-Thin'
  },
  dollar: {
    fontSize:14, 
    paddingRight:5,
    fontFamily:'AppleSDGothicNeo-Regular', 
    color:'#4A4A4A'
  },
  section: {
  	padding:5, 
  	fontSize:16, 
  	fontFamily: 'AppleSDGothicNeo-Medium', 
  	color:'#4A4A4A'
  },
  graph: {
  	fontFamily:'AppleSDGothicNeo-Regular', 
  	fontSize:20, 
  	color:'white', 
  	backgroundColor:'transparent'
  },
  thin: {
    fontFamily:'AppleSDGothicNeo-Thin', 
    fontSize:55, 
    color:'white', 
    backgroundColor:'transparent'
  },
  dollarThin: {
    fontFamily:'AppleSDGothicNeo-Thin', 
    fontSize:35, 
    color:'white', 
    backgroundColor:'transparent'
  },
  sideMenu: {
  	marginLeft:10, 
  	backgroundColor:'transparent', 
  	fontFamily: 'AppleSDGothicNeo-Medium', 
  	fontSize:20, 
  	color:'white'
  }
});