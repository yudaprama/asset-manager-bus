import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image
} from 'react-native';
import Dollar from './Dollar'
import TextDua from './TextDua'
import FormatNumber from '../libs/FormatNumber'

export default ({rowData,onPress,i}) => (
	<TouchableOpacity style={styles.container} onPress={()=> onPress()}>
	  <View style={{flex:0.25, backgroundColor:rowData.c}} />
	  <View style={styles.box}>
      <TextDua title={rowData.Item} desc={i == 0 ? `Salvage Value: $${FormatNumber(rowData.SalvageValue)}` : `${rowData.Unit} ${rowData.Measurement}`} />
		  <Dollar amount={i == 0 ? rowData.MarketValue : rowData.MarketValue * rowData.Unit} number="number" dollar="dollar" />
	  </View>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor:'#FFF'
  },
  box: {
    flex:7, 
    borderBottomColor:'#CCCCCC', 
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems: 'center',
  }
});