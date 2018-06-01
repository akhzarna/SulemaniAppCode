import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,WebView,
  Image,
  Platform,
  Dimensions,
  CheckBox,
  AsyncStorage,
  FlatList,
} from 'react-native';
var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader')

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
var backArrow=require('./Icons/backArrow_2.png')


class ForumScreen extends Component{


  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

}


onNavigationEvent(event) {
// handle a deep link
  if (event.type == 'DeepLink') {
    const parts = event.link;
    if (parts=='Home') {
      // console.log(parts);
      return;
    }else{
          this.props.navigator.resetTo({
          screen: parts,
          navigatorStyle: {
            navBarHidden:true,
          },
        });
      }
  }
}



  render(){
    return (
      <View  style={styles.outerContainer}>
       <Header title='Forum' showMenu={true} navigator={this.props.navigator}/>


         <WebView
    source={{uri: 'http://www.sulemani.com.pk/'}}
    style={{flex: 1}}
  />

     
      </View>
    )
  }

}

const styles=StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:'white',

  }
})


module.exports=ForumScreen;
