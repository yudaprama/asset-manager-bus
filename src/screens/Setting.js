import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import FetchData from '../libs/FetchData'
import Picker from 'react-native-picker'
import ListPolos from '../components/ListPolos'

export default class extends Component {
	static navigatorButtons = {
	  rightButtons: [
	    {title: 'Close', id: 'close'},
	  ],
	  leftButtons: [
	    {title: 'Contact', id: 'contact'},
	  ]
	};
	
	static navigatorStyle = {
	  navBarBackgroundColor: 'rgb(46,171,146)',
	  navBarTextColor: '#ffffff',
	  navBarSubtitleTextColor: '#ffffff',
	  navBarButtonColor: '#ffffff',
	  statusBarTextColorScheme: 'light',
	  navBarNoBorder: true,
	  drawUnderTabBar: true
	};

	constructor(props) {
	  super(props);
	  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = (event) => {
		if (event.id == 'close') {
		  this.props.navigator.dismissModal();
		}
	}

	state = {
		text: {
			textLeft:'Language',
			textRight:''
		},
		array:[]
	};

	componentDidMount() {
	  this.fetching()
	  this.storage()
	}

	update = (data) => this.setState({text: {textLeft: 'Language', textRight: data}})

	storage = ()=> FetchData(this.state.text.textLeft, (err, data) => this.update(data))

	fetching = ()=> {
		fetch('https://raw.githubusercontent.com/namestise/data/master/bus/lang.json')
			.then((response) => response.json())
			.then((responseData) => this.setState({array:responseData}))
			.catch((error) => console.log('error due to no internet connection'))
	}

	render() {
		return (
			<ListPolos {...this.state.text}
				rightIcon
        onPress={()=>{
        	let array = this.state.array
          let name = array.map((o) => o.name);
          Picker.init({
            pickerData: name,
            pickerConfirmBtnText:'Confirm',
            pickerCancelBtnText:'Cancel',
            pickerTitleText:'Choose Group',
            pickerConfirmBtnColor:[46,171,146,1.0],
            pickerCancelBtnColor:[46,171,146,1.0],
            pickerBg:[255,255,255, 0.9],
            selectedValue: [this.state.text.textRight],
            onPickerConfirm: data => {
            	this.update(data[0])
            	this.props.update(data[0])
            	let object = array.find((o) => o.name === data[0]);
            	if (object) {
            		AsyncStorage.setItem('Language', JSON.stringify(object))
            	};
            }
          });
          Picker.show();
        }} />
		);
	}
}
