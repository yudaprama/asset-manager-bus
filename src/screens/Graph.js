import React, { Component } from 'react';
import { 
	StyleSheet, 
	Dimensions,
	View
} from 'react-native';
import Chart from 'react-native-chart';
const {width, height} = Dimensions.get('window')

export default ({data}) => (
	<View style={{backgroundColor:'#f4f5f7'}}>
		<View style={styles.view}>
			<Chart
			  style={styles.chart}
			  dataPointFillColor='#8E8E93'
			  dataPointColor='#8E8E93'
			  color='#C7C7CC'
			  lineWidth={1}
			  axisColor='transparent'
			  axisLabelColor='#8E8E93'
			  gridColor='#C7C7CC'
			  hideVerticalGridLines
			  dataPointRadius={5}
			  yAxisWidth={60}
			  data={data}
			  yAxisShortLabel
			  type="line"
			  showDataPoint
			/>
		</View>
	</View>
)

const styles = StyleSheet.create({
	view: {
		marginRight:20, 
		marginLeft:0, 
		marginTop:10, 
		marginBottom:10
	},
	chart: {
		width: width,
		height: height/4
	}
});