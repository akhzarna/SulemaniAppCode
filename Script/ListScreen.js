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
  AsyncStorage,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS=require('react-native-fs');
var Loader=require('./Loader');
import HTMLView from 'react-native-htmlview';
var ArticlesData=require('./ArticlesData');
var ArticlesText=require('./ArticlesText');
var backArrow=require('./Icons/backArrow_2.png');
var headerImage=require('./Icons/header.png');
var searchIcon=require('./Icons/search_icon.png');
var Constants=require('./Constants');

class ListScreen extends Component{

      constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
        var dataArray=[];
        for (var i = 0; i < ArticlesData.titleArray.length; i++) {
          var title=ArticlesData.titleArray[i];
          var object={data:title,key:i};
          dataArray.push(object);
        }
        this.state={
          articlesArray:[],
          testArray:[],
          dataArray:dataArray,
          showSearchField:false,
          visible: false,
          bookData:[],
          DataSource:[],
          DataShow:[],
          shareData:'',
          show:'',
          //wordTosearch:'',
        }
      }

componentDidMount(){

  // For Test Akhzar Nazir
  var path0='';
  path0=RNFS.MainBundlePath+'/Articles.txt';
  var tempArray=[];
  var mainArray=[];
  RNFS.readFile(path0)
      .then((contents) => {
        var contentString = contents.toString();
        // console.log('Content Of Complete Book' + contentString);
        var articlesNameArray=[];
        var articlesHeadingArray=[];
        var articlesDetailArray=[];
        var tempArray=[];
        for (var i = 0; i < contentString.length; i++) {
          // Main Heading denoted by & Sign
          var firstIndexname=contentString.indexOf('&',i);
          var secondIndexname=contentString.indexOf('&',firstIndexname+1);
          if (secondIndexname==-1 || firstIndexname==-1) {
            break;
          }

          var tempString=contentString.slice(firstIndexname+1,secondIndexname-1);
          articlesNameArray.push(tempString);
          i=secondIndexname;
          }

          for (var i = 0; i < contentString.length; i++) {
          // ArticleHeading denoted by @ Sign
          var firstIndexheading=contentString.indexOf('@',i);
          var secondIndexheading=contentString.indexOf('@',firstIndexheading+1);
          if (secondIndexheading==-1 || firstIndexheading==-1) {
            break;
          }

          var tempString=contentString.slice(firstIndexheading+1,secondIndexheading-1);
          articlesHeadingArray.push(tempString);
          i=secondIndexheading;
        }

        for (var i = 0; i < contentString.length; i++) {
          // ArticleDetail denoted by $ Sign
          var firstIndexdetail=contentString.indexOf('$',i);
          var secondIndexdetail=contentString.indexOf('$',firstIndexdetail+1);
          if (secondIndexdetail==-1 || firstIndexdetail==-1) {
            break;
          }

          var tempString=contentString.slice(firstIndexdetail+1,secondIndexdetail-1);
          articlesDetailArray.push(tempString);
          i=secondIndexdetail;

        }

        for (var x = 0; x < articlesDetailArray.length; x++) {
          var ObjectToSaveInArray = {key:x,mainheading:articlesNameArray[0],subheading:articlesHeadingArray[x],subbestheading:articlesHeadingArray[x],data:articlesDetailArray[x].trim()};
          tempArray.push(ObjectToSaveInArray);
        }

        console.log('YES Man Tahir is =',tempArray);
        AsyncStorage.setItem('articlesData', JSON.stringify(this.state.articlesArray));
        var Object0ToSaveInMainArray = {title:'مضامین',data:tempArray};
        mainArray.push(Object0ToSaveInMainArray);
        console.log('main Man Tahir is =',mainArray);
        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;

        this.setState({
          articlesArray:mainArray,
          testArray:tempArray,
        })

      })
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

actButtonSearch(){
    this.setState({
      showSearchField:true,
    })
}

actionTextBlur(){

  if (this.state.textSearch == '') {
    this.setState({
      showSearchField:false,
    })
  }
}

rowSelected(item){
  var selectedItem={ArticlesId:item.key,heading:item.subbestheading,data:item.data};
  this.props.navigator.push({
    screen:'ArticlesReading',
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
                    onChangeText={(text) => this.findRelatedWord(text)}
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
      */}
      <FlatList
            data={this.state.testArray}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=>this.rowSelected(item)}>
            <View style={styles.textView}>
            <View style={{flex:1}}>
            <Image source={arrow_left} style={styles.iconDimention}/>
            </View>
            <View style={{flex:8}}>
            <Text  style={styles.textStyle}>{}</Text>
            <Text numberOfLines={2} style={styles.textStyle}>{item.subbestheading.trim()}</Text>
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
      flex:1,
    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      paddingLeft:15,
      paddingRight:15,
      flexDirection:'row',
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
    },
    inputView:{
      paddingTop:20,
      paddingBottom:20,
    },
    defaultStyle:{
      textAlign:'right',
    },
})

module.exports=ListScreen;

// componentDidMount() {

//           if (!Constants.isFileLoaded) {
//           // this.actionButtonLoadBook();
//         //  this.checkforBook();
//         //  this.getCounterValue();
//         //  this.getHomeIndexCounter();
//             }else{
//               this.setDataFormate();
// //               this.actionButtonLoadBook();

//               this.setState({
//                 bookArray:Constants.FileArray,
//                 showProgress:false,
//               })
//             }

//             //  // console.log("word to search descrip",this.props.selectedItem.searchWord);
//              this.actionButtonLoadBook();




//    }

