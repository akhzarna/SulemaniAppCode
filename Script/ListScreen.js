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
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader');
import HTMLView from 'react-native-htmlview';
var EassyData = require('./EassyData');
var EassyText=require('./EassyText');
var backArrow=require('./Icons/backArrow_2.png');
var headerImage=require('./Icons/header.png');
var searchIcon =  require('./Icons/search_icon.png');

class ListScreen extends Component{


      constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
        var dataArray=[];
        for (var i = 0; i < EassyData.titleArray.length; i++) {
          var title=EassyData.titleArray[i];
          var object={data:title,key:i};
          dataArray.push(object);
        }
        this.state={
          dataArray:dataArray,
          showSearchField:false,
        }
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




actButtonSearch(){
    this.setState({
      showSearchField:true,
    })

    // this.refs.SearchInput.focus();

  }
  actSearch(text){


//     var searchWord=text.trim();
//     var orignalData=this.state.dataArray;
//     this.setState({
//     textSearch:searchWord
//   })
//     if (searchWord == '') {
//       this.setState({
//         searchedData:orignalData,
//       })
//       return;
//     }
//     var finalArray=[];
//     for (var x = 0; x < this.props.finalArray.length; x++) {
//     var arrayList=[];
//     for (var i = 0; i < this.props.finalArray[x].searchedArray.length; i++) {
//       var paragraph=''+this.props.finalArray[x].searchedArray[i].data.data;

//       var index=paragraph.indexOf(searchWord);
//       // console.log('Index to HightLight is = '+index);
//       if (index == -1) {
//         continue;
//       }
//       var data='';
//       var firstIndex=-1;
//       var secondIndex=-1;
//       if (index-15>0) {
//         var tempIndex=index-15;
//         firstIndex=paragraph.indexOf(' ',tempIndex);
//       }else{
//         firstIndex=0;
//       }
//       secondIndex=paragraph.indexOf(' ',index+100);
//       if (secondIndex==-1) {
//         secondIndex==paragraph.length;
//       }
//       data=paragraph.slice(firstIndex,secondIndex);
//       data=data.replace(/\r|\n/g,' ');
//       data=data.replace(/#/g,' ');
//       // data=data.replace(searchWord,'<b>'+searchWord+'</b>');
//       // data='<p>'+data+'</p>';
//       var frequency=this.findFrequencyOfSearchWord(paragraph)

//       // console.log('paragraph is = ' + paragraph);
//       // console.log('data is = ' + data);
//       // console.log('key is = ' + i);
//       // console.log('frequency is = ' + frequency);

//       var object={data:data,key:i,frequency:frequency};
//       arrayList.push(object)
//       arrayList.sort(function(a,b){
//         return parseInt(b.frequency)-parseInt(a.frequency);
//       })

//   }
//   if (arrayList.length == 0) {
//     var object={data:"نتیج نہیں ملا",key:-1,frequency:"1"};
//     arrayList.push(object);
//   }
//       finalArray.push(arrayList);

// }

// var tempNewArray=[];
// for (var i = 0; i < finalArray.length; i++) {
//   var data=finalArray[i];
//   var title=this.props.finalArray[i].bookname
//   var key=i;
//   var object={data:data,key:key,title:title};
//   tempNewArray.push(object);
// }


//     this.setState({
//       searchedData:tempNewArray,

//     })



  }




 actionTextBlur(){

  if (this.state.textSearch == '') {
    this.setState({
      showSearchField:false,
    })
  }

}







rowSelected(item){
  var selectedItem={eassyId:item.key,heading:item.data};
  console.log("back data mazameeen", selectedItem,"blah blah",EassyText);
  this.props.navigator.push({
    screen:'EassyReading',
    passProps:{selectedItem},
    navigatorStyle:{
      navBarHidden:true,
    },
  })

}


  render(){

    return(
      <View style={styles.outerContainer}>

      <View style={{height:100}}>
        <ImageBackground resizeMode={'stretch'} style={{flex:1,}} source={headerImage}>
          <View style={{marginTop:30,flexDirection:'row'}}>

                <TouchableOpacity onPress={()=>this.actButtonSearch()} style={{marginLeft:10,marginRight:10,}}>
                  <Image style={{width:30,height:30}} source={searchIcon}/>
                </TouchableOpacity>

                <View style={{flex:1,marginLeft:10,marginRight:10}}>
                {
                  this.state.showSearchField?(
                    <View>
                    <TextInput
                    autoFocus={true}
                    selectionColor='black'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.actSearch(text)}
                    onBlur={()=>this.actionTextBlur()}
                    placeholder="تلاش کریں۔۔۔"
                    style={{
                      borderWidth:1,
                      borderColor:'white',
                      height:35,
                      marginRight:30,
                      textAlign:'right',
                      paddingRight:15,
                      paddingLeft:10,
                      borderRadius:20,
                      color:'white'
                    }}
                    />
                    </View>
                  ):(
                    <Text style={{
                      textAlign:'center',
                      backgroundColor:'transparent',
                      fontFamily:'Aslam',
                      color:'white',
                      fontSize:20,

                    }}> مضامین </Text>
                  )
                }
                </View>

                <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginRight:10}}>
                <Image style={{width:30,height:22}} source={backArrow}/>
                </TouchableOpacity>


          </View>

        </ImageBackground>
        </View>












      <View style={styles.listView}>

{/*
          <View style={styles.inputView}>
                <TextInput style={styles.inputStyle}
                onChangeText={(txtSearch) =>this.filterData(txtSearch)}
                value={this.state.txtSearch}
                underlineColorAndroid='transparent'
                 />
          </View>
          */
}
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
      fontSize:18,
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


module.exports=ListScreen;
