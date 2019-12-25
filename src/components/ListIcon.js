import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Dollar from './Dollar'
import TextDua from './TextDua'
import Img from './Img'
import FormatNumber from '../libs/FormatNumber'

export default ({onPress,rowData,i}) => (
  <TouchableOpacity style={styles.container} onPress={()=> onPress()}>
    <View style={styles.centering}>
      <View style={[styles.circle,{backgroundColor:rowData.c}]}>
        <View style={styles.centering}>
          <Image style={styles.img} source={Img(rowData.icon)} />
        </View>
      </View>
    </View>
    <TextDua title={rowData.Group} desc={i == 0 ? `Salvage Value: $${FormatNumber(rowData.SalvageValue)}` : `${rowData.UsefulLife} years`} />
    <Dollar amount={i == 0 ? (rowData.Amount - rowData.SalvageValue)/rowData.UsefulLife : rowData.Amount - rowData.SalvageValue} number="number" dollar="dollar" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft:5,
    backgroundColor: '#FFF'
  },
  centering: {
    justifyContent: 'center',
    alignItems:'center'
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  textContainer: {
    flex:7,
    padding:5
  },
  img: {
    tintColor:'white', 
    top:5, 
    width:24, 
    height:24, 
    backgroundColor:'transparent'
  }
});