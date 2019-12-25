import React, { Component } from 'react';
import {
  TextInput,
  Dimensions,
  Text,
  AsyncStorage,
  View,
  StyleSheet
} from 'react-native';
import Footer from '../components/Footer'
import Spasi from '../libs/Spasi'
import Updating from '../libs/Updating'
let width = Dimensions.get('window').width * 0.8

export default class extends Component {
	static defaultProps = {
	  title:'Edit'
	}

	state = {
		key:this.props.item[0],
		value: this.props.item[1].toString()
	}

	render() {
		return (
			<View style={styles.container}>
			  <Text style={styles.welcome}>
			    {`${this.props.title} ${Spasi(this.props.item[0])}`}
			  </Text>
			  <View style={styles.searchBar}>
			    <TextInput
			      autoCorrect={false}
			      placeholder={this.props.item[0]}
			      autoFocus
			      returnKeyType="done"
			      enablesReturnKeyAutomatically
			      style={styles.searchBarInput}
			      placeholderTextColor='grey'
			      selectionColor='grey'
			      blurOnSubmit
			      value={this.state.value}
			      keyboardType={typeof this.props.item[1] === 'number' ? 'numeric' : 'default'}
			      onChangeText={(text) => this.setState({value:text})}
			    />
			  </View>
			  <Footer 
			  	width={width/2} 
			  	rightPress={()=>this.props.navigator.dismissLightBox()}
			  	leftPress={()=>{
			  		if (this.props.item[0] === 'Account') {
			  			this.props.update(this.state.value)
			  		} else {
							var updatedItem = {}
							updatedItem[this.props.item[0]] = ['Unit', 'Amount', 'MarketValue'].includes(this.props.item[0]) ? Number(this.state.value) : this.state.value;
							Updating(this.props.compID, updatedItem, this.props.rowData, true, 'id', (newObject) => this.props.update(newObject))
			  		};
			  		this.props.navigator.dismissLightBox();
			  	}}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  width: width,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'white',
	  borderRadius: 10
	},
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	  color:'grey'
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  marginBottom: 5,
	},
	button: {
	  textAlign: 'center',
	  fontSize: 18,
	  marginBottom: 10,
	  marginTop:10,
	  color: 'blue'
	},
  searchBar: {
  	marginTop:10,
    borderRadius:5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    textAlign:'center',
    height: 25,
    width:width
  }
});