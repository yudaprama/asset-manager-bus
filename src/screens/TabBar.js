import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	Dimensions,
	StyleSheet,
	Image
} from 'react-native'
let halfWidth = Dimensions.get('window').width / 2
let halfWidthLeft = halfWidth - 50
let halfWidthRight = halfWidth + 50

export default ({rightColor,leftColor,change,add}) => (
	<View>
		<TouchableOpacity activeOpacity={1.0} style={styles.containerAddNew} onPress={(event)=>{
			let x = event.nativeEvent.pageX
			if (x < halfWidthLeft) {
				change(true)
			} else if (x > halfWidthRight) {
				change(false)
			} else if (x > halfWidthLeft && x < halfWidthRight) {
				add()
			};
		}}>
			<View style={styles.halfRound}>
				<View style={centering}>
					<Image style={styles.addIcon} source={{uri:'https://cdn.rawgit.com/namestise/data/master/img/add-button.png'}} />
				 </View>
				<Text style={styles.addNewText}>
				  New Asset
				</Text>
			</View>
		</TouchableOpacity>
		<View shadowRadius={25} shadowOffset={{height: 20}} shadowColor='black' shadowOpacity={1} style={styles.containerBetweenAddNew}>
			<Tab text="Assets" textStyle={styles.assetsText} iconStyle={styles.assetsIcon} color={leftColor} source='list' />
			<Tab text="Groups" textStyle={styles.groupsText} iconStyle={styles.groupsIcon} color={rightColor} source='processing' />
		</View>
	</View>
)

let Tab = ({text,iconStyle,textStyle,color,source}) => (
	<View style={styles.between}>
		<Image style={[iconStyle,{tintColor:color}]} source={{uri:`https://cdn.rawgit.com/namestise/data/master/img/${source}.png`}} />
		<Text style={[textStyle,{color:color}]}>
		  {text}
		</Text>
	</View>
)

let absoluteBottom = {
	position: 'absolute', 
	left: 0, 
	right: 0, 
	bottom: 0
}

let centerText = {
	left: 0, 
	right: 0, 
	bottom:1
}

let textStyle = {
	textAlign:'center', 
	position: 'absolute', 
	...centerText, 
	fontFamily:'AppleSDGothicNeo-Regular', 
	backgroundColor:'transparent'
}

let centering = {
	justifyContent: 'center', 
	alignItems: 'center'
}

const styles = StyleSheet.create({
	containerAddNew: {
		...absoluteBottom,
		...centering,
		zIndex:1
	},
	containerBetweenAddNew: {
		...absoluteBottom,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	between: {
		width: 50, 
		height: 50, 
		flex: 1, 
		alignItems: 'center', 
		backgroundColor: 'white'
	},
	assetsText: {
		...textStyle,
		marginRight:50
	},
	assetsIcon: {
		top:5,
		width:28, height:28,
		marginRight:50
	},
	groupsIcon: {
		top:5,
		width:28, height:28,
		marginLeft:50
	},
	groupsText: {
		...textStyle,
		marginLeft:50
	},
	addIcon: {
		width:30,
		height:30, 
		tintColor:'white', 
		top:7
	},
	addNewText: {
		color:'white', 
		...textStyle
	},
	halfRound: {
		width: 100,
		height: 60,
		backgroundColor: 'rgb(46,171,146)',
		borderTopLeftRadius: 108,
		borderTopRightRadius: 108
	}
});