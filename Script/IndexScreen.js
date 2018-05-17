// IndexScreen.js

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
  AsyncStorage,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');

var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';

class IndexScreen extends Component{
  constructor(props){

    super(props);

    var array=['ا','ب','پ','ت','ٹ','ث','ج','چ','ح','خ','د','ڈ','ذ','ر',
    'ڑ','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و',
    'ہ','ي'];

    var englishArray=['A','B','C',
                      'D','E','F',
                      'G','H','I',
                      'J','K','L',
                      'M','N','O',
                      'P','Q','R',
                      'S','T','U',
                      'V','W','X',
                      'Y','Z',
                      ]

    var objectArray=[];
    var length=Math.ceil(array.length/3);

    for (var i = 0; i <length; i++) {
      var object={data:i,key:i}
      objectArray.push(object);
    }

    this.state={
      bookArray:[],
      orignalArray:[],
      searchText:'',
      alphabetArray:array,
      listArray:objectArray,
      isUrduSelected:true,
      englishAlphabet:englishArray,
      urduAlphabet:array,
      showProgress:false,
    }
}

  componentDidMount() {
    this.setState({showProgress:true});
    AsyncStorage.getItem("booksData").then((value) => {
    var testVar = JSON.parse(value);
    if (testVar == null) {
      this.loadBookFromPhone();
    }else{
    this.setState({
      bookArray:JSON.parse(value)
    });
    }

    for (var i = 0; i < this.state.bookArray.length; i++) {
      if (this.state.bookArray[i].title == this.props.book.bookNameWithoutExtension) {

        // console.log('Book From Async is = ');
        // console.log(this.state.bookArray[i].title);
        // console.log(this.state.bookArray[i].data);
        this.state.orignalArray = this.state.bookArray[i].data;
      }
    }

    }).done();
}

rowSelected(item){

  if (item>=this.state.alphabetArray.length) {
    return;
  }
  var letterSelected=this.state.alphabetArray[item];
  var urdu=0;
  if (this.state.isUrduSelected) {
    urdu=1;
  }

  var selectedItem={key:item,urdu:urdu,letterSelected:letterSelected,bookName:this.props.book.bookName,bookArray:this.state.orignalArray};
  this.props.navigator.push({
    screen:'BookContents',
    passProps:{selectedItem},
    navigatorStyle:{
      navBarHidden:true,
    },
  })
}

  async loadBookFromPhone(){
    // Alert.alert('title, message?, buttons?, options?, type?')
    var bookName = this.props.book.bookName;
    var path='';
    if (Platform.OS === 'ios') {
    path=RNFS.MainBundlePath+'/'+bookName;
    // console.log(path);

  await  RNFS.readFile(path)
        .then((contents) => {
          this.loadBook(contents)
        })

  }else{
    // path=RNFS.DocumentDirectoryPath+'/Book2.txt';
    // path=RNFS.DocumentDirectoryPath+'/Book2.txt';
    path=''+bookName;
    RNFS.readFileAssets(path)
        .then((contents) => {
          this.loadBook(contents)
        })
  // readFileAssets
  }
}

loadBook(contents){

    Alert.alert('loadBook Called');
    var contentString = contents.toString();
    // console.log('Content Of Complete Book' + contentString);
    var chaptersArray=[];
    // For Chapters Titles denoted by & Sign
    for (var i = 0; i < contentString.length; i++) {
      var firstIndex=contentString.indexOf('&',i);
      var secondIndex=contentString.indexOf('&',firstIndex+1);
      if (secondIndex==-1 || firstIndex==-1) {
        break;
      }

      // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
      chaptersArray.push(tempString);
      i=secondIndex;
    }

    // console.log('Chapters Array is ='+chaptersArray);

    var titlesArray=[];
    var finalArray1=[];

    // For Main Titles denoted by @ Sign
    for (var i = 0; i < chaptersArray.length; i++) {
      var stringAtIndex = chaptersArray[i];
      var headingEndIndex = stringAtIndex.indexOf('\r',1);
      var testString=stringAtIndex.slice(0,headingEndIndex);
      // console.log('Akhzar is testing heading' + testString);

      for (var x = 0; x < stringAtIndex.length; x++) {
        var firstIndex=stringAtIndex.indexOf('@',x);
        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
        if (secondIndex==-1 || firstIndex==-1) {
          break;
        }
        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
        // Save String and Heading Both in Array
        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
        titlesArray.push(ObjectToSaveInArray);
        x=secondIndex;
      }
    }

    // console.log('Titles Array is ='+titlesArray);

    var tempArray=[];
    // For Nuskha Jaat denoted by $ Sign
    for (var i = 0; i < titlesArray.length; i++) {

      var mainHeading = titlesArray[i].heading;
      var stringAtIndex = titlesArray[i].data;
      // console.log('Main Heading is == ' + mainHeading);
      // console.log('stringAtIndex is == ' + stringAtIndex);

      var headingEndIndex = stringAtIndex.indexOf('\r',1);
      var testString=stringAtIndex.slice(0,headingEndIndex);
      // console.log('Akhzar is testing heading' + testString);

      for (var x = 0; x < stringAtIndex.length; x++) {

        var firstIndex=stringAtIndex.indexOf('$',x);
        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
        if (secondIndex==-1 || firstIndex==-1) {
          break;
        }

        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
        // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
        tempArray.push(ObjectToSaveInArray);
        x=secondIndex;

      }
    }

    // console.log('Main Temp Temp Array is ='+tempArray);

    // Extract Headings from Sub Content From $ Sign.

    // For Nuskha Jaat denoted by $ Sign
    for (var i = 0; i < tempArray.length; i++) {

      var mainHeading = tempArray[i].mainheading;
      var subHeading = tempArray[i].subheading;
      var stringAtIndex = tempArray[i].data;

      // console.log('Main Main Heading is == ' + mainHeading);
      // console.log('Sub Sub Heading is == ' + subHeading);
      // console.log('Main Main Data is == ' + stringAtIndex);

      var headingEndIndex = stringAtIndex.indexOf('\r',1);
      var testString=stringAtIndex.slice(0,headingEndIndex);
      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
      finalArray1.push(ObjectToSaveInArray);
    }
    this.setState({bookArray:finalArray1,
                orignalArray:finalArray1,
                showProgress:false,
          });
}


filterData(txtSearch){
      var newData=this.state.orignalArray.filter(function(item){
        var selectedItem=''+item.data;
        return selectedItem.indexOf(txtSearch)>-1
      });
      if (txtSearch.length==0) {
        this.setState({
          bookArray:this.state.orignalArray,
        })
      }else{
        this.setState({
          bookArray:newData,
        })
      }
}


actionButtonUrdu(){
         var tempEngArray=[];
         length=Math.ceil(this.state.urduAlphabet.length/3);
         for (var i = 0; i < length; i++) {
           var object={data:i,key:i};
           tempEngArray.push(object);
         }
         this.setState({isUrduSelected:true,
           listArray:tempEngArray,
           alphabetArray:this.state.urduAlphabet
                           });
}

