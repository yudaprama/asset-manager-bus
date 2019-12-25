import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';

import FilledButton from './FilledButton'

export default ({priceString, style, onPress}) => (
	<View style={[styles.option, style]}>
	  <FilledButton
	    style={{backgroundColor:'#0ea378'}}
	    priceString={priceString}
	    titleStyle={{color:'white'}}
	    onPress={()=> onPress()}
	  />
	</View>
)

const styles = StyleSheet.create({
  option: {
    flex:1,
    paddingHorizontal: 3
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center'
  },
  countText: {
    fontSize: 50,
    fontWeight: '800',
  },
  greenText: {
    color: '#0ea378',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    marginBottom: 6,
  },
});