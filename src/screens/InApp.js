import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  View
} from 'react-native';
import ErrorNotif from '../libs/ErrorNotif'
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon'
import Loading from '../components/Loading'
import ListPolos from '../components/ListPolos'
import PurchaseOption from '../components/PurchaseOption'
import Separator from '../components/Separator'
import Contact from '../libs/Contact'
import Img from '../components/Img'
var {width} = Dimensions.get('window');
var InAppUtils = require('NativeModules').InAppUtils
const bundle = 'org.reactjs.native.example.bus.'

export default class extends Component {
	static navigatorStyle = {
		navBarBackgroundColor: 'rgb(46,171,146)',
	  navBarTextColor: '#ffffff',
	  navBarSubtitleTextColor: '#ffffff',
	  navBarButtonColor: '#ffffff',
	  navBarNoBorder: true,
	  drawUnderTabBar: true
	};

	static navigatorButtons = {
		rightButtons: [{
			title: 'Close',
			id: 'close'
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
		if (event.id == 'close') {
		  this.props.navigator.dismissModal();
		}
		if (event.id == 'contact') {
		  Contact()
		}
	}

	state = {
		loading:true,
		dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
	};

	componentDidMount() {
		let products = [`${bundle}starter`, `${bundle}learn`, `${bundle}unlimited`];
		InAppUtils.loadProducts(products, (error, products) => {
		   if (error) {
		   	ErrorNotif('006')
		   } else {
		   	this.setState({
		   	  dataSource: this.state.dataSource.cloneWithRows(products),
		   	  loading:false
		   	});
		   };
		});
	}

	render() {
		return (
			<View style={{backgroundColor:'#f4f5f7',flex:1}}>
				{this.state.loading ? <Loading /> : <ListView
				  dataSource={this.state.dataSource}
				  renderSeparator={(sectionID, rowID, adj) => (
				    <Separator key={`${sectionID}-${rowID}`} adj={adj} />
				  )}
				  renderRow={(rowData) => (
				  	<ListPolos 
				  		rightIcon
				  		onPress={()=> {
				  			this.props.navigator.showModal({
				  				screen: 'example.Buy',
				  				passProps: {...rowData},
				  				navigatorStyle: {
			  					  navBarTranslucent: true,
			  					  drawUnderNavBar: true,
			  					  navBarTransparent: true,
			  				    navBarButtonColor: 'rgb(46,171,146)'
			  				  }
				  			})
				  		}}
				  		textLeft={rowData.title} 
				  		textRight={rowData.priceString} />
				  )}
				/>}
				<View style={styles.wrapper}>
					<TouchableOpacity 
						style={styles.button}
						onPress={()=> {
							InAppUtils.restorePurchases((error, response)=> {
								if (error) {
									Alert.alert('itunes Error', 'Could not connect to itunes store.');
								} else if (response && response.productIdentifier) {
									let data = response.productIdentifier.replace(bundle,'')
									AsyncStorage.setItem('PURCHASE', JSON.stringify(data), (err, id) => {
										if (!err) {
											Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
										};
									});
								} else {
									ErrorNotif('007')
								};
							});
						}}>
					  <View style={styles.info}>
					  	<Icon s={{paddingRight:20}} style={styles.icon} source={Img('cartplain')} />
					    <Text style={styles.text}>Restore In-App-Purchase</Text>
					  </View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

var height = {height:50}

const styles = StyleSheet.create({
  wrapper: {
  	bottom:10,
  	left:0,
  	right:0,
  	position:'absolute',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'center',
    ...height
  },
  info: {
  	backgroundColor:'rgb(46,171,146)', 
  	flexDirection: 'row', 
  	alignItems: 'center', 
  	justifyContent:'center',
  	...height
  },
  button: {
  	width:width*0.8,
  	...height,
  	borderRadius:100
  },
  icon: {
    width:30, 
    height:30,
    tintColor:'white'
  },
  text: {
  	textAlign:'center',
  	color:'white',
  	fontFamily: 'AppleSDGothicNeo-Bold'
  }
});