   actionButtonEnglish(){
     var tempEngArray=[];
     length=Math.ceil(this.state.englishAlphabet.length/3);
     for (var i = 0; i < length; i++) {
       var object={data:i,key:i};
       tempEngArray.push(object);
     }

     this.setState({isUrduSelected:false,
       listArray:tempEngArray,
       alphabetArray:this.state.englishAlphabet,
                     });
   }

  render(){
    return(
      <View style={styles.outerContainer}>
      <Header title='ادارہ سیلمانی' navigator={this.props.navigator} />
      <View style={styles.listView}>
      <View style={{flex:1}}>
      {this.state.isUrduSelected?
          (
            <FlatList
                  data={this.state.listArray}
                  renderItem={({item}) =>
                  <View>
                  <View style={styles.listExternalView}>
                      <View style={[styles.subView,{}]}>
                        <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+2))} style={[styles.buttonStyle,{borderWidth:(item.key*3+2)<this.state.alphabetArray.length?1:0}]}>
                          <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+2)]}</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.subView,{}]}>
                          <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+1))} style={[styles.buttonStyle,{borderWidth:(item.key*3+1)<this.state.alphabetArray.length?1:0}]}>
                            <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+1)]}</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={[styles.subView,{}]}>
                          <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+0))} style={[styles.buttonStyle,{borderWidth:(item.key*3+0)<this.state.alphabetArray.length?1:0}]}>
                            <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+0)]}</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  </View>
                }
                />
          ):(
            <FlatList
                  data={this.state.listArray}
                  renderItem={({item}) =>
                  <View>
                  <View style={styles.listExternalView}>
                      <View style={[styles.subView,{}]}>
                        <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+0))} style={[styles.buttonStyle,{borderWidth:(item.key*3+0)<this.state.alphabetArray.length?1:0}]}>
                          <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+0)]}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.subView,{}]}>
                          <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+1))} style={[styles.buttonStyle,{borderWidth:(item.key*3+1)<this.state.alphabetArray.length?1:0}]}>
                            <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+1)]}</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={[styles.subView,{}]}>
                          <TouchableOpacity onPress={()=>this.rowSelected((item.key*3+2))} style={[styles.buttonStyle,{borderWidth:(item.key*3+2)<this.state.alphabetArray.length?1:0}]}>
                            <Text numberOfLines={1} style={styles.textStyle}>{this.state.alphabetArray[(item.key*3+2)]}</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  </View>
                }
                />
          )
      }
      </View>
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
    listExternalView:{
      height:80,
      flexDirection:'row',
    },
    subView:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',

    },
    lineView:{
      height:1,
      marginRight:15,
      marginLeft:15,
      backgroundColor:'#E5E5E5',
    },
    textStyle:{
      textAlign:'center',
      color:'#000000',
      fontFamily:'Nafees Web Naskh',
      fontSize:22,
      color:'#38803B',
    },
    buttonStyle:{
      // backgroundColor:'gray',
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
    },
    tabView:{
      flexDirection:'row',
      // marginLeft:30,
      // marginRight:30,
    },
    tabButtonStyle:{
      flex:1,
      height:45,
      alignItems:'center',
      justifyContent:'center',
    },
    buttonText:{
      color:'white',
      fontSize:15,
      fontWeight:'bold',
    }


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


module.exports=IndexScreen;
