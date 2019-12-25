import React, { Component } from 'react';
import {
  View,
  Alert,
  AsyncStorage
} from 'react-native';
import Lists from '../components/Lists'
import TabBar from './TabBar'
import FetchData from '../libs/FetchData'
import SumSection from '../libs/SumSection'
import FormatNumber from '../libs/FormatNumber'

export default class extends Component {
	static navigatorButtons = {
	  leftButtons: [
	    {icon: require('../../img/ic_menu_white.png'), id: 'menu'}
	  ],
	  rightButtons: [
	    {icon: require('../../img/ic_library_books.png'), id: 'Definition'}
		]
	};
	
	static navigatorStyle = {
	  navBarBackgroundColor: 'rgb(46,171,146)',
	  navBarTextColor: '#ffffff',
	  navBarSubtitleTextColor: '#ffffff',
	  navBarButtonColor: '#ffffff',
	  navBarNoBorder: true,
	  drawUnderTabBar: true
	};

	state = {
		asset:true,
		refetch:true,
		id:'1',
		Account:"Example Company"
	}

	constructor(props) {
	  super(props);
	  this.setTitle()
	  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	setTitle = ()=> this.props.navigator.setTitle({
	  title: `${this.state.Account}'s Asset`
	});

	inApp = () => {
		this.props.navigator.showModal({
			screen: "example.InApp",
			title:"In App Purchase"
		})
	}

	onNavigatorEvent = (event) => {
	  if (event.id == 'menu') {
	  	this.props.navigator.toggleDrawer({
	  	  side: 'left',
	  	  animated: true
	  	});
	  } else if (event.type == 'DeepLink') {
	  	this.setState(event.link, ()=> {
	  		this.setTitle()
	  		this.setState({refetch:!this.state.refetch})
	  	})
	  } else if (event.id == 'Definition') {
	  	AsyncStorage.getItem('PURCHASE',(err, result) => {
	  		if (result && result.includes('learn')) {
	  			this.props.navigator.showModal({
	  			  screen: "example.Definition",
	  			  title:'Definition',
	  			})
	  		} else {
	  			Alert.alert(
	  				"You can't access course page", 
	  				'You need to purchase "Learn" to access course page and learn accounting for asset management. "Learn" will help you understand how Asset Management in real world practice in order to understand how this app work technically.',
						[{text: 'Learn More',
							onPress: () => this.inApp()}, 
							{text: 'Close'}]
	  			)
	  		};
	  	})
    }
	}

	render() {
		return (
			<View style={{flex: 1}}>
			  <Lists 
			  	{...this.state}
			  	inApp={this.inApp}
			  	onHiddenMiddle={(Group)=>{
			  		this.props.navigator.showModal({
			  			screen:'example.BrowseIcon',
			  			title:'Change Icon',
			  			passProps:{
			  				compID:this.state.id,
			  				Group:Group,
			  				update:()=>this.setState({refetch:!this.state.refetch})
			  			}
			  		})
			  	}}
			  	push={(rowData, title) => this.props.navigator.push({
	          screen: `example.Detail${this.state.asset ? "Assets" : "Groups"}`,
	          title:title,
	          subtitle:`$${FormatNumber(rowData.Amount)}`,
	          passProps:{
	          	compID:this.state.id,
	            rowData:rowData,
	            id:rowData.id,
	            Account:this.state.Account,
	            color:Random(['#71B280','rgb(18,146,122)','#1D976C','#00CDAC','#8DC26F']),
	            update:()=>this.setState({refetch:!this.state.refetch})
	          }
	        })}
	      />
			  <TabBar 
			  	add={()=> {
						FetchData(this.state.id, (err, data) => SumSection(data, (reduceData) => {
						  let groups = reduceData.map(o => o.Group)
						  let id = Date.now()
						  this.props.navigator.push({
						  	screen: "example.DetailAssets",
						  	title: 'Add New Asset',
						  	passProps: {
						  		compID:this.state.id,
						  		id: id,
						  		addNew: true,
						  		rowData: {
						  			id: id,
						  			Item: 'Item Name',
						  			Unit: 1,
						  			MarketValue: 100,
						  			Amount: 100,
						  			Group: groups[0],
						  			UsefulLife: 5,
						  			SalvageValue: 10,
						  			icon: "telephone",
						  			img: "https://assets.entrepreneur.com/content/16x9/822/together-forever1.jpg",
						  			c: Random(['#34AADC', '#FF9500', 'rgb(244,119,130)', 'rgb(255,150,128)', '#4CD964', 'rgb(205,97,106)', '#52EDC7'])
						  		},
						  		update:()=>this.setState({refetch:!this.state.refetch})
						  	}
						  })
						}))
					}}
				  change={(type) => this.setState({asset:type})}
			    leftColor={this.state.asset ? 'rgb(46,171,146)' : 'grey'}
			  	rightColor={this.state.asset ? 'grey' : 'rgb(46,171,146)'} />
			</View>
		);
	}
}

let Random = (items) => items[Math.floor(Math.random() * items.length)]