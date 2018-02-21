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
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';
var EassyData = require('./EassyData');


class ListScreen extends Component{


      constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
        var dataArray=[];
        for (var i = 0; i < EassyData.titleArray.length; i++) {
          var title=EassyData.titleArray[i];
          var object={data:title,key:i};
          dataArray.push(object);
        }
        this.state={
          dataArray:dataArray,
        }
      }




onNavigationEvent(event) {
      // handle a deep link
        if (event.type == 'DeepLink') {
          const parts = event.link;
          if (parts=='Home') {
            console.log(parts);
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



rowSelected(item){
  var selectedItem={eassyId:item.key,heading:item.data};
  this.props.navigator.push({
    screen:'EassyReading',
    passProps:{selectedItem},
    navigatorStyle:{
      navBarHidden:true,
    },
  })

}


  render(){

    return(
      <View style={styles.outerContainer}>
      <Header title='مضامین' navigator={this.props.navigator} showMenu={true}/>
      <View style={styles.listView}>

{/*
          <View style={styles.inputView}>
                <TextInput style={styles.inputStyle}
                onChangeText={(txtSearch) =>this.filterData(txtSearch)}
                value={this.state.txtSearch}
                underlineColorAndroid='transparent'
                 />
          </View>
          */
}
      <FlatList
            data={this.state.dataArray}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=>this.rowSelected(item)}>

            <View style={styles.textView}>

            <View style={{flex:1}}>
            <Image source={arrow_left} style={styles.iconDimention}/>
            </View>

            <View style={{flex:8}}>
            <Text  style={styles.textStyle}>{}</Text>


            <Text numberOfLines={2} style={styles.textStyle}>{item.data.trim()}</Text>

            </View>


            </View>

            <View style={styles.lineView}/>

            </TouchableOpacity>
          }
          />

      </View>

      <Loader showProgress={this.state.showProgress}/>

      </View>
    )
  }

}



const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'white',
    },
    listView:{
      // paddingRight:20,
      // paddingLeft:20,
      flex:1,

    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      paddingLeft:15,
      paddingRight:15,
      flexDirection:'row',
      // backgroundColor:'green',
    },
    lineView:{
      height:1,
      marginRight:15,
      marginLeft:15,
      backgroundColor:'#E5E5E5',
    },
    textStyle:{
      textAlign:'right',
      color:'#000000',
      fontFamily:'Nafees Web Naskh',
      fontSize:18,
    },
    iconDimention:{
      width:12,
      height:20,
    },
    inputStyle:{
      // width:140,
      marginRight:30,
      marginLeft:30,
      height:45,
      borderWidth:1,
      borderRadius:25,
      paddingLeft:15,
      paddingRight:20,
      textAlign:'right',
      borderColor:'#E0E3E7',
      color:'#ACADAD',
      fontFamily:'Adobe Arabic',
      fontSize:22,
      // backgroundColor:'gray',
      // backgroundColor:'green',
    },
    inputView:{
      // backgroundColor:'gray',

      paddingTop:20,
      paddingBottom:20,
    },
    defaultStyle:{
      textAlign:'right',
    },
})


module.exports=ListScreen;
