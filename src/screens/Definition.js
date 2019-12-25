import React, { Component } from 'react';
import {
	ListView,
	View,
	Dimensions,
	Linking,
	Alert
} from 'react-native';
import ListPolos from '../components/ListPolos'
import Separator from '../components/Separator'

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
	  rightButtons: [
	    {title: 'Close', id: 'close'},
	  ],
	  animated: true
	}

	state = {
		dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
	}

	constructor(props) {
	  super(props);
	  this.props.navigator.setOnNavigatorEvent((e)=> {
	  	if (e.id == 'close') this.props.navigator.dismissModal()
	  });
	}

	componentDidMount() {
	  this.fetching()
	}

	fetching = ()=> fetch('https://raw.githubusercontent.com/namestise/data/master/bus/Definition.json')
		.then((response) => response.json())
		.then((responseData) => this.setState({dataSource:this.state.dataSource.cloneWithRows(responseData)}))
		.catch(()=> this.noInternet())

	noInternet = ()=> {
		Alert.alert('No Internet Connection','Please connect to internet', [
		  {text:'Refresh', onPress:()=> this.fetching(this.props.storageName)},
		  {text:'Go To Setting', onPress:()=> Linking.openURL('app-settings:')},
		  {text:'Ask Me Letter'}
		])
	}

	render() {
		return (
			<View style={{backgroundColor:'#f4f5f7',flex:1}}>
				<ListView
					dataSource={this.state.dataSource}
				  renderRow={(d) => <ListPolos 
				  	onPress={()=> this.props.navigator.push({
				  		screen: 'example.DetailDefinition',
				  		title:d[0],
				  		passProps:{
				  			content:d[1]
				  		}
				  	})} 
				  	textLeft={d[0]} textRight="" rightIcon />}
				  renderSeparator={(sectionID, rowID, adj) => (
				    <Separator key={`${sectionID}-${rowID}`} adj={adj} />
				  )}
				/>
			</View>
		)
	}
}