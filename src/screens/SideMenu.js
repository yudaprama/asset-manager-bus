import React, {Component} from 'react';
import {
  Text,
  AsyncStorage,
  Alert,
  View,
  Image,
  ListView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {BlurView} from 'react-native-blur';
import FetchData from '../libs/FetchData'
import ListText from '../components/ListText'
import Img from '../components/Img'
import Contact from '../libs/Contact'
import Footer from '../components/Footer'
import Icon from '../components/Icon'

export default class extends Component {
  state = {
    width:280,
    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  press(o) {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
    this.props.navigator.handleDeepLink({link:o});
  }

  componentDidMount() {
    this.fetching()
  }

  fetching = ()=> FetchData('Company', (err, company) => this.setState({dataSource:this.state.dataSource.cloneWithRows(company)}))

  newAccount = (company,value) => {
    let newData = company.concat([{
      id:Date.now().toString(), 
      Account:value.toString()
    }])
    AsyncStorage.setItem('Company', JSON.stringify(newData), () => {
      this.fetching()
    })
  }
  
  render() {
    return (
      <Image resizeMode='cover' style={{flex:1}} source={wallpaper}>
        <View style={{flex:1}} onLayout={(event) => {
          this.setState({width:event.nativeEvent.layout.width})
        }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Item 
              onPress={()=> this.press(rowData)}
              text={rowData.Account} />} 
          />
        </View>
        <Footer 
          blurry
          width={this.state.width/2}
          rightPress={()=> Contact()}
          leftPress={()=> this.props.navigator.showLightBox({
            screen: "example.AssetEdit",
            style: {backgroundBlur: "light"},
            passProps:{
              item:['Account',''],
              title:'Add New',
              update:(value)=> {
                AsyncStorage.getItem('Company', (err, result) => {
                  let company = JSON.parse(result);
                  AsyncStorage.getItem('PURCHASE', (err, result) => {
                    if (result && result.includes('unlimited')) {
                      this.newAccount(company,value)
                    } else {
                      if (company.length === 2) {
                        Alert.alert('Failed Adding Account','You reach limit 2 accounts. Consider buying Unlimited Account', [
                          {text:'Learn More', onPress:()=> this.props.navigator.showModal({screen:"example.InApp"})},
                          {text:'Close'}
                        ])
                      } else {
                        this.newAccount(company,value)
                      };
                    };
                  })
                })
              }
            }
          })} />
      </Image>
    );
  }
}

const Item = ({text,onPress}) => {
  return (
    <TouchableOpacity onPress={()=> onPress(text)}>
      <BlurView blurType="light" style={styles.blur}>
        <Icon onPress={()=> onPress(text)} style={styles.icon} source={Img('office-block')} />
        <ListText stylev={{flex: 1}} text={text} style='sideMenu' />
      </BlurView>
    </TouchableOpacity>
  )
}

let wallpaper = Img('3','jpg')

const styles = StyleSheet.create({
  blur: {flexDirection:'row', justifyContent:'space-between', flex:1, alignItems:'center', paddingBottom:5, paddingTop:5},
  icon: {marginLeft: 15, tintColor:'white', width:48, height:48}
});