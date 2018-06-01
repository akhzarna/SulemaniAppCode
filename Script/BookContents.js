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

class BookContents extends Component{
  constructor(props){
    super(props);
    this.state={
      bookArray:this.props.selectedItem.bookArray,
      orignalArray:this.props.selectedItem.bookArray,
      txtSearch:this.props.selectedItem.letterSelected,
      sortedArray:[],
      showProgress:false,
    }

  }



  componentDidMount() {

    this.setState({showProgress:true});
    this.sortDataAccordingToIndex();


   }




rowSelected(selectedItem){
  var selectedItem=this.state.orignalArray[selectedItem.key];
  this.props.navigator.push({
    screen:'ReadingScreen',
    passProps:{selectedItem},
    navigatorStyle:{
      navBarHidden:true,
    },
  })
}








async sortDataAccordingToIndex(){
  var letter=this.props.selectedItem.letterSelected.toLowerCase();
  var array=this.state.orignalArray;
  var isUrduSelected=this.props.selectedItem.urdu;
  var tempArray=[];
  var displayArray=[];
  var counter=0;
      for (var i = 0; i < array.length; i++) {
        var paragarh=''+array[i].data;
        paragarh.trim();
        var headingWords=''+array[i].subheading;
        var word=headingWords.toLowerCase();
        // console.log(word[0]);
        if (word[0]==letter) {
          var titleString='';
          // headingWords.reverse();
          titleString=titleString+' '+headingWords;
          var displayObject={
            key:counter,
            data:titleString,
          }
          // var object={
          //   key:counter,
          //   data:paragarh,
          // }
          displayArray.push(displayObject);
          tempArray.push(array[i]);
          counter++;
          // break;
        }

      }

      this.setState({showProgress:false});
    this.setState({sortedArray:displayArray,orignalArray:tempArray});
}







seperateHeadingWord(data){
  // data='پاکستان\r';
var index1=data.indexOf('#');
var array=[];

if (index1!=-1) {
  var urduWord=data.slice(0,index1);
  urduWord=urduWord.trim();
  array.push(urduWord);
  var index2=data.indexOf('#',index1+1);
          if (index2!=-1) {
            var persianWord=data.slice(index1+1,index2);
            persianWord=persianWord.trim();
            var index3=data.indexOf('\r',1);
            var englishWord=data.slice(index2+1,index3);
            englishWord=englishWord.trim();
            array.push(persianWord);
            array.push(englishWord);
          }else{
            var index3=data.indexOf('\r',1);
            var englishWord=data.slice(index1+1,index3);
            englishWord=englishWord.trim();
            array.push(englishWord);
          }
  }else{
    var index3=data.indexOf('\r',1);
    var word=data.slice(0,index3);
    word=word.trim();
    array.push(word);

  }

// console.log(array);
array.reverse();
return array;

}












filterData(txtSearch){
  this.setState({
    txtSearch:txtSearch
  })
      var newData=this.state.orignalArray.filter(function(item){
        var selectedItem=''+item.data;
        selectedItem=selectedItem.toLowerCase();
        return selectedItem.indexOf(txtSearch.trim().toLowerCase())>-1
      });
      if (txtSearch.length==0) {
        this.setState({
          sortedArray:this.state.orignalArray,
        })
      }else{
        this.setState({
          sortedArray:newData,
        })
      }

}






  render(){
    return(
      <View style={styles.outerContainer}>
      <Header title='ادارہ سیلمانی' navigator={this.props.navigator} />
      <View style={styles.listView}>

          <View style={styles.inputView}>
                <TextInput style={styles.inputStyle}
                onChangeText={(txtSearch) =>this.filterData(txtSearch)}
                value={this.state.txtSearch}
                underlineColorAndroid='transparent'
                 />
          </View>

      <FlatList
            data={this.state.sortedArray}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=>this.rowSelected(item)}>

            <View style={styles.textView}>

            <View style={{flex:1}}>
            <Image source={arrow_left} style={styles.iconDimention}/>
            </View>

            <View style={{flex:8}}>

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
    inputView:{
      // backgroundColor:'gray',

      paddingTop:20,
      paddingBottom:20,
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


module.exports=BookContents;
