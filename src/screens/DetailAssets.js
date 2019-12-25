import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Pairs from '../libs/Pairs';
import Separator from '../components/Separator'
import ListPolos from '../components/ListPolos'
import FetchData from '../libs/FetchData'
import Pick from '../libs/Pick'
import Spasi from '../libs/Spasi'
import SumSection from '../libs/SumSection'
import Updating from '../libs/Updating'
import Picker from 'react-native-picker'
const {width,height} = Dimensions.get('window')
import FormatNumber from '../libs/FormatNumber'

export default class extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(46,171,146)',
    navBarTextColor: '#ffffff',
    navBarSubtitleTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    navBarNoBorder: true,
    drawUnderTabBar: true
  };

  static navigatorButtons = {
    rightButtons: [
      {icon: require('../../img/ic_library_books.png'), id: 'Definition'},
      {icon: require('../../img/ic_add_a_photo.png'), id: 'image'}
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.id == 'image') {
      Pick((source) => this.update({img:source}))
    }
    if (event.id == 'Definition') {
      this.props.navigator.showModal({
        screen: "example.Definition",
        title:'Definition',
      })
    }
  }

  update(object) {
    Updating(this.props.compID, object, this.state.rowData, true, 'id', (newObject) => {
      this.setState({
        addNew: false
      }, ()=> {
        this.fetching()
        this.props.update()
      });
    })
  }

  state = {
    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    rowData:this.props.rowData,
    addNew:this.props.addNew,
    title:'',
    switchValue:true
  }

  componentDidMount() {
    this.fetching()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.rowData.Amount !== this.state.rowData.Amount) {
      this.props.navigator.setTitle({
        title:this.state.rowData.Item,
        subtitle:`$${FormatNumber(this.state.rowData.Amount)}`,
        navigatorStyle: {
          navBarTextColor: '#ffffff',
          navBarSubtitleTextColor: '#ffffff'
        }
      })
    };
  }

  fetching() {
    if (this.state.addNew) {
      this.setState({
        title:this.state.rowData.Item,
        dataSource: this.state.dataSource.cloneWithRows(Pairs(this.state.rowData))
      });
    } else {
      AsyncStorage.getItem(this.props.compID, (err, result) => {
        let data = JSON.parse(result);
        let object = data.find((o)=> o.id === this.props.id)
        this.setState({
          switchValue:object.Depreciable,
          dataSource: this.state.dataSource.cloneWithRows(Pairs(object)),
          rowData: object,
          title: object.Item
        });
        AsyncStorage.setItem(this.props.compID, JSON.stringify(data));
      })
    };
  }

  showLightBox = (rowData) => {
    this.props.navigator.showLightBox({
      screen: "example.AssetEdit",
      passProps:{
        item:rowData,
        id:this.props.id,
        compID:this.props.compID,
        rowData:this.state.rowData,
        update:(updateRowData)=> {
          Picker.hide();
          this.setState({addNew:false},()=> {
            this.fetching()
            this.props.update()
          });
        }
      },
      style: {
        backgroundBlur: "light"
      }
    });
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f4f5f7'}}>
        <Image 
          resizeMode='cover' 
          style={{width:width, height:height/2, top:0, left:0}}
          source={{uri:this.state.rowData.img}} />
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections
          renderSeparator={(sectionID,rowID,adj)=> <Separator key={`${sectionID}-${rowID}`} adj={adj} />}
          renderRow={(rowData) => <ListPolos
            rightIcon={rowData[0] == 'Depreciable' ? false : true}
            switcher={rowData[0] == 'Depreciable' ? true: false}
            switchValue={rowData[0] == 'Depreciable' ? this.state.switchValue : null}
            switching={(val)=> {
              this.setState({switchValue:val});
              let life = val ? 5 : 0
              this.update({
                Depreciable:val,
                UsefulLife:life
              })
            }}
            textLeft={Spasi(rowData[0])}
            textRight={['Amount', 'SalvageValue', 'MarketValue'].includes(rowData[0]) ? `$${FormatNumber(rowData[1])}` : rowData[1]}
            onPress={()=>{
              if (rowData[0] === 'Group') {
                FetchData(this.props.compID, (err, data) => SumSection(data, (reduceData) => {
                  let data = reduceData.map(o => o.Group).concat(['Create New Group'])
                  Picker.init({
                    pickerData: data,
                    pickerConfirmBtnText:'Confirm',
                    pickerCancelBtnText:'Cancel',
                    pickerTitleText:'Choose Group',
                    pickerConfirmBtnColor:[46,171,146,1.0],
                    pickerCancelBtnColor:[46,171,146,1.0],
                    pickerBg:[255,255,255, 0.9],
                    selectedValue: [rowData[1]],
                    onPickerConfirm:data => this.update({Group:data[0]}),
                    onPickerSelect:data => do {if (data[0] == 'Create New Group') this.showLightBox(['Group',''])}
                  });
                  Picker.show();
                }))
              } else {
                this.showLightBox(rowData)
              }
            }} />}
        />
      </View>
    )
  }
}