// //    componentWillUnmount() {
// //    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
// // }





// setDataFormate(){
//   var dataArray=Constants.FileArray;
//   var tempArray1=[];
//   for (var i = 0; i < dataArray.length; i++) {
//     var tempString= dataArray[i];
//     var object= {key:i,data:tempString};
//     tempArray1.push(object);
//   }
//   this.setState({orignalBookArray:tempArray1});

// }





// actionButtonLoadBook(){


//     var path='';
//     if (Platform.OS === 'ios') {
//     path=RNFS.MainBundlePath+'/Essay.txt';
//     // path=RNFS.MainBundlePath+'/Book.txt';

//     // // console.log(path);
//      var ciphertext=(contents.toString());
//           var contentString=ciphertext;

//     RNFS.readFile(path)
//         .then((contents) => {
//           // console.warn(contents)

//           //enable only for encryptthe data once
//           // var contentString =contents.toString();
//           // this.TestEnncryption(contentString);
//             //end for encryption code

//           //start

//           var tempArray1=[];
//           for (var i = 0; i < contentString.length; i++) {
//             var firstIndex=contentString.indexOf('<vr>',i);
//             var secondIndex=contentString.indexOf('<vr>',firstIndex+1);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//             var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//             tempArray1.push(tempString);
//             i=secondIndex-1;
//           }
//          // // console.log(tempArray1.length);

//           // // console.log(tempArray);
//           Constants.FileArray=tempArray1;
//           Constants.isFileLoaded=true;

//           this.setState({showProgress:false});
//           this.setState({
//             bookArray:tempArray1
//           })
//         //  this.saveArrayInMemory(tempArray1);
//           this.setDataFormate();
//            this.findRelatedWord(tempArray1);
//             //end




//         })


//   }else{

//      var  path1='Essay.txt';
//      RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//         .then((result) => {
//           // console.log('GOT RESULT', result);
//         // stat the first file
//           // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//         });
//     // path=RNFS.DocumentDirectoryPath+'/Book2.txt';
//     // path=RNFS.DocumentDirectoryPath+'/Book2.txt';
//   //  path='Essay.txt';
//     RNFS.readFileAssets(path)
//         .then((contents) => {
//           // console.warn(contents)
//           // var display=contents.slice(0,500);
//           // // console.log(contents);
//          var ciphertext=(contents.toString());
//           var contentString=ciphertext;


//           var tempArray1=[];
//           for (var i = 0; i < contentString.length; i++) {
//             var firstIndex=contentString.indexOf('<vr>',i);
//             var secondIndex=contentString.indexOf('<vr>',firstIndex+4);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//             var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//             tempArray1.push(tempString);
//             i=secondIndex-1;
//           }


//           Constants.FileArray=tempArray1;
//           Constants.isFileLoaded=true;

//           this.setState({showProgress:false});
//           this.setState({
//             bookData:tempArray1
//            // bookArray:tempArray1
//           });
//          //   this.saveArrayInMemory(tempArray1);

//           this.setDataFormate();
//        //   this.findRelatedWord(tempArray1);


//           //   var wordtoSearched = this.props.selectedItem.searchWord;




//         })
// // readFileAssets
//   }



//   }


// findRelatedWord(text)
// {
//        var searchWord=text.trim();
//        var index=0;
//             var storageArray=[];
//             var fileArray=this.state.bookData;
//             var yarr=[];
//            //  var foundIndexdata=[];
//            //this.props.selectedItem.searchWord.replace(' ','');
//           //  var word=this.props.selectedItem.searchWord.split(' ').join('');
//           // // console.log("array from searching", fileArray);
//        for (var i = 0; i < fileArray.length; i++) {

//                      var object1= fileArray[i];

//                         // tempArray.push(object1);

//               //           // console.log("Loop Portion");
//                      //   // console.log("word to search descrip",this.props.selectedItem.searchWord);
//                         index=object1.indexOf(searchWord);

//                         if (index ==-1) {
//                         //  // console.log("Index not found");
//                           }
//                           else{
//                           //  // console.log("Index Found at number =",index);
//                             object1=object1.split('\n').join('');
//                             object1=object1.split('vr>').join('');
//                             object1=object1.split('\r').join('');
//                           //  object1=object1.split(',').join('\n');

//                               this.setState({DataSource:object1});
//                               // console.log("lo g bbbbbbb",this.state.DataSource);
//                               // yarr=this.state.DataSource;
//                    //           // console.log("Data in the Arra is=",this.state.DataSource,"yarrrrrrr values of for =",yarr);
//                                    //   break;
//   }
// }
//                               // yarr=yarr.split('\n');
//                               // yarr=yarr.split('');
//     //                           for (var i = 0; i < yarr.length; i++) {
//     //         var firstIndex=yarr.indexOf(',' , i);
//     //         var secondIndex=yarr.indexOf(',' , firstIndex+1);
//     //         if (secondIndex==-1 || firstIndex==-1) {
//     //    //       // console.log("No Index found of ,,","length of yarrr arry=",yarr.length);
//     //         //  break;
//     //         } else{


//     //         var singleword=yarr.slice(firstIndex+1,secondIndex+1);
//     //        // var object={key:i,data:singleword};
//     //        // storageArray.push(object);
//     //         singleword=singleword.split(',').join(' ');
//     //         storageArray.push(singleword);
//     //         i=secondIndex-1;

//     //        //   // console.log("where the word is storing", storageArray.length);
//     //           this.setState({DataShow:storageArray});
//     // //         // console.log("Last Array of save dataa", this.state.DataShow);

//     //       }







//                         }
