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
  ScrollView,
  AsyncStorage,
} from 'react-native';

var Header=require('./Header');
var HeadingView=require('./HeadingView');

var bookmark_icon=require('./Icons/bookmark_icon.png')
var share_icon=require('./Icons/share_icon.png')
import HTMLView from 'react-native-htmlview';

import Share, {ShareSheet, Button} from 'react-native-share';

class ReadingScreen extends Component{
  constructor(props){
    super(props);
    var reciveData=this.props.selectedItem.data;
    var tempData=this.props.selectedItem.data;
    var mainHeading = this.props.selectedItem.mainheading;
    var subHeading = this.props.selectedItem.subheading;
    var subbestHeading = this.props.selectedItem.subbestheading;
    var bookTitle = this.props.selectedTitle;
    var headingWords= [mainHeading,subHeading,subbestHeading];
    var index=tempData.indexOf('\r');
    var beforeHeading=tempData.slice(0,index);
    var afterHeading=tempData.slice(index+1,tempData.length);
    var headingData='<h1>'+beforeHeading+'</h1>';
    afterHeading=afterHeading.replace('\n','');
    afterHeading='<p>'+afterHeading+'</p>';
    if (Platform.OS === 'ios') {
    }else{
     reciveData=reciveData.split('\r').join('\n');
     afterHeading=afterHeading.split('\r').join('\n');
    }
    var modifiedData=afterHeading;
    reciveData='<p>'+reciveData+'</p>'
    this.state={
      data:modifiedData,
      orignalData:this.props.selectedItem.data,
      indexOfBookMark:-1,
      headingWords:headingWords,
      bookTitle:bookTitle,
    }

    this.checkForAlreadyBookMark();

  }


  checkForAlreadyBookMark(){
    AsyncStorage.getItem("bookMark").then((value) => {
              console.log('user data= ',JSON.parse(value));
              if (value!=null) {
                    var savedValue=JSON.parse(value);
                    var array=savedValue.bookMark;
                    for (var i = 0; i < array.length; i++) {
                      var paragraph=array[i]
                      var str1=paragraph.slice(0,15);
                      var data=this.props.selectedItem.data;
                      var str2=data.slice(0,15);
                      if (str1==str2) {
                        console.log("marked");
                        this.setState({indexOfBookMark:i});

                        break;
                      }else{
                        console.log("not marked");

                      }

                    }
              }

           }).done();
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
              var index3=data.indexOf('\r');
              var englishWord=data.slice(index2+1,index3);
              englishWord=englishWord.trim();
              array.push(persianWord);
              array.push(englishWord);
            }else{
              var index3=data.indexOf('\r');
              var englishWord=data.slice(index1+1,index3);
              englishWord=englishWord.trim();
              array.push(englishWord);
            }
    }else{
      var index3=data.indexOf('\r');
      var word=data.slice(0,index3);
      word=word.trim();
      array.push(word);

    }

  console.log(array);
  array.reverse();
  return array;

  }




  acutionButtonBookMark(){
    if (this.state.indexOfBookMark != -1) {
      AsyncStorage.getItem("bookMark").then((value) => {
                console.log('user data= ',JSON.parse(value));
                if (value!=null) {
                      var savedValue=JSON.parse(value);
                      var array=savedValue.bookMark;
                      var tempArray=[];
                      for(var i = 0; i < array.length; i++) {
                        if (i!=this.state.indexOfBookMark) {
                          tempArray.push(array[i]);
                        }
                      }
                      var bookMark={bookMark:tempArray};
                      AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                      this.setState({indexOfBookMark:-1});
                      Alert.alert('Alert!','Book Mark removed.')
                }

             }).done();
    }else{
    AsyncStorage.getItem("bookMark").then((value) => {
              console.log('user data= ',JSON.parse(value));
              if (value!=null) {
                    var savedValue=JSON.parse(value);
                    var array=savedValue.bookMark;
                    array.push(this.state.orignalData);
                    var bookMark={bookMark:array};
                    AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                    this.setState({indexOfBookMark:array.length-1});

              }else{
                var tempArray=[];
                tempArray.push(this.state.orignalData);
                var bookMark={bookMark:tempArray};
                AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                this.setState({indexOfBookMark:tempArray.length-1});

              }
              Alert.alert('Alert!','Book Mark Saved.')
           }).done();
      }

  }










  render(){

    let shareOptions = {
         title: "کتاب الرویا",
         message:this.props.selectedItem.data,
        //  url: "",
         subject: "Share Link" //  for email
       };


       const headingView=this.state.headingWords.map((item,index)=>{
         return(
           <View key={`item-${index}`} style={[styles.subViewStyle,{borderTopWidth:1,borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:index==this.state.headingWords.length-1?1:0,backgroundColor:'#BFEBFF'}]} >
           <Text style={{fontSize:27,color:'black',fontWeight:'bold' ,fontFamily:'Adobe Arabic',marginTop:10,marginBottom:10,marginLeft:5,marginRight:5,textAlign:'right'}}>{item} </Text>
           </View>
         )
       });



    return(
      <View style={styles.outerContainer}>
      <Header title={this.state.bookTitle} navigator={this.props.navigator} />
      <ScrollView style={styles.listView}>


      <View style={{marginBottom:15}}>
      <HeadingView headingWords={this.state.headingWords}/>
      </View>



      <HTMLView
        value={this.state.data}
        addLineBreaks={false}
        textComponentProps={{textAlign:'right'}}
        stylesheet={htmlstyles}
        />




        <TouchableOpacity onPress={()=>this.acutionButtonBookMark()} style={{marginLeft:40,marginRight:40,marginBottom:20,marginTop:40,backgroundColor:(this.state.indexOfBookMark!=-1)?'#E8590A':'gray',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
      <View style={styles.innerView}>
      <Image source={bookmark_icon} style={styles.iconStar}/>
        <Text style={styles.textStyle1}>بک مارک</Text>

      </View>
      </TouchableOpacity>





      <TouchableOpacity  onPress={()=>{
       Share.open(shareOptions);
      }}  style={{marginLeft:40,marginRight:40,marginBottom:40,marginTop:30,backgroundColor:'#2C3990',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>

      <View style={styles.innerView}>
      <Image source={share_icon}  style={styles.iconShare}/>
        <Text style={styles.textStyle1}>  شیئیر</Text>
      </View>

  </TouchableOpacity>




      </ScrollView>

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
      // marginRight:20,
      // marginLeft:20,
      paddingLeft:20,
      paddingRight:20,
      flex:1,

    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      marginLeft:15,
      marginRight:15,
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
      lineHeight:40,
    },
    iconDimention:{
      width:12,
      height:20,
    },
    innerView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    textStyle1:{
      color:'white',
      fontFamily:'Nafees Web Naskh',
      fontSize:25,
      // fontWeight:'bold',
    },
    iconShare:{
      width:30,
      height:25,
      marginRight:10,
    },
    defaultStyle:{
    textAlign:'right',
    // color:'blue'

  },
  iconStar:{
    height:25,
    width:25,
    marginRight:10,
    // backgroundColor:'green'
  },
  subViewStyle:{
    flex:1,
    // backgroundColor:'green',
    // borderWidth:1,
    // height:50,
    alignItems:'center',
    justifyContent:'center',
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
     lineHeight:35,
    fontFamily:'Nafees Web Naskh',
     fontSize:20,
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




module.exports=ReadingScreen;
