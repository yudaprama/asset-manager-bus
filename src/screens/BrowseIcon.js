import React, {Component} from 'react';
import {
  ListView,
  AsyncStorage,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Updating from '../libs/Updating'
import Img from '../components/Img'
var width = Dimensions.get('window').width
var widthPerImage = width/3

let arrayImage = ['diamond','diamond1','calendar','building','book-bag','folder','laptop','search','telephone','add-button','add','car','layers','big-dictionary','letter','list','list1','office-block','processing','settings','stacked-layers','teacher-explanation','add','question-mark-symbol','close','big-floppy-disk','lamp','next','close2','processing','light-bulb','diskette1','add-button','print','eat','key','layers1','letter','list','safebox','office-block','processing','multiply1','diskette']

export default class extends Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarBlur: true,
    navBarNoBorder: true,
    navBarButtonColor: 'rgb(46,171,146)',
    navBarTextColor: 'rgb(46,171,146)'
  };
  
  static navigatorButtons = {
    rightButtons: [
      {title: 'Close', id: 'close'},
    ],
    animated: true
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }
  
  state = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentDidMount() {
    this.setDataForListView(arrayImage)
  }

  setDataForListView(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
  }

  eachImage = (icon) => (
    <TouchableOpacity style={styles.touch}
      onPress={()=> {
        Updating(this.props.compID, icon, this.props.Group, null, 'icon', ()=> do {this.props.update(); this.props.navigator.dismissModal();})
      }}>
      <Image style={styles.images} 
        source={Img(icon)} />
    </TouchableOpacity>
  )

  render() {
    return <ListView
      contentContainerStyle={styles.wrapper}
      initialListSize={15}
      dataSource={this.state.dataSource}
      renderRow={(id) => this.eachImage(id)} />
  }
}

var styles = StyleSheet.create({
  touch: {
    height:100, 
    marginBottom:10, 
    marginTop:10, 
    width:widthPerImage
  },
  images: {
    flex: 1,
    height:100,
    resizeMode: 'contain',
    backgroundColor:'transparent',
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    top:44,
    flexWrap: 'wrap'
  }
});