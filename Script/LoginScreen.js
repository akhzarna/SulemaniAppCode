import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';


var Header=require('./Header')
var Loader=require('./Loader')
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
const buttonWidth=DEVICE_WIDTH/2-50;
var backArrow=require('./Icons/backArrow_2.png')

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class LoginScreen extends Component{

  constructor(props){
    super(props);

}



componentDidMount() {

}

NavigateToScreen(){
  this.props.navigator.push({
  screen: "Screen4",
  navigatorStyle: {
    navBarHidden:true,
  },
});

}


render(){
  return(
    <View style={styles.outerContainer}>

    <KeyboardAwareScrollView>


          <View style={{
            marginTop:120,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}>
          <Text style={{
            fontSize:20,
            fontWeight:'700',
            textDecorationLine:'underline'
          }}>Sing in</Text>

          <TouchableOpacity onPress={()=> {this.props.navigator.push({
            screen:"SignUpScreen",
            navigatorStyle:{
              navBarHidden:true,
            },
          })
         }} style={{
            marginLeft:15,
          }}>
          <Text style={{
            fontSize:20,
            fontWeight:'700',
          }}>SingUp</Text>
          </TouchableOpacity>

          </View>

          <View style={{
            marginTop:20,
          }}>
          <TextInput
          placeholder="Email"
          underlineColorAndroid='transparent'

           style={styles.inputStyle}/>

           <TextInput
           placeholder="password"
           secureTextEntry={true}
           underlineColorAndroid='transparent'
            style={styles.inputStyle}/>

          </View>


            <View style={{
              marginTop:15,
              alignItems:'flex-end',
              justifyContent:'flex-end',
              marginRight:50,
            }}>
            <TouchableOpacity>
              <Text style={{
                fontWeight:'600',
              }}>Forget password?</Text>
            </TouchableOpacity>
            </View>

            <View style={{
              marginTop:30,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <TouchableOpacity style={{
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1,
                borderRadius:30,
              }}>
              <Text style={{
                marginTop:7,
                marginBottom:7,
                marginLeft:40,
                marginRight:40,
                fontWeight:'600'
              }}>Login</Text>

              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',marginTop:20,marginLeft:50,marginRight:50}}>
              <View style={{flex:1,backgroundColor:'black',height:1}}/>
              <Text style={{
                marginLeft:2,
                marginRight:2,
                fontWeight:'600',
              }}>Sign in with social</Text>
              <View style={{flex:1,backgroundColor:'black',height:1}}/>
            </View>


              <View style={{
                marginTop:20,
                flexDirection:'row',
                marginRight:50,
                marginLeft:50,
                justifyContent:'space-around',
              }}>
                  <View style={{
                    width:50,
                    height:50,
                    backgroundColor:'#00CDFF',
                    borderRadius:25,
                  }}/>

                  <View style={{
                    width:50,
                    height:50,
                    backgroundColor:'#004575',
                    borderRadius:25,
                  }}/>

                  <View style={{
                    width:50,
                    height:50,
                    backgroundColor:'#990D00',
                    borderRadius:25,
                  }}/>

              </View>



              <View style={{
              marginTop:30,
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
                <TouchableOpacity onPress={()=>this.NavigateToScreen()} style={{
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
  backgroundColor:'#E7E7E7'
},
inputStyle:{
  backgroundColor:'#B4B4B4',
  marginLeft:50,
  marginRight:50,
  height:45,
  borderWidth:1,
  borderColor:'#BBBBBB',
  paddingLeft:10,
  paddingRight:10,
  marginTop:20,

}
})




module.exports=LoginScreen;
