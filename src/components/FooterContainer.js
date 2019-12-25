import React from 'react';
import {
	Text,
	TouchableOpacity,
	Image,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import FooterLabel from './FooterLabel'
import Icon from './Icon'
let borderTop = {borderTopWidth:1}
var height = {height:50}

export default ({width,onPress,containerStyle,iconStyle,color,text,source}) => (
	<View style={[height, borderTop, containerStyle, {width:width}]}>
	  <TouchableOpacity style={[height, styles.containerLabel]} onPress={()=> onPress()}>
    	<Icon onPress={()=> onPress()} style={iconStyle} source={{uri:`https://cdn.rawgit.com/namestise/data/master/img/${source}.png`}} />
    	<FooterLabel color={color} text={text} />
	  </TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	containerLabel: {
		flex:1,
		flexDirection: 'row', 
		backgroundColor:'transparent', 
		justifyContent:'center'
	}
});