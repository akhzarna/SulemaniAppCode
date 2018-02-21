const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  ListView,
  TouchableOpacity,
  Alert,
  Platform,
} = require('react-native');


var menuIcon=require('./Icons/menu_icon.png');
var backArrow=require('./Icons/backArrow_2.png')
var headerImage=require('./Icons/header.png');

var isiPhone=Platform.OS === 'ios';



const window = Dimensions.get('window');




const Header = (props)=>{


  state={
    isDisabled:true,
    isOpen:false,
    swipeToClose: true,
    sliderValue: 0.3
  }


  function actMenuClick() {

   if (props.showMenu) {

     props.navigator.toggleDrawer({
        side: 'right',
        animated: true
      });

   }else{
     if (props.callBackFunction!= null) {
       props.callBackFunction("data passed");
     }
  props.navigator.pop();

   }
 }





	return (


        <Image resizeMode={'stretch'} source={headerImage} style={{height:120,width:window.width,backgroundColor:'transparent'}}>

       <View style={[styles.viewStyle,{backgroundColor:props.isHome?'transparent':'transparent'}]}>
       <View style={styles.iconView}>

       </View>



       <View style={styles.textView}>
       <Text style={styles.titleStyle}> {props.title} </Text>
       </View>


       <View style={styles.notifyStyle}>
       <TouchableOpacity style={styles.buttonDimension}
       onPress={actMenuClick}
       >
       {
         props.showMenu? (
       <Image resizeMode={'contain'} style={styles.iconMenuDimension} source={menuIcon}/>
           ):(
            <Image style={styles.iconStyle} source={backArrow}/>
             )
       }
       </TouchableOpacity>
       </View>






       </View>
       </Image>

		);



}





const styles=StyleSheet.create({

  headerStyle:{
  justifyContent:'center',
  width:window.width,
	},

  viewStyle:{
    // height: 70,
    // flex:1,
    marginTop:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  titleStyle:{
  textAlign:'center',
  // fontWeight:'bold',
  fontFamily:'Aslam',
  color:'white',
  fontSize:20,
  },
  iconView:{
    flex:1,
    marginTop:10,
    // backgroundColor:'green',
  },
  textView:{
    flex:2,
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'red',
  },
  notifyStyle:{
    flex:1,
    height:40,
    marginTop:10,
    alignItems:'flex-end',
    justifyContent:'center',
    // backgroundColor:'yellow',
  },
  iconStyle:{
    //31*46
    width:30,
     height:22,

  },
  buttonDimension:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:8,
    width:40,
    height:40,
    // marginLeft:15,
    // backgroundColor:'gray',
  },
  iconMenuDimension:{
    width:35,
     height:23,
     marginRight:15,

  },
  buttonNotificationDimention:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
    width:40,
    height:40,
  },
  iconNotifyDimension:{
     width:30,
     height:25,
     marginRight:15,
     resizeMode: 'contain',
  },
  notifyheaderStyle:{
  justifyContent:'center',
  alignItems:'center',
  height: 120,
  },



});



module.exports=Header;
