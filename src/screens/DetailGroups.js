import React, {Component} from 'react';
import {
  Text,
  Alert,
  SegmentedControlIOS,
  AsyncStorage,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Pairs from '../libs/Pairs';
import Updating from '../libs/Updating'
import Graph from './Graph'
import Dollar from '../components/Dollar'
import LinearGradient from 'react-native-linear-gradient';
import Spasi from '../libs/Spasi'
import DepreciationData from '../libs/DepreciationData'
import Separator from '../components/Separator'
import ListPolos from '../components/ListPolos'
import ListText from '../components/ListText'
import FormatNumber from '../libs/FormatNumber'
import Picker from 'react-native-picker'
var pick = require('lodash/pick')

export default class extends Component {
  static navigatorButtons = {
    rightButtons: [
      {icon: require('../../img/ic_library_books.png'), id: 'Definition'}
    ]
  };
  
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(46,171,146)',
    navBarTextColor: '#ffffff',
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
    if (event.id == 'Definition') {
      this.props.navigator.showModal({
        screen: "example.Definition",
        title:'Definition',
      })
    }
  }

  state = {
    life:this.props.rowData.UsefulLife,
    selectedIndex:0,
    dataValue: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    dataScenario: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    dataInsight: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentDidMount() {
    this.fetching()
  }

  fetching() {
    let {rowData} = this.props
    let {life,selectedIndex,dataValue,dataInsight,dataScenario} = this.state
    let depresiasi = DepreciationData(rowData.Amount,rowData.SalvageValue,life)
    if (selectedIndex == 0) {
      this.setState({
        dataValue:dataValue.cloneWithRows(depresiasi)
      });
    }
    if (selectedIndex == 1) {
      var arrPairs = []
      let scenarios = pick(rowData, ['UsefulLife','DepreciationMethod'])
      let toPairs = Object.keys(scenarios).forEach((key) => arrPairs.push([key, scenarios[key]]))
      this.setState({
        dataScenario:dataScenario.cloneWithRows(arrPairs)
      });
    }
    if (selectedIndex == 2) {
      let filter = depresiasi.filter(o => o[0] !== new Date().getFullYear())
      this.setState({
        dataInsight:dataInsight.cloneWithRows(filter)
      });
    }
  }

  renderRow = (r) => {
    let {selectedIndex} = this.state
    let {rowData} = this.props
    if (selectedIndex == 0) {
      return <ListPolos onPress={()=> null} textLeft={r[0]} textRight={`$${FormatNumber(r[1])}`} />
    }
    if (selectedIndex == 1) {
      return <ListPolos textLeft={Spasi(r[0])} textRight={r[0] === 'UsefulLife' ? `${this.state.life} years` : r[1]}
        onPress={()=> {
          if (r[0] === 'UsefulLife') {
            Picker.init({
              pickerData: [...Array(20+1).keys()].slice(1),
              pickerConfirmBtnText:'Save',
              pickerCancelBtnText:'Cancel',
              pickerTitleText:'Simulate Useful Life',
              pickerConfirmBtnColor:[46,171,146,1.0],
              pickerCancelBtnColor:[46,171,146,1.0],
              pickerBg:[255,255,255, 0.9],
              selectedValue: [this.state.life],
              onPickerConfirm: data => {
                this.setState({life:data[0]});
                Updating(this.props.compID, data[0], this.props.rowData.Group, null, 'UsefulLife', ()=> {
                  this.props.update()
                })
              }
            });
            Picker.show();
          }
          if (r[0] === 'DepreciationMethod') {
            Alert.alert('Bummer!','Currently only support Straight-Line Method. Other methods will be added soon. Stay tuned!')
          }
        }} 
      />
    }
    if (selectedIndex == 2) {
      return <Text style={styles.text}>{`In ${r[0]}, ${rowData.Group} will worth $${FormatNumber(r[1])}`}</Text>
    }
  }

  renderHeader = () => {
    let {rowData,Account} = this.props
    let {life} = this.state
    let array = [`In ${new Date().getFullYear()}, ${rowData.Group} having a Market Value of $${FormatNumber(rowData.Amount)}. ${Account} estimates that ${rowData.Group} will have a useful life of ${life} years.`, `At the end of its useful life, ${Account} expects to sell ${rowData.Group} for $${FormatNumber(life * rowData.SalvageValue)} (Salvage Value). Therefore, ${rowData.Group} having a Book Value of $${FormatNumber(rowData.Amount - rowData.SalvageValue)} (Market Value - Salvage Value).`, `${Account} uses ${rowData.DepreciationMethod}. That's mean depreciation cost will be $${FormatNumber((rowData.Amount - rowData.SalvageValue)/life)} in each of the years. `, `Knowing depreciation cost in each of the years, ${Account} able to forecast the future value of ${rowData.Group} as follow:`]
    return (
      <ListView
        dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(array)}
        renderRow={(rowData) => <Text style={styles.text}>{rowData}</Text>} />
    )
  }

  dataSource = (selectedIndex) => {
    let {dataValue,dataInsight,dataScenario} = this.state
    if (selectedIndex == 0) return dataValue;
    if (selectedIndex == 1) return dataScenario;
    if (selectedIndex == 2) return dataInsight;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.life !== this.state.life) this.fetching()
  }

  render() {
    let {rowData,color} = this.props
    let {life,selectedIndex} = this.state
    return (
      <View style={{backgroundColor:'#f4f5f7',flex: 1}}>
        <LinearGradient colors={['rgb(46,171,146)', color]}>
          <View style={{margin:20}}>
            <ListText text={rowData.DepreciationMethod} style='graph' />
            <Dollar amount={(rowData.Amount - rowData.SalvageValue) / life} number="thin" dollar="dollarThin" />
            <ListText text={`Useful Life: ${life} years`} style='graph' />
          </View>
        </LinearGradient>
        <Graph data={DepreciationData(rowData.Amount, rowData.SalvageValue, life)} />
        <View style={{padding:10}}>
          <SegmentedControlIOS
            values={['Forecasted Value','Scenario','Insight']}
            tintColor='rgb(132,132,132)'
            selectedIndex={selectedIndex}
            onChange={(e)=> {
              let index = e.nativeEvent.selectedSegmentIndex
              if (index == 2) {
                AsyncStorage.getItem('PURCHASE', (err, result) => {
                  if (result && result.includes('insight')) {
                    this.setState({selectedIndex:index},()=> this.fetching(index))
                  } else {
                    this.setState({selectedIndex:0},()=> {
                      this.fetching(0)
                      Alert.alert(
                        `Insight for ${rowData.Group} is currently locked`,
                        `You need to purchase "Insight" to gain meaningful insight from ${rowData.Group}. Your asset data might be sitting on the largest asset data, but it's useless unless you have the means to translate it into insights that drive your business. Consider to purchase "Insight"`, 
                        [{text: 'Learn More',
                          onPress: () => this.props.navigator.showModal({
                            screen: "example.InApp",
                            title:"In App Purchase"
                          })}, 
                          {text: 'Close'}]
                      )
                    })
                  };
                })
              } else {
                this.setState({selectedIndex:index},()=> this.fetching(index))
              };
            }}/>
        </View>
        <ListView
          dataSource={this.dataSource(selectedIndex)}
          enableEmptySections
          renderHeader={selectedIndex == 2 ? this.renderHeader : null}
          renderSeparator={(sec,row,adj)=> selectedIndex == 2 ? null : <Separator key={`${sec}-${row}`} adj={adj} />}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily:'AppleSDGothicNeo-Regular',
    margin:10,
    color:'#8E8E93'
  }
});