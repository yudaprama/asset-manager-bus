"use strict";

import React, { Component } from 'react';
import {
  Alert,
  SegmentedControlIOS,
  AsyncStorage,
  ListView,
  View,
  Dimensions
} from 'react-native';
import SumSection from '../libs/SumSection'
import ListColor from '../components/ListColor'
import ListIcon from '../components/ListIcon'
import HiddenRow from '../components/HiddenRow'
import Updating from '../libs/Updating'
import FormatNumber from '../libs/FormatNumber'
import Separator from '../components/Separator'
import FetchData from '../libs/FetchData'
import LinearGradient from 'react-native-linear-gradient';
import Blob from '../libs/Blob'
import {SwipeListView} from 'react-native-swipe-list-view';
import ListText from '../components/ListText'
const {width,height} = Dimensions.get('window')

export default class extends Component {
  state = {
    selectedIndex:0,
    dataGroup:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    dataAsset:new ListView.DataSource({
      getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[`${sectionID}:${rowID}`],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
  }

  componentDidMount() {
    this.fetching()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.asset !== this.props.asset) this.fetching()
    if (prevProps.refetch !== this.props.refetch) this.fetching()
  }

  fetching = ()=> FetchData(this.props.id, (err, data) => this.props.asset ?
    Blob(data, (dataBlob, sectionIDs, rowIDs) => this.setState({
      dataAsset: this.state.dataAsset.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    })) :
    SumSection(data, (reduceData) => this.setState({
      dataGroup: this.state.dataGroup.cloneWithRows(reduceData)
    }))
  )

  renderGroup = ()=> <SwipeListView
    enableEmptySections
    dataSource={this.state.dataGroup}
    renderFooter={Footer}
    renderRow={(rowData) => (
      <ListIcon 
        rowData={rowData} 
        i={this.state.selectedIndex}
        onPress={()=> this.props.push(rowData,rowData.Group)} />
    )}
    renderSeparator={(sectionID, rowID, adj) => (
      <Separator key={`${sectionID}-${rowID}`} adj={adj} />
    )}
    renderHiddenRow={(rowData) => (
      <HiddenRow 
        tintColor='white'
        iconMiddle='list1'
        backgroundColor={rowData.c}
        onHiddenMiddle={()=> this.props.onHiddenMiddle(rowData.Group)}
        onHiddenLeft={()=> Updating(this.props.id, rowData, rowData, false, 'Group', ()=> this.fetching())} 
        onHiddenRight={()=> Alert.alert(
          rowData.Group,
          `In ${new Date().getFullYear()}, ${rowData.Group} having a Market Value of $${FormatNumber(rowData.Amount)}. ${this.props.Account} estimates that ${rowData.Group} will have a useful life of ${rowData.UsefulLife} years. At the end of its useful life, ${this.props.Account} expects to sell ${rowData.Group} for $${FormatNumber(rowData.UsefulLife * rowData.SalvageValue)}. Therefore, ${rowData.Group} having a Book Value of $${FormatNumber(rowData.Amount - rowData.SalvageValue)}. ${this.props.Account} uses Straight-Line depreciation method. That's mean depreciation cost will be $${FormatNumber((rowData.Amount - rowData.SalvageValue)/rowData.UsefulLife)} in each of the years. `
        )}
      />
    )}
    disableLeftSwipe
    leftOpenValue={160}
  />

  renderAsset = ()=> <SwipeListView
    enableEmptySections
    dataSource={this.state.dataAsset}
    renderFooter={Footer}
    renderSectionHeader={(_, sectionID)=> <ListText stylev={{backgroundColor:'#f4f5f7'}} text={sectionID.toUpperCase()} style="section" />}
    renderRow={(rowData) => (
      <ListColor 
        rowData={rowData} 
        i={this.state.selectedIndex}
        onPress={()=>this.props.push(rowData,rowData.Item)} />
    )}
    renderHiddenRow={(rowData) => (
      <HiddenRow 
        tintColor={rowData.c}
        iconMiddle='navicon_edit@2x'
        backgroundColor='#f4f5f7'
        onHiddenMiddle={()=> this.props.push(rowData,rowData.Item)}
        onHiddenLeft={()=> Updating(this.props.id, rowData, rowData, false, 'id',()=> this.fetching())}
        onHiddenRight={()=> {
          AsyncStorage.getItem('PURCHASE', (err, result) => {
            if (result && result.includes('insight')) {
              Alert.alert(
                rowData.Item,
                `In ${new Date().getFullYear()}, ${rowData.Item} having a Market Value of $${FormatNumber(rowData.MarketValue)}. ${this.props.Account} estimates that ${rowData.Item} will have a useful life of ${rowData.UsefulLife} years. At the end of its useful life, ${this.props.Account} expects to sell ${rowData.Item} for $${rowData.SalvageValue}.`
              )
            } else {
              Alert.alert(
                `Insight for ${rowData.Item} is currently locked`,
                `You need to purchase "Insight" to gain meaningful insight from ${rowData.Item}. Consider to purchase "Insight"`, 
                [{text: 'Learn More',
                  onPress: () => this.props.inApp()}, 
                  {text: 'Close'}]
              )
            };
          })
        }}
      />
    )}
    disableLeftSwipe
    leftOpenValue={150}
  />

  render() {
    return (
      <View style={{backgroundColor:'#f4f5f7',flex: 1}}>
        <View style={{padding:10}}>
          <SegmentedControlIOS
            values={this.props.asset ? ['Value', 'Total'] : ['Depreciation', 'Amount']}
            tintColor="rgb(46,171,146)"
            selectedIndex={this.state.selectedIndex}
            onChange={(e) => this.setState({selectedIndex:e.nativeEvent.selectedSegmentIndex}, ()=> {
              if (this.props.asset) this.fetching()
            })}/>
        </View>
        {this.props.asset ? this.renderAsset() : this.renderGroup()}
      </View>
    )
  }
}

let Footer = () => <View style={{width:width, height:50, backgroundColor:'#f4f5f7'}} />