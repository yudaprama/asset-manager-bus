import React from 'react';
import {
	Text,
	TouchableOpacity,
	Image,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import {BlurView} from 'react-native-blur';
import FooterContainer from './FooterContainer'
var height = {height:50}

export default (props) => props.blurry ? 
	<Blurry color='white' {...props} /> : 
	<Normal color='grey' {...props} />

let Normal = ({leftPress,rightPress,width,color}) => (
	<View style={styles.wrapper}>
		<FooterContainer
			width={width}
			onPress={()=> leftPress()}
			containerStyle={{borderRightWidth:1,borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source='diskette1'
			color={color} 
			text="Save" />
		<FooterContainer
			width={width}
			onPress={()=> rightPress()}
			containerStyle={{borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source='close'
			color={color} 
			text="Cancel" />
	</View>
)

let Blurry = ({leftPress,rightPress,width,color}) => (
	<BlurView blurType="light" style={[styles.wrapper,{bottom:0, position:'absolute'}]}>
		<FooterContainer
			width={width}
			onPress={()=> leftPress()}
			containerStyle={{borderRightWidth:1,borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source='add-button'
			color={color} 
			text="New Account" />
		<FooterContainer
			width={width}
			onPress={()=> rightPress()}
			containerStyle={{borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source='letter'
			color={color}
			text="Support" />
	</BlurView>
)

const styles = StyleSheet.create({
	wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'center',
    ...height
  }
});