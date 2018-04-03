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

var logoImage=require('./Icons/logo.png');
var Header=require('./Header')
var Loader=require('./Loader')
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
const buttonWidth=DEVICE_WIDTH/2-50;
const logoWidth=DEVICE_WIDTH/3+25;
var backArrow=require('./Icons/backArrow_2.png')

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation';



class Screen4 extends Component{

  constructor(props){
    super(props);

}




componentDidMount() {

}

NavigateToScreen(ScreenName,flag){

  var object={isOption1:true}
  this.props.navigator.resetTo({
  screen: ScreenName,
  passProps:{object},
  navigatorStyle: {
    navBarHidden:true,
  }
});
  // Navigation.startSingleScreenApp({
  //   screen: {
  //     screen: 'HomeScreen',
  //     title: 'Home',
  //     navigatorStyle: {
  //       navBarHidden:true,
  //         },
  //   },
  //   appStyle: {
  //       statusBarColor: 'black',
  //     },
  //       drawer: {
  //           right: {
  //             screen: 'SideMenu',
  //           },
  //         style:{ // ( iOS only )
  //           drawerShadow: true, // optional, add this if you want a side menu drawer shadow
  //           contentOverlayColor: 'rgba(0,0,0,0.30)', // optional, add this if you want a overlay color when drawer is open
  //           leftDrawerWidth: 80 ,// optional, add this if you want a define left drawer width (50=percent)
  //           rightDrawerWidth: 80 // optional, add this if you want a define right drawer width (50=percent)
  //         },
  //         disableOpenGesture: true ,
  //         }
  // });



}

actButton1(){
// Alert.alert('1')
this.NavigateToScreen('BookCatagoryScreen',false);
}

actButton2(){
// Alert.alert('2')
this.NavigateToScreen('HomeScreen',true);
}

actButton3(){
// Alert.alert('3')
this.NavigateToScreen('HomeScreen',false);

}

actButton4(){
// Alert.alert('4')
this.NavigateToScreen('HomeScreen',false);
}




render(){
  return(
    <View style={styles.outerContainer}>

    <KeyboardAwareScrollView>


          <View style={{
            marginTop:80,
            alignItems:'center',
            justifyContent:'center',
          }}>

            <View style={{
              width:140,
              height:140,
              borderRadius:50,
            
            }}>
            <Image source={logoImage} resizeMode={'contain'}
                  style={{
                    width:140,
                   height:140,
                   borderRadius:50,
              
                  }}/>


            </View>

            <Text style={{
              marginTop:10,
              fontSize:19,
              color:'black',
              fontWeight:'bold',

            }}>ادارہ مطبوعات سلیمانی</Text>

          </View>



          <View style={{
            marginTop:40,
            alignItems:'center',
            justifyContent:'center',
          }}>
          <TouchableOpacity onPress={()=>this.actButton1()} style={{
           // borderWidth:1,
            borderRadius:20,
            height:40,
            width:150,
            backgroundColor:'#38803B',
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>طبی کتب</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.actButton2()} style={{
           // borderWidth:1,
            borderRadius:20,
            backgroundColor:'#38803B',
            marginTop:20,
            height:40,
            width:150,
            alignItems:'center',
            justifyContent:'center', 
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>امراض اور علاج</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>this.actButton3()} style={{
           // borderWidth:1,
            borderRadius:20,
            backgroundColor:'#38803B',
            marginTop:20,
            height:40,
            width:150,
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>نسخہ جات</Text>
          </TouchableOpacity>


          </View>


              <View style={{
              marginTop:80,
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
                borderBottomColor:'#38803B',
             //    backgroundColor:'orange',
                transform: [
                  {rotate: '180deg'}
                  ]
              }}
              
              />
              <View style={{
                position:'absolute',

                left:'43%',
                top:'5%',
              }}>

                <TouchableOpacity onPress={()=>this.actButton4()} style={{
                  width:60,
                  height:60,
                  borderWidth:1,
                  borderColor:'white',
                  backgroundColor:'#38803B',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:50,
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
 // backgroundColor:'#85C226',
 // backgroundColor:'transparent',
 
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




module.exports=Screen4;
