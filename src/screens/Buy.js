import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PurchaseOption from '../components/PurchaseOption'
import Img from '../components/Img'
import Contact from '../libs/Contact'
var {width, height} = Dimensions.get('window');
var InAppUtils = require('NativeModules').InAppUtils
const bundle = 'org.reactjs.native.example.bus.'

export default class extends Component {
	static navigatorButtons = {
		rightButtons: [{
			title: 'Back',
			id: 'back'
		}],
		leftButtons: [{
			title: 'Contact',
			id: 'contact'
		}]
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = (event) => {
		if (event.id == 'back') {
		  this.props.navigator.dismissModal();
		}
		if (event.id == 'contact') {
		  Contact()
		}
	}

	purchase = (productIdentifier) => {
		InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
			if (error) {
				Alert.alert('You cancel purchase')
			} else if (response && response.productIdentifier) {
				let data = response.productIdentifier.replace(bundle,'')
				AsyncStorage.getItem('PURCHASE',(err, result) => {
					let newData = result ? result.concat([data]) : [data]
					AsyncStorage.setItem('PURCHASE', JSON.stringify(newData), (err, id) => {
						if (!err) {
							Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
						};
					});
				})
			}
		});
	}

	render() {
		return (
			<Image resizeMode='cover' style={{flex:1}} source={Img(this.props.description.split('.')[2],'jpg')}>
			  <LinearGradient style={{flex:1}} colors={['transparent', 'rgba(0, 0, 0, 0.8)']}>
			  	<View style={styles.promoView}>
			  	  <Text style={[styles.text, styles.promoHeader]}>{this.props.title}</Text>
			  	  <Text style={[styles.text, styles.promoDescription]}>{this.props.description.split('.')[0]}</Text>
			  	  <View style={[styles.line, {backgroundColor:'#0ea378'}]} />
			  	  <Text style={[styles.text, styles.promoText]}>{this.props.description.split('.')[1]}</Text>
			  	</View>
	  	  	<View style={styles.options}>
	  	  		<PurchaseOption
	  	  		  style={{paddingLeft:12,paddingRight:12}}
	  	  		  priceString={this.props.priceString}
	  	  		  onPress={()=> this.purchase(this.props.identifier)}
	  	  		/>
	  	  	</View>
			  </LinearGradient>
			</Image>
		);
	}
}

const styles = StyleSheet.create({
	options: {
	  backgroundColor: 'transparent',
	  position: 'absolute',
	  width: width,
	  bottom: 0,
	  marginTop: 40,
	  paddingBottom: 24,
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	promoView: {
	  backgroundColor: 'transparent',
	  justifyContent: 'center',
	  alignItems: 'center',
	  flexDirection: 'column',
	  flex: 1
	},
	text: {
	  color: 'white',
	  fontFamily:'AppleSDGothicNeo-Bold',
	  textAlign: 'center'
	},
	promoHeader: {
	  fontSize: 42,
	  fontWeight: '700',
	  alignSelf: 'center'
	},
	promoDescription: {
	  fontSize: 22,
	  fontWeight: '300',
	  width: 320,
	  alignSelf: 'center',
	},
	promoText: {
	  fontSize: 14,
	  fontWeight: '400',
	  alignSelf: 'center',
	  lineHeight: 22,
	  width: 320,
	},
	line: {
	  marginTop: 10,
	  marginBottom: 10,
	  height: 1,
	  width: 260,
	  alignSelf: 'center',
	  backgroundColor: 'white',
	},
});