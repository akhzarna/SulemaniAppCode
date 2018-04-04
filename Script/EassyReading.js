
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';
var EassyData = require('./EassyData');
var EassyText=require('./EassyText');
var HeadingView=require('./HeadingView');


class EassyReading extends Component{
  constructor(props){
    super(props);
    var heading=this.props.selectedItem.heading;
    var array=[heading];
    this.state={
        headingWords:array,
    }

  }

  render(){
    return(
      <View style={styles.outerContainer}>
      <Header title='مضامین ' navigator={this.props.navigator} showMenu={false}/>
      <ScrollView>

      <View style={{marginBottom:15}}>
      <HeadingView headingWords={this.state.headingWords}/>
      </View>
      <View style={{marginRight:15,marginLeft:15,marginBottom:20}}>
      <EassyText eassyId={this.props.selectedItem.eassyId} />
      </View>

      </ScrollView>
      </View>
    );
  }

}

const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'white',
    }


});


module.exports=EassyReading;
