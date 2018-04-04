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
        marginTop:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{
          marginRight:15,
        }}>
        <Text style={{
          fontSize:20,
          color:'#CC181E',
           fontWeight:'700',
        }}>Sing In</Text>
        </TouchableOpacity>
      <Text style={{
        textAlign:'center',
        fontSize:20,
         fontWeight:'700',
        color:'#38803B',
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
    
        backgroundColor:'white',
            height:45,
             borderWidth:1.75,
             borderRadius:5,
        borderColor:'green',
        paddingLeft:10,
        paddingRight:10,
       }}/>


       <TextInput
       placeholder="Email"
       underlineColorAndroid='transparent'
       style={{
         marginTop:15,
         backgroundColor:'white',
            height:45,
             borderWidth:1.75,
             borderRadius:5,
        borderColor:'green',
         paddingLeft:10,
         paddingRight:10,
        }}/>


        <TextInput
        placeholder="Mobile Number"
        underlineColorAndroid='transparent'
        style={{
          marginTop:15,
           backgroundColor:'white',
            height:45,
             borderWidth:1.75,
             borderRadius:5,
        borderColor:'green',
          paddingLeft:10,
          paddingRight:10,
         }}/>



         <TextInput
         placeholder="Password"
         underlineColorAndroid='transparent'
         secureTextEntry={true}
         style={{
           marginTop:15,
            backgroundColor:'white',
            height:45,
             borderWidth:1.75,
             borderRadius:5,
        borderColor:'green',
           paddingLeft:10,
           paddingRight:10,
          }}/>


          <TextInput
          placeholder="Confirm Password"
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={{
            marginTop:15,
            backgroundColor:'white',
            height:45,
             borderWidth:1.75,
             borderRadius:5,
            borderColor:'green',
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
        fontWeight:'bold',
        color:'#38803B',
        //fontFamily:'Aslam',
      }}> forget password? </Text>
      </TouchableOpacity>
      </View>

      <View style={{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
      }}>
      <TouchableOpacity style={{
        borderWidth:1,
        borderRadius:30,
         justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#38803B',
        borderColor:'#38803B',
      }}>
      <Text style={{
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        color:'white',
        marginLeft:30,
        marginRight:30,
        fontSize:16,
        fontFamily:'Aslam',
      }}>Creat           Account</Text>
      </TouchableOpacity>
      </View>





      <View style={{
        marginTop:20,
      backgroundColor:'#38803B',
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
        borderLeftColor:'white',
        borderTopColor:'#38803B',
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
          borderWidth:1,
          borderColor:'white',
          backgroundColor:'#38803B',
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
    backgroundColor:'white',

  }
})


module.exports=SignUpScreen;
