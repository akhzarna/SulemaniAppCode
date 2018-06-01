

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
var RNFS=require('react-native-fs');
var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';
var ArticlesData=require('./ArticlesData');
var ArticlesText=require('./ArticlesText');
var HeadingView=require('./HeadingView');

class ArticlesReading extends Component{
  constructor(props){
    super(props);
    var heading=this.props.selectedItem.heading;
    var mainData=this.props.selectedItem.data;
    var array=[heading];
    this.state={
        headingWords:array,
        mainData:mainData
    }
  }

componentDidMount(){
  Alert.alert(this.state.mainData);
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

      {/*
      <ArticlesText ArticlesId={this.props.selectedItem.ArticlesId} />
      */}

      <Text style={styles.textStyle}>
      {this.state.mainData}
      </Text>

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
    },

    textStyle:{
      textAlign:'right',
      lineHeight:35,
      fontSize:20,
      fontFamily:'Nafees Web Naskh',
    }
});

module.exports=ArticlesReading;
