import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  View,
  ListView
} from 'react-native';

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

	constructor(props) {
	  super(props);
	  this.props.navigator.setOnNavigatorEvent((e)=> {
	  	if (e.id == 'close') this.props.navigator.dismissModal()
	  });
	}

	render() {
		return (
			<View style={{backgroundColor:'#f4f5f7',flex:1}}>
				<ListView
				  dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.content)}
				  renderRow={(r) => <Text style={{margin:10, fontFamily:'AppleSDGothicNeo-Regular', color:'#8E8E93'}}>{r}</Text>} />
			</View>
		);
	}
}