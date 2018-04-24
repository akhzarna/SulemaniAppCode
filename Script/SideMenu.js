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
} from 'react-native';

var dashboard_logo=require('./Icons/logo.png');

class SideMenu extends Component{

  constructor(props){
    super(props);
    this.state={
      titleArray:[{key:0,data:'ڈیش بورڈ'},{key:1,data:'طبی کتب'},{key:2,data:'نسخہ جات'},{key:3,data:'بک مارکس'},{key:4,data:'یونانی ادویہ'},{key:5,data:'ادارہ سلیمانی۔منزل بہ منزل'},{key:6,data:'مضامین'},{key:7,data:'برائے رابطہ'}],
      iconsArray:[require('./Icons/ExpandMenu_1.png'),require('./Icons/ExpandMenu_2.png'),require('./Icons/ExpandMenu_6.png'),require('./Icons/ExpandMenu_3.png'),
                  require('./Icons/ExpandMenu_9.png'),require('./Icons/ExpandMenu_4.png'),
                  require('./Icons/ExpandMenu_7.png'),require('./Icons/ExpandMenu_14.png'),
                  require('./Icons/ExpandMenu_9.png'),require('./Icons/ExpandMenu_10.png'),
                  require('./Icons/ExpandMenu_11.png'),require('./Icons/ExpandMenu_12.png'),
                  require('./Icons/ExpandMenu_13.png'),require('./Icons/ExpandMenu_14.png'),
                  ],
    }
}

rowSelected(selectedItem){

            var screenName='';
            if (selectedItem.key==0) {
              screenName='HomeScreen';
            }else if (selectedItem.key==1) {
              screenName='BookCatagoryScreen';
            }
            else if(selectedItem.key==3){
              screenName='BookMarkScreen';
            }
            else if(selectedItem.key==5){
              screenName='IntroductionScreen';
            }else if(selectedItem.key==6){
              screenName='ListScreen';
            }
            else{
              this.toggleDrawer();
              return;
            }
            this.props.navigator.handleDeepLink({
            link:screenName,
                });
            this.toggleDrawer();
}

  toggleDrawer = () => {
      this.props.navigator.toggleDrawer({
        side: 'right',
      });
    };

  render(){

    return(

      <View style={styles.outerContainer}>
      <View style={styles.header}>
      <Image source={dashboard_logo} style={styles.logoStyle}/>
      </View>

      <FlatList
            data={this.state.titleArray}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=>this.rowSelected(item)}>
            <View style={styles.textView}>
            <Text numberOfLines={1} style={styles.textStyle}>{item.data}  </Text>
            <Image source={this.state.iconsArray[item.key]} style={styles.iconStyle}/>
            </View>
            </TouchableOpacity>
          }
          />
      </View>
    );}
}

const styles=StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:'white',
  },
  header:{
    height:200,
    backgroundColor:'#38803B',
    alignItems:'center',
    justifyContent:'center',
  },
  textView:{
    height:60,
    justifyContent:'flex-end',
    marginLeft:10,
    marginRight:10,
    alignItems:'center',
    flexDirection:'row',
  },
  lineView:{
    height:1,
    marginRight:10,
    marginLeft:10,
    backgroundColor:'gray',
  },
  textStyle:{
    textAlign:'right',
    color:'#231F20',
    fontFamily:'Nafees Web Naskh',
    fontSize:20,
  },
  iconStyle:{
    width:30,
    height:30,
    marginLeft:20,
  },
  logoStyle:{
    width:120,
    height:130,
  }
})

module.exports=SideMenu;
