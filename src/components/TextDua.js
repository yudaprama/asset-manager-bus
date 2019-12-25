import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import ListText from './ListText'
import FormatNumber from '../libs/FormatNumber'

export default ({title,desc}) => (
	<View style={styles.textContainer}>
    <ListText text={title} style="title" />
    <ListText text={desc} style="description" />
  </View>
)

const styles = StyleSheet.create({
  textContainer: {
    flex:7,
    padding:5
  }
});