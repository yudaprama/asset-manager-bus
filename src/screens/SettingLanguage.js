import React, { Component } from 'react';
import {
  Text,
  AsyncStorage,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ListPolos from '../components/ListPolos'
import Separator from '../components/Separator'

export default class extends Component {
	render() {
		return (
			<ListView
			  dataSource={this.state.dataSource}
			  enableEmptySection
			  renderSeparator={(sectionID, rowID, adj) => <Separator key={`${sectionID}-${rowID}`} adj={adj} />}
			  renderRow={(d) => <ListPolos rightIcon onPress={()=> null} textLeft={d[0]} textRight={FormatNumber(d[1])} />}
			/>
		);
	}
}
