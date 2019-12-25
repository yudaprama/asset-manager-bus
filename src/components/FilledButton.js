import React from 'react';
import {
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import Img from './Img'
import Icon from './Icon'

export default ({onPress, style, priceString, titleStyle}) => (
	<TouchableOpacity
	  onPress={()=> onPress()}
	  underlayColor='#007655'
	  style={[styles.buttonBack, style]}>
		  <Icon s={{paddingRight:20}} style={styles.icon} source={Img('cartplain')} />
		  <Text style={[styles.buttonText, titleStyle]}>{priceString}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'transparent',
    fontFamily:'AppleSDGothicNeo-Regular',
    fontSize: 16,
    textAlign: 'center'
  },
  icon: {
    width:30, 
    height:30,
    tintColor:'white'
  },
  buttonBack: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    borderRadius: 4
  }
});