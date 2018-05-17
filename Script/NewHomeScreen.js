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
  ImageBackground,
} from 'react-native';
var Header=require('./Header')
var Loader=require('./Loader')
var backgroundImage=require('./Icons/Bg.png');
var logoImage=require('./Icons/logo.png');
const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var sliderWidth=DEVICE_WIDTH;
var itemWidth=DEVICE_WIDTH/2;
const buttonWidth=DEVICE_WIDTH/2-90;
const logoWidth=DEVICE_WIDTH/3+25;

import Carousel from 'react-native-snap-carousel';



class NewHomeScreen extends Component{

    constructor(props){
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
      this.state={
            dataArray:[
              {fileName:require('./Banner/Matab_Banner_1.jpg'),key:5},
              {fileName:require('./Banner/Matab_Banner_2.png'),key:6},
              {fileName:require('./Banner/Matab_Banner_3.png'),key:7},
              {fileName:require('./Banner/honey_1.jpg'),key:0},
              {fileName:require('./Banner/honey_3.jpeg'),key:1},
              {fileName:require('./Banner/honey_2.jpg'),key:2},
              {fileName:require('./Banner/Honey_Farmi.jpg'),key:3},
              {fileName:require('./Banner/Honey_Wild.jpg'),key:4},
            ],
          iconsArray:[
            {fileName:require('./Icons/ExpandMenu_1y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_2y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_3y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_4y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_5y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_6y.png'),key:0},
            {fileName:require('./Icons/ExpandMenu_7y.png'),key:0},

          ],
      }

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



  _renderItem ({item, index}) {
          var image=item.fileName
      return (
          <View style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}>

              <Image source={image} style={{width:itemWidth,height:itemWidth,borderRadius:15}}/>

          </View>
      );
    }



    actionButtonPress(id){
      // Alert.alert(''+id)
      var screenName='HomeScreen';
      if (id==1) {
        screenName='HomeScreen';
      }else if (id==2) {
        screenName='HomeScreen';
      }else if (id==3) {
        screenName='HomeScreen';
      }else if (id==4) {
        screenName='HomeScreen';
      }else if (id==5) {
        screenName='HomeScreen';
      }else if (id==6) {
        screenName='HomeScreen';
      }

      this.props.navigator.push({
        screen:screenName,
        passProps:{finalArray},
        navigatorStyle:{
          navBarHidden:true,
        },
      })

    }




  render(){

    return(
      <View style={styles.outerContainer}>
        <ImageBackground resizeMode='stretch' source={backgroundImage} style={{width:DEVICE_WIDTH+10,height:DEVICE_HEIGHT+10}}>
        <Header isHome={true} title="ادارہ سیلمانی" navigator={this.props.navigator} showMenu={true}/>
              <View style={{flex:1,marginBottom:15}}>

              <View style={{flex:1,justifyContent:'center',alignItems:'center',
              }}>
                  <Image source={logoImage} resizeMode={'contain'}
                  style={{
                    width:logoWidth,
                    height:logoWidth,
                  }}/>


              </View>



              <View style={{flex:2,
              // backgroundColor:'skyblue',
              }}>

                <View style={{flexDirection:'row',}}>

                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={()=>this.actionButtonPress(1)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[0].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>ڈیش بورڈ</Text>
                            </TouchableOpacity>
                      </View>
                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={()=>this.actionButtonPress(2)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[1].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>رابطہ</Text>
                            </TouchableOpacity>
                      </View>

                </View>

                <View style={{flexDirection:'row',marginTop:25}}>

                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={()=>this.actionButtonPress(3)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[3].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>تاریخ</Text>
                            </TouchableOpacity>
                      </View>
                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={()=>this.actionButtonPress(4)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[4].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>حکیم</Text>
                            </TouchableOpacity>
                      </View>

                </View>



                <View style={{flexDirection:'row',marginTop:25}}>

                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity  onPress={()=>this.actionButtonPress(5)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[5].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>مضامین</Text>
                            </TouchableOpacity>
                      </View>
                      <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={()=>this.actionButtonPress(6)} style={styles.buttonStyle}>
                            <Image source={this.state.iconsArray[6].fileName} style={styles.iconStyle}/>
                            <Text style={styles.titleStyle}>کتابیں</Text>
                            </TouchableOpacity>
                      </View>

                </View>



              </View>


              {

                /**
                 * <Text style={{backgroundColor:'transparent',color:'white',fontSize:25,fontWeight:'bold',textAlign:'center'}}>طبی و علمی کتب، یونانی ادویہ اور طبی مسائل کے حل کے لیے قابل اعتماد ادارہ</Text>
                 */
              }
{/*
              <View style={{backgroundColor:'transparent',height:itemWidth+20,width:DEVICE_WIDTH,alignItems:'center',justifyContent:'center',}}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataArray}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    itemHeight={itemWidth}
                    loop={true}
                    autoplay={true}
                  />
            </View>
            */
}

              </View>

          </ImageBackground>
      </View>
    );
  }

}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'white',
},
iconStyle:{
    // flex:1,
    width:40,
    height:40,
    alignSelf:'center'
    // backgroundColor:'gray',
},
buttonStyle:{
width:buttonWidth,
height:buttonWidth,
borderWidth:2,
borderColor:'white',
alignItems:'center',
justifyContent:'center',
},
titleStyle:{
  fontSize:20,
  textAlign:'center',
  color:'white',
  marginTop:5,
  backgroundColor:'transparent',
  fontFamily:'Nafees Web Naskh',
},
rowView:{
  width:buttonWidth,
  height:buttonWidth,
  // backgroundColor:'orange',
}

})








module.exports=NewHomeScreen;
