import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Image,

} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
import HTMLView from 'react-native-htmlview';


class BookMarkScreen extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
    this.state={
      dataArray:[],
      orignalData:[],
    }
  }


  onNavigationEvent(event) {
  // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link;
            this.props.navigator.resetTo({
            screen: parts,
            navigatorStyle: {
              navBarHidden:true,
            },
          });

    }
  }








  componentDidMount() {

  this.loadBookMarks();

   }


loadBookMarks(){
  AsyncStorage.getItem("bookMark").then((value) => {
            // console.log('user data= ',JSON.parse(value));
            if (value!=null) {
                  var savedValue=JSON.parse(value);
                  var array=savedValue.bookMark;
                  var tempArray=[];
                  for (var i = 0; i < array.length; i++) {
                  var object={
                    key:i,
                    data:array[i]
                        }
                        tempArray.push(object);
                  }
                  tempArray.reverse();
                  this.setState({
                    dataArray:tempArray,
                    orignalData:tempArray
                  })
            }
         }).done();
}




rowSelected(selectedItem){



    this.props.navigator.push({
      screen:'BookMarkReading',
      passProps:{callBackFunction:(data)=>this.callBackFunction(data),selectedItem },
      navigatorStyle:{
        navBarHidden:true,
      },
    })

    //   this.props.navigator.push({
    //   screen:'DescriptionScreen',
    //   passProps:{callBackFunction:(data)=>this.callBackFunction(data),selectedItem },
    //   navigatorStyle:{
    //     navBarHidden:true,
    //   },
    // })


}

callBackFunction(data){
  this.loadBookMarks();
}






  render(){

    return(
      <View style={styles.outerContainer}>
      <Header navigator={this.props.navigator} showMenu={true} title='بک مارکس'/>
      <View style={styles.listView}>
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
            <Text numberOfLines={2} style={styles.textStyle}>{item.data.trim().replace(/#/g,'/')}</Text>
            </View>
            </View>
            <View style={styles.lineView}/>

            </TouchableOpacity>
          }
          />
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
    fontSize:17,
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
  defaultStyle:{
    textAlign:'right',
  },
})




const htmlstyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  b:{
    fontWeight:'bold',
    color:'blue',
    fontFamily:'Nafees Web Naskh',
    fontSize:20,
  },
  wrapper: {
        alignItems: "center",
  },
   p: {
     textAlign: "right",
     lineHeight:30,
     fontFamily:'Nafees Web Naskh',
     fontSize:18,
     color:'#606060',
    //  paddingTop:-40,
    // marginBottom: 3


  },
  h1:{
    fontSize:30,
    color:'red',
    fontFamily:'Nafees Web Naskh',
    textAlign: "right",
    // paddingTop:25,
    // lineHeight:20,
    // paddingBottom:-40,
  }

});




module.exports=BookMarkScreen;
