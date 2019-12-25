import React from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

export default ({text,color}) => (
	<View style={{paddingLeft:5, alignSelf: 'center'}}>
    <Text style={[styles.text,{color:color||'grey'}]}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  text: {
  	textAlign:'center',
  	fontFamily: 'AppleSDGothicNeo-Regular'
  }
});