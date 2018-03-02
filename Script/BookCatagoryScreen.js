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
} from 'react-native';

var Header=require('./Header')
var Loader=require('./Loader')
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
const buttonWidth=DEVICE_WIDTH/2-50;

class BookCatagoryScreen extends Component{

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


actionButtonPress(id){
  var screenName='BooksListScreen';
  // if (id==1) {
  //   screenName='HomeScreen';
  // }else if (id==2) {
  //   screenName='HomeScreen';
  // }else if (id==3) {
  //   screenName='HomeScreen';
  // }else if (id==4) {
  //   screenName='HomeScreen';
  // }
  this.props.navigator.push({
    screen:screenName,
    // passProps:{finalArray},
    navigatorStyle:{
      navBarHidden:true,
    },
  })
}


  render(){


    return(
      <View style={styles.outerContainer}>
      <Header navigator={this.props.navigator} showMenu={true} title='طبی کتب'/>

      <View style={{flex:1,justifyContent:'center',alignItems:'center',
      }}>
      </View>

      <View style={{flex:4,
      // backgroundColor:'skyblue',
      }}>

        <View style={{flexDirection:'row',}}>

              <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(1)} style={styles.buttonStyle}>
                    <Text style={styles.titleStyle}>علمی ادبی معاشرتی کتب</Text>
                    </TouchableOpacity>
              </View>
              <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(2)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>تصانیف حکیم عبداللہ</Text>
                    </TouchableOpacity>
              </View>

        </View>

        <View style={{flexDirection:'row',marginTop:25}}>

              <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(3)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>دیگر</Text>
                    </TouchableOpacity>
              </View>
              <View style={[styles.rowView,{flex:1,height:buttonWidth,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(4)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>نسخہ جات</Text>
                    </TouchableOpacity>
              </View>

        </View>







      </View>



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
  borderWidth:StyleSheet.hairlineWidth,
  borderColor:'black',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#38803B',
  borderRadius:10,
  },
  titleStyle:{
    fontSize:20,
    textAlign:'center',
    color:'white',
    marginLeft:5,
    marginRight:5,
    backgroundColor:'transparent',
    fontFamily:'Nafees Web Naskh',
  },
  rowView:{
    width:buttonWidth,
    height:buttonWidth,
    // backgroundColor:'orange',
  }

});

module.exports=BookCatagoryScreen;
