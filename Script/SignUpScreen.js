import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  CheckBox,
  AsyncStorage,
  FlatList,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var Header=require('./Header')
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
var backArrow=require('./Icons/backArrow_2.png')


class SignUpScreen extends Component{


  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

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



  render(){
    return (
      <View  style={styles.outerContainer}>
      <KeyboardAwareScrollView style={{
        flex:1,
      }}>

      <View style={{
        marginTop:120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{
          marginRight:15,
        }}>
        <Text style={{
          fontSize:20,
        }}>Sing In</Text>
        </TouchableOpacity>
      <Text style={{
        textAlign:'center',
        fontSize:20,
        textDecorationLine:'underline',
      }}>SignUp</Text>

      </View>

      <View style={{
        marginTop:30,
        marginLeft:50,
        marginRight:50,
      }}>

      <TextInput
      placeholder="Name"
      underlineColorAndroid='transparent'
      style={{
        backgroundColor:'#B4B4B4',
        height:45,
        borderWidth:1,
        borderColor:'#BBBBBB',
        paddingLeft:10,
        paddingRight:10,
       }}/>


       <TextInput
       placeholder="Email"
       underlineColorAndroid='transparent'
       style={{
         marginTop:15,
         backgroundColor:'#B4B4B4',
         height:45,
         borderWidth:1,
         borderColor:'#BBBBBB',
         paddingLeft:10,
         paddingRight:10,
        }}/>


        <TextInput
        placeholder="Mobile Number"
        underlineColorAndroid='transparent'
        style={{
          marginTop:15,
          backgroundColor:'#B4B4B4',
          height:45,
          borderWidth:1,
          borderColor:'#BBBBBB',
          paddingLeft:10,
          paddingRight:10,
         }}/>



         <TextInput
         placeholder="Password"
         underlineColorAndroid='transparent'
         secureTextEntry={true}
         style={{
           marginTop:15,
           backgroundColor:'#B4B4B4',
           height:45,
           borderWidth:1,
           borderColor:'#BBBBBB',
           paddingLeft:10,
           paddingRight:10,
          }}/>


          <TextInput
          placeholder="Confirm Password"
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={{
            marginTop:15,
            backgroundColor:'#B4B4B4',
            height:45,
            borderWidth:1,
            borderColor:'#BBBBBB',
            paddingLeft:10,
            paddingRight:10,
           }}/>


      </View>

      <View style={{
        marginRight:50,
        alignItems:'flex-end',
        marginTop:15,
      }}>
      <TouchableOpacity>
      <Text style={{
        // fontWeight:'600',
        fontFamily:'Aslam',
      }}>forget                password       ? </Text>
      </TouchableOpacity>
      </View>

      <View style={{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
      }}>
      <TouchableOpacity style={{
        borderWidth:1,
        borderRadius:20,
        borderColor:'#000000',
      }}>
      <Text style={{
        marginTop:10,
        marginBottom:10,
        marginLeft:30,
        marginRight:30,
        // fontWeight:'700',
        fontFamily:'Aslam',
      }}>Creat           Account</Text>
      </TouchableOpacity>
      </View>





      <View style={{
        marginTop:20,
      backgroundColor:'#CDCDCD',
      // borderBottomWidth:10,
      // borderTopWidth:100,
      // height:20,
      // borderRightWidth:40,

      borderTopColor:'blue',
      // borderBottomWidth:20,
      flex:1,
      height:230
      }}>
      <View style={{
        borderTopWidth:80,
        borderLeftWidth:DEVICE_WIDTH,
        borderLeftColor:'#E7E7E7',
        borderTopColor:'#CDCDCD',
        // backgroundColor:'orange',
        transform: [
          {rotate: '180deg'}
          ]
      }}/>

      <View style={{
        position:'absolute',
        left:'43%',
        top:'5%'
      }}>
        <TouchableOpacity style={{
          width:60,
          height:60,
          backgroundColor:'#4C4C4C',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:30,
        }}>
        <Image source={backArrow} style={{width:30,height:22}}/>
        </TouchableOpacity>
      </View>


      </View>




      </KeyboardAwareScrollView>
      </View>
    )
  }

}

const styles=StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:'#E7E7E7',

  }
})


module.exports=SignUpScreen;
