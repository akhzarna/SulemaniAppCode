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
  CheckBox,
  AsyncStorage,
  FlatList,
} from 'react-native';
var Header=require('./Header')
var Loader=require('./Loader')

var RNFS = require('react-native-fs');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress';
import Autocomplete from 'react-native-autocomplete-input';
import Carousel from 'react-native-snap-carousel';

var dashboard_logo=require('./Icons/logo.png')
var checkIcon=require('./Icons/checkBoxWhite.png');
var uncheckIcon=require('./Icons/uncheckBoxWhite.png');
var Constants=require('./Constants')

var backgroundImage=require('./Icons/Bg.png');

var isiPhone=Platform.OS === 'ios';
const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var sliderWidth=DEVICE_WIDTH;
var itemWidth=DEVICE_WIDTH/2-50;

class HomeScreen extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

    var alif = {key:'ا',data:0};
    var bay = {key:'ب',data:0};
    var pay = {key:'پ',data:0};
    var tay = {key:'ت',data:0};
    var ttay = {key:'ٹ',data:0};
    var say = {key:'ث',data:0};
    var jeem = {key:'ج',data:0};
    var chay = {key:'چ',data:0};
    var hey = {key:'ح',data:0};
    var khey = {key:'خ',data:0};
    var dal = {key:'د',data:0};
    var ddal = {key:'ڈ',data:0};
    var zaal = {key:'ذ',data:0};
    var ray = {key:'ر',data:0};
    var aray = {key:'ڑ',data:0};
    var zay = {key:'ز',data:0};
    var say = {key:'ژ',data:0};
    var seen = {key:'س',data:0};
    var sheen = {key:'ش',data:0};
    var saad = {key:'ص',data:0};
    var zaad = {key:'ض',data:0};
    var toain = {key:'ط',data:0};
    var zoain = {key:'ظ',data:0};
    var ain = {key:'ع',data:0};
    var ghain = {key:'غ',data:0};
    var fey = {key:'ف',data:0};
    var kaf = {key:'ق',data:0};
    var kaaf = {key:'ک',data:0};
    var gaaf = {key:'گ',data:0};
    var laam = {key:'ل',data:0};
    var meem = {key:'م',data:0};
    var noon = {key:'ن',data:0};
    var wao = {key:'و',data:0};
    var hey = {key:'ہ',data:0};
    var chotiye = {key:'ی',data:0};

    var array=[alif,bay,pay,tay,ttay,say,jeem,chay,hey,khey,dal,ddal,zaal,ray,aray,zay,say,seen,sheen,saad,zaad,toain,zoain,ain,ghain,fey,kaf,kaaf,gaaf,laam,meem,noon,wao,hey,chotiye];

    // var array=['ا','ب','پ','ت','ٹ','ث','ج','چ','ح','خ','د','ڈ','ذ','ر',
    // 'ڑ','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و',
    // 'ہ','ي'];

    this.state={
        urduAlphabet:array,
        fileContent:'kdsnfk',
        bookArray:[],
        txtSearch:'',
        isUrduSelected:true,
        buttonSearchTitle:'تلاش کریں',
        booksListTitle:'کتابوں کی فہرست کے لیئے آگے چلیئے',
        placeholderText:'نسخہ جات  یا علاج تلاش کریں',
        showProgress:true,
        isBook1Selected:true,
        isBook2Selected:true,
        pressStatus: false,
        isBook3Selected: this.props.isOption1,
        isBook4Selected: !this.props.isOption1,
        searchResultArray:[],
        bannersArray:[
          {fileName:require('./Banner/Matab_Banner_1.jpg'),key:5},
          {fileName:require('./Banner/Matab_Banner_2.png'),key:6},
          {fileName:require('./Banner/Matab_Banner_3.png'),key:7},
          {fileName:require('./Banner/honey_1.jpg'),key:0},
          {fileName:require('./Banner/honey_3.jpeg'),key:1},
          {fileName:require('./Banner/honey_2.jpg'),key:2},
          {fileName:require('./Banner/Honey_Farmi.jpg'),key:3},
          {fileName:require('./Banner/Honey_Wild.jpg'),key:4},
        ],

    }
}

  onNavigationEvent(event) {
	// handle a deep link
		if (event.type == 'DeepLink') {
			const parts = event.link;
			if (parts=='Home') {
				// // // console.log(parts);
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

  componentDidMount() {

    AsyncStorage.getItem("booksData").then((value) => {
    var testVar = JSON.parse(value);
    if (testVar == null) {
      this.actionButtonLoadBook();
    }else{
    this.setState({
      bookArray:JSON.parse(value)
    });
    this.setState({showProgress:false});
    this.slectFunc();
    }
  }
    ).done();

}

  componentWillUnmount() {

  }

  actionButtonLoadBook(){

    var path1='';
    var path2='';
    var path3='';
    var path4='';
    var path5='';
    var path6='';
    var path7='';
    var path8='';
    var path9='';
    var path10='';
    var path11='';
    var path12='';
    var path13='';
    var path14='';
    var path15='';
    var path16='';

    if (Platform.OS === 'ios') {

    path1=RNFS.MainBundlePath+'/آرنڈ.txt';
    path2=RNFS.MainBundlePath+'/اندرائین.txt';
    path3=RNFS.MainBundlePath+'/انگور.txt';
    path4=RNFS.MainBundlePath+'/آم.txt';
    path5=RNFS.MainBundlePath+'/خواص آک.txt';
    path6=RNFS.MainBundlePath+'/بادام.txt';
    path7=RNFS.MainBundlePath+'/برگد.txt';
    path8=RNFS.MainBundlePath+'/دھتورہ.txt';
    path9=RNFS.MainBundlePath+'/خواص شہد.txt';
    path10=RNFS.MainBundlePath+'/دھنیہ.txt';
    path11=RNFS.MainBundlePath+'/دودھ.txt';
    path12=RNFS.MainBundlePath+'/گاجر.txt';
    path13=RNFS.MainBundlePath+'/گھی کوار.txt';
    path14=RNFS.MainBundlePath+'/گھی.txt';
    path15=RNFS.MainBundlePath+'/دھی.txt';
    path16=RNFS.MainBundlePath+'/گل سرک.txt';

    var finalArray1=[];
    RNFS.readFile(path1)
        .then((contents) => {
          var contentString = contents.toString();
          // // // console.log('Content Of Complete Book' + contentString);
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('&',i);
            var secondIndex=contentString.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }

          // // console.log('Chapters Array is ='+chaptersArray);

          var titlesArray=[];

          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // console.log('Akhzar is testing heading' + testString);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }

          // // console.log('Titles Array is ='+titlesArray);

          var tempArray=[];
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < titlesArray.length; i++) {

            var mainHeading = titlesArray[i].heading;
            var stringAtIndex = titlesArray[i].data;
            // // console.log('Main Heading is == ' + mainHeading);
            // // console.log('stringAtIndex is == ' + stringAtIndex);
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // console.log('Mobeen Gainda is testing heading' + testString);
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('$',x);
              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
              tempArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }

          // // console.log('Main Temp Temp Array is ='+tempArray);
          // Extract Headings from Sub Content From $ Sign.
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < tempArray.length; i++) {

            var mainHeading = tempArray[i].mainheading;
            var subHeading = tempArray[i].subheading;
            var stringAtIndex = tempArray[i].data;

            // // console.log('Main Main Heading is == ' + mainHeading);
            // // console.log('Sub Sub Heading is == ' + subHeading);
            // // console.log('Main Main Data is == ' + stringAtIndex);

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
            finalArray1.push(ObjectToSaveInArray);
          }
        })

        var finalArray2=[];

        RNFS.readFile(path2)
            .then((contents) => {

              var contentString = contents.toString();
              var chaptersArray=[];
              // For Chapters Titles denoted by & Sign
              for (var i = 0; i < contentString.length; i++) {
                var firstIndex=contentString.indexOf('&',i);
                var secondIndex=contentString.indexOf('&',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                chaptersArray.push(tempString);
                i=secondIndex;
              }

              var titlesArray=[];

              // For Main Titles denoted by @ Sign
              for (var i = 0; i < chaptersArray.length; i++) {
                var stringAtIndex = chaptersArray[i];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('@',x);
                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                  titlesArray.push(ObjectToSaveInArray);
                  x=secondIndex;
                }

              }

              var tempArray=[];
              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < titlesArray.length; i++) {
                var mainHeading = titlesArray[i].heading;
                var stringAtIndex = titlesArray[i].data;
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                for (var x = 0; x < stringAtIndex.length; x++) {
                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                  tempArray.push(ObjectToSaveInArray);
                  x=secondIndex;
                }
              }
              // Extract Headings from Sub Content From $ Sign.

              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < tempArray.length; i++) {

                var mainHeading = tempArray[i].mainheading;
                var subHeading = tempArray[i].subheading;
                var stringAtIndex = tempArray[i].data;

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                finalArray2.push(ObjectToSaveInArray);

              }
            })

            var finalArray3=[];

            RNFS.readFile(path3)
                .then((contents) => {
                  var contentString = contents.toString();
                  var chaptersArray=[];
                  // For Chapters Titles denoted by & Sign
                  for (var i = 0; i < contentString.length; i++) {
                    var firstIndex=contentString.indexOf('&',i);
                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                    chaptersArray.push(tempString);
                    i=secondIndex;
                  }

                  var titlesArray=[];

                  // For Main Titles denoted by @ Sign
                  for (var i = 0; i < chaptersArray.length; i++) {
                    var stringAtIndex = chaptersArray[i];
                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('@',x);
                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // Save String and Heading Both in Array
                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                      titlesArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }

                  }


                  var tempArray=[];
                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < titlesArray.length; i++) {

                    var mainHeading = titlesArray[i].heading;
                    var stringAtIndex = titlesArray[i].data;

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('$',x);
                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                      tempArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }
                  }

                  // Extract Headings from Sub Content From $ Sign.

                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < tempArray.length; i++) {

                    var mainHeading = tempArray[i].mainheading;
                    var subHeading = tempArray[i].subheading;
                    var stringAtIndex = tempArray[i].data;

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                    finalArray3.push(ObjectToSaveInArray);

                  }
                })



                var finalArray4=[];

                RNFS.readFile(path4)
                    .then((contents) => {
                      var contentString = contents.toString();
                      var chaptersArray=[];
                      // For Chapters Titles denoted by & Sign
                      for (var i = 0; i < contentString.length; i++) {
                        var firstIndex=contentString.indexOf('&',i);
                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                        chaptersArray.push(tempString);
                        i=secondIndex;
                      }

                      var titlesArray=[];

                      // For Main Titles denoted by @ Sign
                      for (var i = 0; i < chaptersArray.length; i++) {
                        var stringAtIndex = chaptersArray[i];
                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('@',x);
                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                          // Save String and Heading Both in Array
                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                          titlesArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }

                      }

                      var tempArray=[];
                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < titlesArray.length; i++) {

                        var mainHeading = titlesArray[i].heading;
                        var stringAtIndex = titlesArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('$',x);
                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                          tempArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }
                      }

                      // Extract Headings from Sub Content From $ Sign.

                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < tempArray.length; i++) {

                        var mainHeading = tempArray[i].mainheading;
                        var subHeading = tempArray[i].subheading;
                        var stringAtIndex = tempArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                        finalArray4.push(ObjectToSaveInArray);

                      }
                    })




                    var finalArray5=[];

                    RNFS.readFile(path5)
                        .then((contents) => {
                          var contentString = contents.toString();
                          var chaptersArray=[];
                          // For Chapters Titles denoted by & Sign
                          for (var i = 0; i < contentString.length; i++) {
                            var firstIndex=contentString.indexOf('&',i);
                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                            chaptersArray.push(tempString);
                            i=secondIndex;
                          }

                          var titlesArray=[];

                          // For Main Titles denoted by @ Sign
                          for (var i = 0; i < chaptersArray.length; i++) {
                            var stringAtIndex = chaptersArray[i];
                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('@',x);
                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                              // Save String and Heading Both in Array
                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                              titlesArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }

                          }

                          var tempArray=[];
                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < titlesArray.length; i++) {

                            var mainHeading = titlesArray[i].heading;
                            var stringAtIndex = titlesArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('$',x);
                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                              tempArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }
                          }

                          // Extract Headings from Sub Content From $ Sign.

                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < tempArray.length; i++) {

                            var mainHeading = tempArray[i].mainheading;
                            var subHeading = tempArray[i].subheading;
                            var stringAtIndex = tempArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                            finalArray5.push(ObjectToSaveInArray);

                          }
                        })



                        var finalArray6=[];

                        RNFS.readFile(path6)
                            .then((contents) => {
                              var contentString = contents.toString();
                              var chaptersArray=[];
                              // For Chapters Titles denoted by & Sign
                              for (var i = 0; i < contentString.length; i++) {
                                var firstIndex=contentString.indexOf('&',i);
                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                chaptersArray.push(tempString);
                                i=secondIndex;
                              }

                              var titlesArray=[];

                              // For Main Titles denoted by @ Sign
                              for (var i = 0; i < chaptersArray.length; i++) {
                                var stringAtIndex = chaptersArray[i];
                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                  // Save String and Heading Both in Array
                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                  titlesArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }

                              }

                              var tempArray=[];
                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < titlesArray.length; i++) {

                                var mainHeading = titlesArray[i].heading;
                                var stringAtIndex = titlesArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                  tempArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }
                              }

                              // Extract Headings from Sub Content From $ Sign.

                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < tempArray.length; i++) {

                                var mainHeading = tempArray[i].mainheading;
                                var subHeading = tempArray[i].subheading;
                                var stringAtIndex = tempArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                finalArray6.push(ObjectToSaveInArray);

                              }
                            })



                            var finalArray7=[];

                            RNFS.readFile(path7)
                                .then((contents) => {
                                  var contentString = contents.toString();
                                  var chaptersArray=[];
                                  // For Chapters Titles denoted by & Sign
                                  for (var i = 0; i < contentString.length; i++) {
                                    var firstIndex=contentString.indexOf('&',i);
                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                    chaptersArray.push(tempString);
                                    i=secondIndex;
                                  }


                                  var titlesArray=[];

                                  // For Main Titles denoted by @ Sign
                                  for (var i = 0; i < chaptersArray.length; i++) {
                                    var stringAtIndex = chaptersArray[i];
                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                      // Save String and Heading Both in Array
                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                      titlesArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }

                                  }

                                  var tempArray=[];
                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < titlesArray.length; i++) {

                                    var mainHeading = titlesArray[i].heading;
                                    var stringAtIndex = titlesArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                      tempArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }
                                  }

                                  // Extract Headings from Sub Content From $ Sign.

                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < tempArray.length; i++) {

                                    var mainHeading = tempArray[i].mainheading;
                                    var subHeading = tempArray[i].subheading;
                                    var stringAtIndex = tempArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                    finalArray7.push(ObjectToSaveInArray);

                                  }
                                })




                                var finalArray8=[];

                                RNFS.readFile(path8)
                                    .then((contents) => {
                                      var contentString = contents.toString();
                                      var chaptersArray=[];
                                      // For Chapters Titles denoted by & Sign
                                      for (var i = 0; i < contentString.length; i++) {
                                        var firstIndex=contentString.indexOf('&',i);
                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                        chaptersArray.push(tempString);
                                        i=secondIndex;
                                      }

                                      var titlesArray=[];

                                      // For Main Titles denoted by @ Sign
                                      for (var i = 0; i < chaptersArray.length; i++) {
                                        var stringAtIndex = chaptersArray[i];
                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          // Save String and Heading Both in Array
                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                          titlesArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }

                                      }

                                      var tempArray=[];
                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < titlesArray.length; i++) {

                                        var mainHeading = titlesArray[i].heading;
                                        var stringAtIndex = titlesArray[i].data;

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                          tempArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }
                                      }

                                      // Extract Headings from Sub Content From $ Sign.

                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < tempArray.length; i++) {

                                        var mainHeading = tempArray[i].mainheading;
                                        var subHeading = tempArray[i].subheading;
                                        var stringAtIndex = tempArray[i].data;

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                        finalArray8.push(ObjectToSaveInArray);

                                      }
                                    })



                                    var finalArray9=[];

                                    RNFS.readFile(path9)
                                        .then((contents) => {
                                          var contentString = contents.toString();
                                          var chaptersArray=[];
                                          // For Chapters Titles denoted by & Sign
                                          for (var i = 0; i < contentString.length; i++) {
                                            var firstIndex=contentString.indexOf('&',i);
                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                            chaptersArray.push(tempString);
                                            i=secondIndex;
                                          }

                                          var titlesArray=[];

                                          // For Main Titles denoted by @ Sign
                                          for (var i = 0; i < chaptersArray.length; i++) {
                                            var stringAtIndex = chaptersArray[i];
                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                              // Save String and Heading Both in Array
                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                              titlesArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }

                                          }

                                          var tempArray=[];
                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < titlesArray.length; i++) {

                                            var mainHeading = titlesArray[i].heading;
                                            var stringAtIndex = titlesArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                              tempArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }
                                          }

                                          // Extract Headings from Sub Content From $ Sign.

                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < tempArray.length; i++) {

                                            var mainHeading = tempArray[i].mainheading;
                                            var subHeading = tempArray[i].subheading;
                                            var stringAtIndex = tempArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                            finalArray9.push(ObjectToSaveInArray);

                                          }
                                        })



                                        var finalArray10=[];

                                        RNFS.readFile(path10)
                                            .then((contents) => {
                                              var contentString = contents.toString();
                                              var chaptersArray=[];
                                              // For Chapters Titles denoted by & Sign
                                              for (var i = 0; i < contentString.length; i++) {
                                                var firstIndex=contentString.indexOf('&',i);
                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                chaptersArray.push(tempString);
                                                i=secondIndex;
                                              }


                                              var titlesArray=[];

                                              // For Main Titles denoted by @ Sign
                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                var stringAtIndex = chaptersArray[i];
                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                  // Save String and Heading Both in Array
                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                  titlesArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }

                                              }


                                              var tempArray=[];
                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < titlesArray.length; i++) {

                                                var mainHeading = titlesArray[i].heading;
                                                var stringAtIndex = titlesArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                  tempArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }
                                              }

                                              // Extract Headings from Sub Content From $ Sign.

                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < tempArray.length; i++) {

                                                var mainHeading = tempArray[i].mainheading;
                                                var subHeading = tempArray[i].subheading;
                                                var stringAtIndex = tempArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                finalArray10.push(ObjectToSaveInArray);

                                              }
                                            })

                                            var finalArray11=[];

                                            RNFS.readFile(path11)
                                                .then((contents) => {
                                                  var contentString = contents.toString();
                                                  var chaptersArray=[];
                                                  // For Chapters Titles denoted by & Sign
                                                  for (var i = 0; i < contentString.length; i++) {
                                                    var firstIndex=contentString.indexOf('&',i);
                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                    chaptersArray.push(tempString);
                                                    i=secondIndex;
                                                  }

                                                  var titlesArray=[];

                                                  // For Main Titles denoted by @ Sign
                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                    var stringAtIndex = chaptersArray[i];
                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                      // Save String and Heading Both in Array
                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                      titlesArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }

                                                  }

                                                  var tempArray=[];
                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                    var mainHeading = titlesArray[i].heading;
                                                    var stringAtIndex = titlesArray[i].data;

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                      tempArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }
                                                  }

                                                  // Extract Headings from Sub Content From $ Sign.

                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < tempArray.length; i++) {

                                                    var mainHeading = tempArray[i].mainheading;
                                                    var subHeading = tempArray[i].subheading;
                                                    var stringAtIndex = tempArray[i].data;

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                    finalArray11.push(ObjectToSaveInArray);

                                                  }
                                                })




                                                var finalArray12=[];

                                                RNFS.readFile(path12)
                                                    .then((contents) => {
                                                      var contentString = contents.toString();
                                                      var chaptersArray=[];
                                                      // For Chapters Titles denoted by & Sign
                                                      for (var i = 0; i < contentString.length; i++) {
                                                        var firstIndex=contentString.indexOf('&',i);
                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                        chaptersArray.push(tempString);
                                                        i=secondIndex;
                                                      }

                                                      var titlesArray=[];

                                                      // For Main Titles denoted by @ Sign
                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                        var stringAtIndex = chaptersArray[i];
                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // Save String and Heading Both in Array
                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                          titlesArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }

                                                      }


                                                      var tempArray=[];
                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                        var mainHeading = titlesArray[i].heading;
                                                        var stringAtIndex = titlesArray[i].data;

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                          tempArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }
                                                      }

                                                      // Extract Headings from Sub Content From $ Sign.

                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < tempArray.length; i++) {

                                                        var mainHeading = tempArray[i].mainheading;
                                                        var subHeading = tempArray[i].subheading;
                                                        var stringAtIndex = tempArray[i].data;

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                        finalArray12.push(ObjectToSaveInArray);

                                                      }
                                                    })



                                                    var finalArray13=[];

                                                    RNFS.readFile(path13)
                                                        .then((contents) => {
                                                          var contentString = contents.toString();
                                                          var chaptersArray=[];
                                                          // For Chapters Titles denoted by & Sign
                                                          for (var i = 0; i < contentString.length; i++) {
                                                            var firstIndex=contentString.indexOf('&',i);
                                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                            chaptersArray.push(tempString);
                                                            i=secondIndex;
                                                          }

                                                          var titlesArray=[];

                                                          // For Main Titles denoted by @ Sign
                                                          for (var i = 0; i < chaptersArray.length; i++) {
                                                            var stringAtIndex = chaptersArray[i];
                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // Save String and Heading Both in Array
                                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                              titlesArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }

                                                          }


                                                          var tempArray=[];
                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < titlesArray.length; i++) {

                                                            var mainHeading = titlesArray[i].heading;
                                                            var stringAtIndex = titlesArray[i].data;

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                              tempArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }
                                                          }

                                                          // Extract Headings from Sub Content From $ Sign.

                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < tempArray.length; i++) {

                                                            var mainHeading = tempArray[i].mainheading;
                                                            var subHeading = tempArray[i].subheading;
                                                            var stringAtIndex = tempArray[i].data;

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                            finalArray13.push(ObjectToSaveInArray);

                                                          }
                                                        })




                                                        var finalArray14=[];

                                                        RNFS.readFile(path14)
                                                            .then((contents) => {
                                                              var contentString = contents.toString();
                                                              var chaptersArray=[];
                                                              // For Chapters Titles denoted by & Sign
                                                              for (var i = 0; i < contentString.length; i++) {
                                                                var firstIndex=contentString.indexOf('&',i);
                                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                chaptersArray.push(tempString);
                                                                i=secondIndex;
                                                              }

                                                              var titlesArray=[];

                                                              // For Main Titles denoted by @ Sign
                                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                                var stringAtIndex = chaptersArray[i];
                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // Save String and Heading Both in Array
                                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                  titlesArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }

                                                              }


                                                              var tempArray=[];
                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < titlesArray.length; i++) {

                                                                var mainHeading = titlesArray[i].heading;
                                                                var stringAtIndex = titlesArray[i].data;

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                  tempArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }
                                                              }

                                                              // Extract Headings from Sub Content From $ Sign.

                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < tempArray.length; i++) {

                                                                var mainHeading = tempArray[i].mainheading;
                                                                var subHeading = tempArray[i].subheading;
                                                                var stringAtIndex = tempArray[i].data;

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                finalArray14.push(ObjectToSaveInArray);

                                                              }
                                                            })


                                                            var finalArray15=[];

                                                            RNFS.readFile(path15)
                                                                .then((contents) => {
                                                                  var contentString = contents.toString();
                                                                  var chaptersArray=[];
                                                                  // For Chapters Titles denoted by & Sign
                                                                  for (var i = 0; i < contentString.length; i++) {
                                                                    var firstIndex=contentString.indexOf('&',i);
                                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                    chaptersArray.push(tempString);
                                                                    i=secondIndex;
                                                                  }


                                                                  var titlesArray=[];

                                                                  // For Main Titles denoted by @ Sign
                                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                                    var stringAtIndex = chaptersArray[i];
                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // Save String and Heading Both in Array
                                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                      titlesArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }

                                                                  }

                                                                  var tempArray=[];
                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                                    var mainHeading = titlesArray[i].heading;
                                                                    var stringAtIndex = titlesArray[i].data;

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                      tempArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }
                                                                  }

                                                                  // Extract Headings from Sub Content From $ Sign.

                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < tempArray.length; i++) {

                                                                    var mainHeading = tempArray[i].mainheading;
                                                                    var subHeading = tempArray[i].subheading;
                                                                    var stringAtIndex = tempArray[i].data;

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                    finalArray15.push(ObjectToSaveInArray);

                                                                  }
                                                                })





                                                                var finalArray16=[];

                                                                RNFS.readFile(path16)
                                                                    .then((contents) => {
                                                                      var contentString = contents.toString();
                                                                      var chaptersArray=[];
                                                                      // For Chapters Titles denoted by & Sign
                                                                      for (var i = 0; i < contentString.length; i++) {
                                                                        var firstIndex=contentString.indexOf('&',i);
                                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                        chaptersArray.push(tempString);
                                                                        i=secondIndex;
                                                                      }


                                                                      var titlesArray=[];

                                                                      // For Main Titles denoted by @ Sign
                                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                                        var stringAtIndex = chaptersArray[i];
                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // Save String and Heading Both in Array
                                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                          titlesArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }

                                                                      }

                                                                      var tempArray=[];
                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                                        var mainHeading = titlesArray[i].heading;
                                                                        var stringAtIndex = titlesArray[i].data;

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                          tempArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }
                                                                      }

                                                                      // Extract Headings from Sub Content From $ Sign.

                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < tempArray.length; i++) {

                                                                        var mainHeading = tempArray[i].mainheading;
                                                                        var subHeading = tempArray[i].subheading;
                                                                        var stringAtIndex = tempArray[i].data;

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                        finalArray16.push(ObjectToSaveInArray);

                                                                      }

                                                                      this.setState({showProgress:false});
                                                                      AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));
                                                                      this.slectFunc();

                                                                    })

        var mainArray=[];
        var Object1ToSaveInMainArray = {title:'آرنڈ',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'اندرائین',data:finalArray2};
        var Object3ToSaveInMainArray = {title:'انگور',data:finalArray3};
        var Object4ToSaveInMainArray = {title:'آم',data:finalArray4};
        var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
        var Object6ToSaveInMainArray = {title:'بادام',data:finalArray6};
        var Object7ToSaveInMainArray = {title:'برگد',data:finalArray7};
        var Object8ToSaveInMainArray = {title:'دھتورہ',data:finalArray8};
        var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
        var Object10ToSaveInMainArray = {title:'دھنیہ',data:finalArray10};
        var Object11ToSaveInMainArray = {title:'دودھ',data:finalArray11};
        var Object12ToSaveInMainArray = {title:'گاجر',data:finalArray12};
        var Object13ToSaveInMainArray = {title:'گھی کوار',data:finalArray13};
        var Object14ToSaveInMainArray = {title:'گھی',data:finalArray14};
        var Object15ToSaveInMainArray = {title:'دھی',data:finalArray15};
        var Object16ToSaveInMainArray = {title:'گل سرک',data:finalArray16};

        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);
        mainArray.push(Object3ToSaveInMainArray);
        mainArray.push(Object4ToSaveInMainArray);
        mainArray.push(Object5ToSaveInMainArray);
        mainArray.push(Object6ToSaveInMainArray);
        mainArray.push(Object7ToSaveInMainArray);
        mainArray.push(Object8ToSaveInMainArray);
        mainArray.push(Object9ToSaveInMainArray);
        mainArray.push(Object10ToSaveInMainArray);
        mainArray.push(Object11ToSaveInMainArray);
        mainArray.push(Object12ToSaveInMainArray);
        mainArray.push(Object13ToSaveInMainArray);
        mainArray.push(Object14ToSaveInMainArray);
        mainArray.push(Object15ToSaveInMainArray);
        mainArray.push(Object16ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:mainArray
        })

  }else{

    // For Android Path is different  خواص آک

    var  path1='آرنڈ.txt';
    var  path2='اندرائین.txt';
    var  path3='انگور.txt';
    var  path4='آم.txt';
    var  path5='خواص آک.txt';
    var  path6='بادام.txt';
    var  path7='برگد.txt';
    var  path8='دھتورہ.txt';
    var  path9='خواص شہد.txt';
    var  path10='دھنیہ.txt';
    var  path11='دودھ.txt';
    var  path12='گاجر.txt';
    var  path13='گھی کوار.txt';
    var  path14='گھی.txt';
    var  path15='دھی.txt';
    var  path16='گل سرک.txt';

    // Alert.alert('title')
    RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        // // console.log('GOT RESULT', result);
      // stat the first file
        // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      });
      // // console.log('End of File results');

    var finalArray1=[];
    RNFS.readFileAssets(path1)
        .then((contents) => {
          var contentString = contents.toString();
          // // console.log('Content Of Complete Book' + contentString);
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('&',i);
            var secondIndex=contentString.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }

          // // console.log('Chapters Array is ='+chaptersArray);

          var titlesArray=[];

          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // console.log('Akhzar is testing heading' + testString);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }

          }

          // // console.log('Titles Array is ='+titlesArray);

          var tempArray=[];
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < titlesArray.length; i++) {

            var mainHeading = titlesArray[i].heading;
            var stringAtIndex = titlesArray[i].data;
            // // console.log('Main Heading is == ' + mainHeading);
            // // console.log('stringAtIndex is == ' + stringAtIndex);

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // console.log('Akhzar is testing heading' + testString);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('$',x);
              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
              tempArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }
          // // console.log('Main Temp Temp Array is ='+tempArray);

          // Extract Headings from Sub Content From $ Sign.

          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < tempArray.length; i++) {

            var mainHeading = tempArray[i].mainheading;
            var subHeading = tempArray[i].subheading;
            var stringAtIndex = tempArray[i].data;

            // // console.log('Main Main Heading is == ' + mainHeading);
            // // console.log('Sub Sub Heading is == ' + subHeading);
            // // console.log('Main Main Data is == ' + stringAtIndex);

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
            finalArray1.push(ObjectToSaveInArray);
          }
        })

        var finalArray2=[];

        RNFS.readFileAssets(path2)
            .then((contents) => {
              var contentString = contents.toString();
              // // console.log('Content Of Complete Book' + contentString);
              var chaptersArray=[];
              // For Chapters Titles denoted by & Sign
              for (var i = 0; i < contentString.length; i++) {
                var firstIndex=contentString.indexOf('&',i);
                var secondIndex=contentString.indexOf('&',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                chaptersArray.push(tempString);
                i=secondIndex;
              }

              // // console.log('Chapters Array is ='+chaptersArray);

              var titlesArray=[];

              // For Main Titles denoted by @ Sign
              for (var i = 0; i < chaptersArray.length; i++) {
                var stringAtIndex = chaptersArray[i];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                // // console.log('Akhzar is testing heading' + testString);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('@',x);
                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                  titlesArray.push(ObjectToSaveInArray);
                  x=secondIndex;

                }

              }

              // // console.log('Titles Array is ='+titlesArray);

              var tempArray=[];
              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < titlesArray.length; i++) {

                var mainHeading = titlesArray[i].heading;
                var stringAtIndex = titlesArray[i].data;
                // // console.log('Main Heading is == ' + mainHeading);
                // // console.log('stringAtIndex is == ' + stringAtIndex);

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                // // console.log('Akhzar is testing heading' + testString);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                  tempArray.push(ObjectToSaveInArray);
                  x=secondIndex;

                }
              }
              // // console.log('Main Temp Temp Array is ='+tempArray);

              // Extract Headings from Sub Content From $ Sign.

              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < tempArray.length; i++) {

                var mainHeading = tempArray[i].mainheading;
                var subHeading = tempArray[i].subheading;
                var stringAtIndex = tempArray[i].data;

                // // console.log('Main Main Heading is == ' + mainHeading);
                // // console.log('Sub Sub Heading is == ' + subHeading);
                // // console.log('Main Main Data is == ' + stringAtIndex);

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                finalArray2.push(ObjectToSaveInArray);

              }
            })


            var finalArray3=[];

            RNFS.readFileAssets(path3)
                .then((contents) => {
                  var contentString = contents.toString();
                  // // console.log('Content Of Complete Book' + contentString);
                  var chaptersArray=[];
                  // For Chapters Titles denoted by & Sign
                  for (var i = 0; i < contentString.length; i++) {
                    var firstIndex=contentString.indexOf('&',i);
                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                    chaptersArray.push(tempString);
                    i=secondIndex;
                  }

                  // // console.log('Chapters Array is ='+chaptersArray);

                  var titlesArray=[];

                  // For Main Titles denoted by @ Sign
                  for (var i = 0; i < chaptersArray.length; i++) {
                    var stringAtIndex = chaptersArray[i];
                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    // // console.log('Akhzar is testing heading' + testString);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('@',x);
                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // Save String and Heading Both in Array
                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                      titlesArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }

                  }

                  // // console.log('Titles Array is ='+titlesArray);

                  var tempArray=[];
                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < titlesArray.length; i++) {

                    var mainHeading = titlesArray[i].heading;
                    var stringAtIndex = titlesArray[i].data;
                    // // console.log('Main Heading is == ' + mainHeading);
                    // // console.log('stringAtIndex is == ' + stringAtIndex);

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    // // console.log('Akhzar is testing heading' + testString);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('$',x);
                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                      tempArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }
                  }
                  // // console.log('Main Temp Temp Array is ='+tempArray);

                  // Extract Headings from Sub Content From $ Sign.

                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < tempArray.length; i++) {

                    var mainHeading = tempArray[i].mainheading;
                    var subHeading = tempArray[i].subheading;
                    var stringAtIndex = tempArray[i].data;

                    // // console.log('Main Main Heading is == ' + mainHeading);
                    // // console.log('Sub Sub Heading is == ' + subHeading);
                    // // console.log('Main Main Data is == ' + stringAtIndex);

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                    finalArray3.push(ObjectToSaveInArray);

                  }
                })



                var finalArray4=[];

                RNFS.readFileAssets(path4)
                    .then((contents) => {
                      var contentString = contents.toString();
                      // // console.log('Content Of Complete Book' + contentString);
                      var chaptersArray=[];
                      // For Chapters Titles denoted by & Sign
                      for (var i = 0; i < contentString.length; i++) {
                        var firstIndex=contentString.indexOf('&',i);
                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                        chaptersArray.push(tempString);
                        i=secondIndex;
                      }

                      // // console.log('Chapters Array is ='+chaptersArray);

                      var titlesArray=[];

                      // For Main Titles denoted by @ Sign
                      for (var i = 0; i < chaptersArray.length; i++) {
                        var stringAtIndex = chaptersArray[i];
                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        // // console.log('Akhzar is testing heading' + testString);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('@',x);
                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                          // Save String and Heading Both in Array
                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                          titlesArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }

                      }

                      // // console.log('Titles Array is ='+titlesArray);

                      var tempArray=[];
                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < titlesArray.length; i++) {

                        var mainHeading = titlesArray[i].heading;
                        var stringAtIndex = titlesArray[i].data;
                        // // console.log('Main Heading is == ' + mainHeading);
                        // // console.log('stringAtIndex is == ' + stringAtIndex);

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        // // console.log('Akhzar is testing heading' + testString);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('$',x);
                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                          // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                          tempArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }
                      }
                      // // console.log('Main Temp Temp Array is ='+tempArray);

                      // Extract Headings from Sub Content From $ Sign.

                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < tempArray.length; i++) {

                        var mainHeading = tempArray[i].mainheading;
                        var subHeading = tempArray[i].subheading;
                        var stringAtIndex = tempArray[i].data;

                        // // console.log('Main Main Heading is == ' + mainHeading);
                        // // console.log('Sub Sub Heading is == ' + subHeading);
                        // // console.log('Main Main Data is == ' + stringAtIndex);

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                        finalArray4.push(ObjectToSaveInArray);

                      }
                    })




                    var finalArray5=[];

                    RNFS.readFileAssets(path5)
                        .then((contents) => {
                          var contentString = contents.toString();
                          // // console.log('Content Of Complete Book' + contentString);
                          var chaptersArray=[];
                          // For Chapters Titles denoted by & Sign
                          for (var i = 0; i < contentString.length; i++) {
                            var firstIndex=contentString.indexOf('&',i);
                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                            chaptersArray.push(tempString);
                            i=secondIndex;
                          }

                          // // console.log('Chapters Array is ='+chaptersArray);

                          var titlesArray=[];

                          // For Main Titles denoted by @ Sign
                          for (var i = 0; i < chaptersArray.length; i++) {
                            var stringAtIndex = chaptersArray[i];
                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            // // console.log('Akhzar is testing heading' + testString);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('@',x);
                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                              // Save String and Heading Both in Array
                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                              titlesArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }

                          }

                          // // console.log('Titles Array is ='+titlesArray);

                          var tempArray=[];
                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < titlesArray.length; i++) {

                            var mainHeading = titlesArray[i].heading;
                            var stringAtIndex = titlesArray[i].data;
                            // // console.log('Main Heading is == ' + mainHeading);
                            // // console.log('stringAtIndex is == ' + stringAtIndex);

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            // // console.log('Akhzar is testing heading' + testString);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('$',x);
                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                              // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                              tempArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }
                          }
                          // // console.log('Main Temp Temp Array is ='+tempArray);

                          // Extract Headings from Sub Content From $ Sign.

                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < tempArray.length; i++) {

                            var mainHeading = tempArray[i].mainheading;
                            var subHeading = tempArray[i].subheading;
                            var stringAtIndex = tempArray[i].data;

                            // // console.log('Main Main Heading is == ' + mainHeading);
                            // // console.log('Sub Sub Heading is == ' + subHeading);
                            // // console.log('Main Main Data is == ' + stringAtIndex);

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                            finalArray5.push(ObjectToSaveInArray);

                          }
                        })



                        var finalArray6=[];

                        RNFS.readFileAssets(path6)
                            .then((contents) => {
                              var contentString = contents.toString();
                              // // console.log('Content Of Complete Book' + contentString);
                              var chaptersArray=[];
                              // For Chapters Titles denoted by & Sign
                              for (var i = 0; i < contentString.length; i++) {
                                var firstIndex=contentString.indexOf('&',i);
                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                chaptersArray.push(tempString);
                                i=secondIndex;
                              }

                              // // console.log('Chapters Array is ='+chaptersArray);

                              var titlesArray=[];

                              // For Main Titles denoted by @ Sign
                              for (var i = 0; i < chaptersArray.length; i++) {
                                var stringAtIndex = chaptersArray[i];
                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                // // console.log('Akhzar is testing heading' + testString);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                  // Save String and Heading Both in Array
                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                  titlesArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }

                              }

                              // // console.log('Titles Array is ='+titlesArray);

                              var tempArray=[];
                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < titlesArray.length; i++) {

                                var mainHeading = titlesArray[i].heading;
                                var stringAtIndex = titlesArray[i].data;
                                // // console.log('Main Heading is == ' + mainHeading);
                                // // console.log('stringAtIndex is == ' + stringAtIndex);

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                // // console.log('Akhzar is testing heading' + testString);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                  // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                  tempArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }
                              }
                              // // console.log('Main Temp Temp Array is ='+tempArray);

                              // Extract Headings from Sub Content From $ Sign.

                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < tempArray.length; i++) {

                                var mainHeading = tempArray[i].mainheading;
                                var subHeading = tempArray[i].subheading;
                                var stringAtIndex = tempArray[i].data;

                                // // console.log('Main Main Heading is == ' + mainHeading);
                                // // console.log('Sub Sub Heading is == ' + subHeading);
                                // // console.log('Main Main Data is == ' + stringAtIndex);

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                finalArray6.push(ObjectToSaveInArray);

                              }
                            })



                            var finalArray7=[];

                            RNFS.readFileAssets(path7)
                                .then((contents) => {
                                  var contentString = contents.toString();
                                  // // console.log('Content Of Complete Book' + contentString);
                                  var chaptersArray=[];
                                  // For Chapters Titles denoted by & Sign
                                  for (var i = 0; i < contentString.length; i++) {
                                    var firstIndex=contentString.indexOf('&',i);
                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                    chaptersArray.push(tempString);
                                    i=secondIndex;
                                  }

                                  // // console.log('Chapters Array is ='+chaptersArray);

                                  var titlesArray=[];

                                  // For Main Titles denoted by @ Sign
                                  for (var i = 0; i < chaptersArray.length; i++) {
                                    var stringAtIndex = chaptersArray[i];
                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    // // console.log('Akhzar is testing heading' + testString);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                      // Save String and Heading Both in Array
                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                      titlesArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }

                                  }

                                  // // console.log('Titles Array is ='+titlesArray);

                                  var tempArray=[];
                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < titlesArray.length; i++) {

                                    var mainHeading = titlesArray[i].heading;
                                    var stringAtIndex = titlesArray[i].data;
                                    // // console.log('Main Heading is == ' + mainHeading);
                                    // // console.log('stringAtIndex is == ' + stringAtIndex);

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    // // console.log('Akhzar is testing heading' + testString);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                      // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                      tempArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }
                                  }
                                  // // console.log('Main Temp Temp Array is ='+tempArray);

                                  // Extract Headings from Sub Content From $ Sign.

                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < tempArray.length; i++) {

                                    var mainHeading = tempArray[i].mainheading;
                                    var subHeading = tempArray[i].subheading;
                                    var stringAtIndex = tempArray[i].data;

                                    // // console.log('Main Main Heading is == ' + mainHeading);
                                    // // console.log('Sub Sub Heading is == ' + subHeading);
                                    // // console.log('Main Main Data is == ' + stringAtIndex);

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                    finalArray7.push(ObjectToSaveInArray);

                                  }
                                })




                                var finalArray8=[];

                                RNFS.readFileAssets(path8)
                                    .then((contents) => {
                                      var contentString = contents.toString();
                                      // // console.log('Content Of Complete Book' + contentString);
                                      var chaptersArray=[];
                                      // For Chapters Titles denoted by & Sign
                                      for (var i = 0; i < contentString.length; i++) {
                                        var firstIndex=contentString.indexOf('&',i);
                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                        chaptersArray.push(tempString);
                                        i=secondIndex;
                                      }

                                      // // console.log('Chapters Array is ='+chaptersArray);

                                      var titlesArray=[];

                                      // For Main Titles denoted by @ Sign
                                      for (var i = 0; i < chaptersArray.length; i++) {
                                        var stringAtIndex = chaptersArray[i];
                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        // // console.log('Akhzar is testing heading' + testString);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          // Save String and Heading Both in Array
                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                          titlesArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }

                                      }

                                      // // console.log('Titles Array is ='+titlesArray);

                                      var tempArray=[];
                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < titlesArray.length; i++) {

                                        var mainHeading = titlesArray[i].heading;
                                        var stringAtIndex = titlesArray[i].data;
                                        // // console.log('Main Heading is == ' + mainHeading);
                                        // // console.log('stringAtIndex is == ' + stringAtIndex);

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        // // console.log('Akhzar is testing heading' + testString);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                          tempArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }
                                      }
                                      // // console.log('Main Temp Temp Array is ='+tempArray);

                                      // Extract Headings from Sub Content From $ Sign.

                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < tempArray.length; i++) {

                                        var mainHeading = tempArray[i].mainheading;
                                        var subHeading = tempArray[i].subheading;
                                        var stringAtIndex = tempArray[i].data;

                                        // // console.log('Main Main Heading is == ' + mainHeading);
                                        // // console.log('Sub Sub Heading is == ' + subHeading);
                                        // // console.log('Main Main Data is == ' + stringAtIndex);

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                        finalArray8.push(ObjectToSaveInArray);

                                      }
                                    })



                                    var finalArray9=[];

                                    RNFS.readFileAssets(path9)
                                        .then((contents) => {
                                          var contentString = contents.toString();
                                          // // console.log('Content Of Complete Book' + contentString);
                                          var chaptersArray=[];
                                          // For Chapters Titles denoted by & Sign
                                          for (var i = 0; i < contentString.length; i++) {
                                            var firstIndex=contentString.indexOf('&',i);
                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                            chaptersArray.push(tempString);
                                            i=secondIndex;
                                          }

                                          // // console.log('Chapters Array is ='+chaptersArray);

                                          var titlesArray=[];

                                          // For Main Titles denoted by @ Sign
                                          for (var i = 0; i < chaptersArray.length; i++) {
                                            var stringAtIndex = chaptersArray[i];
                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            // // console.log('Akhzar is testing heading' + testString);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                              // Save String and Heading Both in Array
                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                              titlesArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }

                                          }

                                          // // console.log('Titles Array is ='+titlesArray);

                                          var tempArray=[];
                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < titlesArray.length; i++) {

                                            var mainHeading = titlesArray[i].heading;
                                            var stringAtIndex = titlesArray[i].data;
                                            // // console.log('Main Heading is == ' + mainHeading);
                                            // // console.log('stringAtIndex is == ' + stringAtIndex);

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            // // console.log('Akhzar is testing heading' + testString);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                              // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                              tempArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }
                                          }
                                          // // console.log('Main Temp Temp Array is ='+tempArray);

                                          // Extract Headings from Sub Content From $ Sign.

                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < tempArray.length; i++) {

                                            var mainHeading = tempArray[i].mainheading;
                                            var subHeading = tempArray[i].subheading;
                                            var stringAtIndex = tempArray[i].data;

                                            // // console.log('Main Main Heading is == ' + mainHeading);
                                            // // console.log('Sub Sub Heading is == ' + subHeading);
                                            // // console.log('Main Main Data is == ' + stringAtIndex);

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                            finalArray9.push(ObjectToSaveInArray);

                                          }
                                        })



                                        var finalArray10=[];

                                        RNFS.readFileAssets(path10)
                                            .then((contents) => {
                                              var contentString = contents.toString();
                                              // // console.log('Content Of Complete Book' + contentString);
                                              var chaptersArray=[];
                                              // For Chapters Titles denoted by & Sign
                                              for (var i = 0; i < contentString.length; i++) {
                                                var firstIndex=contentString.indexOf('&',i);
                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                chaptersArray.push(tempString);
                                                i=secondIndex;
                                              }

                                              // // console.log('Chapters Array is ='+chaptersArray);

                                              var titlesArray=[];

                                              // For Main Titles denoted by @ Sign
                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                var stringAtIndex = chaptersArray[i];
                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                // // console.log('Akhzar is testing heading' + testString);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                  // Save String and Heading Both in Array
                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                  titlesArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }

                                              }

                                              // // console.log('Titles Array is ='+titlesArray);

                                              var tempArray=[];
                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < titlesArray.length; i++) {

                                                var mainHeading = titlesArray[i].heading;
                                                var stringAtIndex = titlesArray[i].data;
                                                // // console.log('Main Heading is == ' + mainHeading);
                                                // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                // // console.log('Akhzar is testing heading' + testString);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                  // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                  tempArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }
                                              }
                                              // // console.log('Main Temp Temp Array is ='+tempArray);

                                              // Extract Headings from Sub Content From $ Sign.

                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < tempArray.length; i++) {

                                                var mainHeading = tempArray[i].mainheading;
                                                var subHeading = tempArray[i].subheading;
                                                var stringAtIndex = tempArray[i].data;

                                                // // console.log('Main Main Heading is == ' + mainHeading);
                                                // // console.log('Sub Sub Heading is == ' + subHeading);
                                                // // console.log('Main Main Data is == ' + stringAtIndex);

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                finalArray10.push(ObjectToSaveInArray);

                                              }
                                            })

                                            var finalArray11=[];

                                            RNFS.readFileAssets(path11)
                                                .then((contents) => {
                                                  var contentString = contents.toString();
                                                  // // console.log('Content Of Complete Book' + contentString);
                                                  var chaptersArray=[];
                                                  // For Chapters Titles denoted by & Sign
                                                  for (var i = 0; i < contentString.length; i++) {
                                                    var firstIndex=contentString.indexOf('&',i);
                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                    chaptersArray.push(tempString);
                                                    i=secondIndex;
                                                  }

                                                  // // console.log('Chapters Array is ='+chaptersArray);

                                                  var titlesArray=[];

                                                  // For Main Titles denoted by @ Sign
                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                    var stringAtIndex = chaptersArray[i];
                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    // // console.log('Akhzar is testing heading' + testString);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                      // Save String and Heading Both in Array
                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                      titlesArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }

                                                  }

                                                  // // console.log('Titles Array is ='+titlesArray);

                                                  var tempArray=[];
                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                    var mainHeading = titlesArray[i].heading;
                                                    var stringAtIndex = titlesArray[i].data;
                                                    // // console.log('Main Heading is == ' + mainHeading);
                                                    // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    // // console.log('Akhzar is testing heading' + testString);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                      // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                      tempArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }
                                                  }
                                                  // // console.log('Main Temp Temp Array is ='+tempArray);

                                                  // Extract Headings from Sub Content From $ Sign.

                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < tempArray.length; i++) {

                                                    var mainHeading = tempArray[i].mainheading;
                                                    var subHeading = tempArray[i].subheading;
                                                    var stringAtIndex = tempArray[i].data;

                                                    // // console.log('Main Main Heading is == ' + mainHeading);
                                                    // // console.log('Sub Sub Heading is == ' + subHeading);
                                                    // // console.log('Main Main Data is == ' + stringAtIndex);

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                    finalArray11.push(ObjectToSaveInArray);

                                                  }
                                                })




                                                var finalArray12=[];

                                                RNFS.readFileAssets(path12)
                                                    .then((contents) => {
                                                      var contentString = contents.toString();
                                                      // // console.log('Content Of Complete Book' + contentString);
                                                      var chaptersArray=[];
                                                      // For Chapters Titles denoted by & Sign
                                                      for (var i = 0; i < contentString.length; i++) {
                                                        var firstIndex=contentString.indexOf('&',i);
                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                        chaptersArray.push(tempString);
                                                        i=secondIndex;
                                                      }

                                                      // // console.log('Chapters Array is ='+chaptersArray);

                                                      var titlesArray=[];

                                                      // For Main Titles denoted by @ Sign
                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                        var stringAtIndex = chaptersArray[i];
                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        // // console.log('Akhzar is testing heading' + testString);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // Save String and Heading Both in Array
                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                          titlesArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }

                                                      }

                                                      // // console.log('Titles Array is ='+titlesArray);

                                                      var tempArray=[];
                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                        var mainHeading = titlesArray[i].heading;
                                                        var stringAtIndex = titlesArray[i].data;
                                                        // // console.log('Main Heading is == ' + mainHeading);
                                                        // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        // // console.log('Akhzar is testing heading' + testString);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                          tempArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }
                                                      }
                                                      // // console.log('Main Temp Temp Array is ='+tempArray);

                                                      // Extract Headings from Sub Content From $ Sign.

                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < tempArray.length; i++) {

                                                        var mainHeading = tempArray[i].mainheading;
                                                        var subHeading = tempArray[i].subheading;
                                                        var stringAtIndex = tempArray[i].data;

                                                        // // console.log('Main Main Heading is == ' + mainHeading);
                                                        // // console.log('Sub Sub Heading is == ' + subHeading);
                                                        // // console.log('Main Main Data is == ' + stringAtIndex);

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                        finalArray12.push(ObjectToSaveInArray);

                                                      }
                                                    })



                                                    var finalArray13=[];

                                                    RNFS.readFileAssets(path13)
                                                        .then((contents) => {
                                                          var contentString = contents.toString();
                                                          // // console.log('Content Of Complete Book' + contentString);
                                                          var chaptersArray=[];
                                                          // For Chapters Titles denoted by & Sign
                                                          for (var i = 0; i < contentString.length; i++) {
                                                            var firstIndex=contentString.indexOf('&',i);
                                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                            chaptersArray.push(tempString);
                                                            i=secondIndex;
                                                          }

                                                          // // console.log('Chapters Array is ='+chaptersArray);

                                                          var titlesArray=[];

                                                          // For Main Titles denoted by @ Sign
                                                          for (var i = 0; i < chaptersArray.length; i++) {
                                                            var stringAtIndex = chaptersArray[i];
                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            // // console.log('Akhzar is testing heading' + testString);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // Save String and Heading Both in Array
                                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                              titlesArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }

                                                          }

                                                          // // console.log('Titles Array is ='+titlesArray);

                                                          var tempArray=[];
                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < titlesArray.length; i++) {

                                                            var mainHeading = titlesArray[i].heading;
                                                            var stringAtIndex = titlesArray[i].data;
                                                            // // console.log('Main Heading is == ' + mainHeading);
                                                            // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            // // console.log('Akhzar is testing heading' + testString);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                              tempArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }
                                                          }
                                                          // // console.log('Main Temp Temp Array is ='+tempArray);

                                                          // Extract Headings from Sub Content From $ Sign.

                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < tempArray.length; i++) {

                                                            var mainHeading = tempArray[i].mainheading;
                                                            var subHeading = tempArray[i].subheading;
                                                            var stringAtIndex = tempArray[i].data;

                                                            // // console.log('Main Main Heading is == ' + mainHeading);
                                                            // // console.log('Sub Sub Heading is == ' + subHeading);
                                                            // // console.log('Main Main Data is == ' + stringAtIndex);

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                            finalArray13.push(ObjectToSaveInArray);

                                                          }
                                                        })




                                                        var finalArray14=[];

                                                        RNFS.readFileAssets(path14)
                                                            .then((contents) => {
                                                              var contentString = contents.toString();
                                                              // // console.log('Content Of Complete Book' + contentString);
                                                              var chaptersArray=[];
                                                              // For Chapters Titles denoted by & Sign
                                                              for (var i = 0; i < contentString.length; i++) {
                                                                var firstIndex=contentString.indexOf('&',i);
                                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                chaptersArray.push(tempString);
                                                                i=secondIndex;
                                                              }

                                                              // // console.log('Chapters Array is ='+chaptersArray);

                                                              var titlesArray=[];

                                                              // For Main Titles denoted by @ Sign
                                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                                var stringAtIndex = chaptersArray[i];
                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                // // console.log('Akhzar is testing heading' + testString);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // Save String and Heading Both in Array
                                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                  titlesArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }

                                                              }

                                                              // // console.log('Titles Array is ='+titlesArray);

                                                              var tempArray=[];
                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < titlesArray.length; i++) {

                                                                var mainHeading = titlesArray[i].heading;
                                                                var stringAtIndex = titlesArray[i].data;
                                                                // // console.log('Main Heading is == ' + mainHeading);
                                                                // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                // // console.log('Akhzar is testing heading' + testString);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                  tempArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }
                                                              }
                                                              // // console.log('Main Temp Temp Array is ='+tempArray);

                                                              // Extract Headings from Sub Content From $ Sign.

                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < tempArray.length; i++) {

                                                                var mainHeading = tempArray[i].mainheading;
                                                                var subHeading = tempArray[i].subheading;
                                                                var stringAtIndex = tempArray[i].data;

                                                                // // console.log('Main Main Heading is == ' + mainHeading);
                                                                // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                finalArray14.push(ObjectToSaveInArray);

                                                              }
                                                            })





                                                            var finalArray15=[];

                                                            RNFS.readFileAssets(path15)
                                                                .then((contents) => {
                                                                  var contentString = contents.toString();
                                                                  // // console.log('Content Of Complete Book' + contentString);
                                                                  var chaptersArray=[];
                                                                  // For Chapters Titles denoted by & Sign
                                                                  for (var i = 0; i < contentString.length; i++) {
                                                                    var firstIndex=contentString.indexOf('&',i);
                                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                    chaptersArray.push(tempString);
                                                                    i=secondIndex;
                                                                  }

                                                                  // // console.log('Chapters Array is ='+chaptersArray);

                                                                  var titlesArray=[];

                                                                  // For Main Titles denoted by @ Sign
                                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                                    var stringAtIndex = chaptersArray[i];
                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    // // console.log('Akhzar is testing heading' + testString);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // Save String and Heading Both in Array
                                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                      titlesArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }

                                                                  }

                                                                  // // console.log('Titles Array is ='+titlesArray);

                                                                  var tempArray=[];
                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                                    var mainHeading = titlesArray[i].heading;
                                                                    var stringAtIndex = titlesArray[i].data;
                                                                    // // console.log('Main Heading is == ' + mainHeading);
                                                                    // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    // // console.log('Akhzar is testing heading' + testString);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                      tempArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }
                                                                  }
                                                                  // // console.log('Main Temp Temp Array is ='+tempArray);

                                                                  // Extract Headings from Sub Content From $ Sign.

                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < tempArray.length; i++) {

                                                                    var mainHeading = tempArray[i].mainheading;
                                                                    var subHeading = tempArray[i].subheading;
                                                                    var stringAtIndex = tempArray[i].data;

                                                                    // // console.log('Main Main Heading is == ' + mainHeading);
                                                                    // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                    // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                    finalArray15.push(ObjectToSaveInArray);

                                                                  }
                                                                })





                                                                var finalArray16=[];

                                                                RNFS.readFileAssets(path16)
                                                                    .then((contents) => {
                                                                      var contentString = contents.toString();
                                                                      // // console.log('Content Of Complete Book' + contentString);
                                                                      var chaptersArray=[];
                                                                      // For Chapters Titles denoted by & Sign
                                                                      for (var i = 0; i < contentString.length; i++) {
                                                                        var firstIndex=contentString.indexOf('&',i);
                                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                        chaptersArray.push(tempString);
                                                                        i=secondIndex;
                                                                      }

                                                                      // // console.log('Chapters Array is ='+chaptersArray);

                                                                      var titlesArray=[];

                                                                      // For Main Titles denoted by @ Sign
                                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                                        var stringAtIndex = chaptersArray[i];
                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        // // console.log('Akhzar is testing heading' + testString);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // Save String and Heading Both in Array
                                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                          titlesArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }

                                                                      }

                                                                      // // console.log('Titles Array is ='+titlesArray);

                                                                      var tempArray=[];
                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                                        var mainHeading = titlesArray[i].heading;
                                                                        var stringAtIndex = titlesArray[i].data;
                                                                        // // console.log('Main Heading is == ' + mainHeading);
                                                                        // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        // // console.log('Akhzar is testing heading' + testString);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                          tempArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }
                                                                      }
                                                                      // // console.log('Main Temp Temp Array is ='+tempArray);

                                                                      // Extract Headings from Sub Content From $ Sign.

                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < tempArray.length; i++) {

                                                                        var mainHeading = tempArray[i].mainheading;
                                                                        var subHeading = tempArray[i].subheading;
                                                                        var stringAtIndex = tempArray[i].data;

                                                                        // // console.log('Main Main Heading is == ' + mainHeading);
                                                                        // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                        // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                        finalArray16.push(ObjectToSaveInArray);

                                                                      }

                                                                      this.setState({showProgress:false});
                                                                      AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));
                                                                      this.slectFunc();
                                                                    })



        var mainArray=[];

        var Object1ToSaveInMainArray = {title:'آرنڈ',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'اندرائین',data:finalArray2};
        var Object3ToSaveInMainArray = {title:'انگور',data:finalArray3};
        var Object4ToSaveInMainArray = {title:'آم',data:finalArray4};
        var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
        var Object6ToSaveInMainArray = {title:'بادام',data:finalArray6};
        var Object7ToSaveInMainArray = {title:'برگد',data:finalArray7};
        var Object8ToSaveInMainArray = {title:'دھتورہ',data:finalArray8};
        var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
        var Object10ToSaveInMainArray = {title:'دھنیہ',data:finalArray10};
        var Object11ToSaveInMainArray = {title:'دودھ',data:finalArray11};
        var Object12ToSaveInMainArray = {title:'گاجر',data:finalArray12};
        var Object13ToSaveInMainArray = {title:'گھی کوار',data:finalArray13};
        var Object14ToSaveInMainArray = {title:'گھی',data:finalArray14};
        var Object15ToSaveInMainArray = {title:'دھی',data:finalArray15};
        var Object16ToSaveInMainArray = {title:'گل سرک',data:finalArray16};

        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);
        mainArray.push(Object3ToSaveInMainArray);
        mainArray.push(Object4ToSaveInMainArray);
        mainArray.push(Object5ToSaveInMainArray);
        mainArray.push(Object6ToSaveInMainArray);
        mainArray.push(Object7ToSaveInMainArray);
        mainArray.push(Object8ToSaveInMainArray);
        mainArray.push(Object9ToSaveInMainArray);
        mainArray.push(Object10ToSaveInMainArray);
        mainArray.push(Object11ToSaveInMainArray);
        mainArray.push(Object12ToSaveInMainArray);
        mainArray.push(Object13ToSaveInMainArray);
        mainArray.push(Object14ToSaveInMainArray);
        mainArray.push(Object15ToSaveInMainArray);
        mainArray.push(Object16ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:mainArray
        })

        // For Permanent Storage Of Data

// readFileAssets
  }
}

actionButtonBooksList(){
      // // console.log("check dobara");
    var screenName='BooksListScreen';

    this.props.navigator.push({
      screen:screenName,
      // passProps:{finalArray},
      navigatorStyle:{
        navBarHidden:true,
      },
    })

}

actionButtonSearch(){

// this.searchExactWord();
var stringToSearch=this.state.txtSearch.trim();
// // // console.log('String to Search' + stringToSearch);
  stringToSearch=stringToSearch.toLowerCase();
if (stringToSearch.length <=0) {
  Alert.alert('Stop!','Search complete word');
  return;
}

var finalArray=[];

this.setState({showProgress:true})
for (var x = 0; x < this.state.bookArray.length; x++) {
var bookArray=this.state.bookArray[x].data;
var searchedArray=[];
var counter = 0;
var flag = 0;

// Testing Akhzar Nazir
for (var i = 0; i < bookArray.length; i++) {
  var mainHeading=bookArray[i].mainheading;
  var subHeading=bookArray[i].subheading;
  var subbestheading=bookArray[i].subbestheading;
  var tempString=bookArray[i].data;
  var tempPara=tempString.toLowerCase();

  var index = -1;

 if (!this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {

    index=mainHeading.indexOf(stringToSearch);
    if (index==-1) {
      index=subHeading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=subbestheading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=tempPara.indexOf(stringToSearch);
    }

  }

  else if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook3Selected && this.state.isBook4Selected)
  {

    index=mainHeading.indexOf(stringToSearch);
    if (index==-1) {
      index=subHeading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=subbestheading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=tempPara.indexOf(stringToSearch);
    }

  }

  else if (this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);

  }

  else  if (this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=subHeading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
  {
    index=subbestheading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook1Selected && this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=tempPara.indexOf(stringToSearch);
  }

  else  if (this.state.isBook1Selected && this.state.isBook3Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook1Selected && this.state.isBook4Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



  else  if (this.state.isBook2Selected && this.state.isBook1Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=tempPara.indexOf(stringToSearch);
  }

  else  if (this.state.isBook2Selected && this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook2Selected && this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook3Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



////// ///// /////

  else  if (this.state.isBook3Selected && this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook3Selected && this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook3Selected && this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook2Selected)
  {
    index=subHeading.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



  ////// ///// /////

    else  if (this.state.isBook4Selected && this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
    {
      index=mainHeading.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);

    }

    else  if (this.state.isBook4Selected && this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook3Selected)
    {

      index=tempPara.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);
    }

    else  if (this.state.isBook4Selected && this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook2Selected)
    {
      index=subHeading.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);
    }


    ////// ///// /////

      else  if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook3Selected && !this.state.isBook4Selected)
      {
        index=mainHeading.indexOf(stringToSearch);
        index=tempPara.indexOf(stringToSearch);
        index=subHeading.indexOf(stringToSearch);

      }

      else  if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook4Selected && !this.state.isBook3Selected)
      {
        index=mainHeading.indexOf(stringToSearch);
        index=tempPara.indexOf(stringToSearch);
        index=subbestheading.indexOf(stringToSearch);

      }

      else  if (this.state.isBook1Selected && this.state.isBook3Selected && this.state.isBook4Selected && !this.state.isBook2Selected)
      {

        index=mainHeading.indexOf(stringToSearch);
        index=subHeading.indexOf(stringToSearch);
        index=subbestheading.indexOf(stringToSearch);

      }


  if (index != -1) {
    var object={key:counter,data:bookArray[i]}
    searchedArray.push(object);
    counter++;
  }

}

var searchResult={'word':stringToSearch,'searchedArray':searchedArray,bookname:this.state.bookArray[x].title};

this.setState({showProgress:false})
if (searchedArray.length!=0) {
  flag++;
}

  finalArray.push(searchResult);

}

// // // console.log('Search Result Word is = ',finalArray[0]);

if (flag == 0){
  Alert.alert('Stop!','No result found');
  return;
}

this.setState({showProgress:false});
this.props.navigator.push({
  screen:'DisplayResultScreen',
  passProps:{finalArray},
  navigatorStyle:{
    navBarHidden:true,
  },
})

}

searchExactWord(){

  var searchWord=this.state.txtSearch.trim().toLowerCase();
  if (searchWord.length<=1) {
    Alert.alert('Stop!','Search complete word');
    return;
  }
  var bookArray=this.state.bookArray;
  var searchedArray=[];
  var counter=0;

  for (var i = 0; i < bookArray.length; i++) {
    var paragraph=bookArray[i];
    var indexOfNewLine=paragraph.indexOf('\r');
    var headingData=paragraph.slice(0,indexOfNewLine);
    // var subdata=paragraph.slice(indexOfNewLine,paragraph.length);
    var subdata=paragraph;
    subdata.replace('\r','');
    subdata.replace('\n','');
    subdata=subdata.toLowerCase();
    var index=0
    for (var j = 0; j < subdata.length; j++) {
        index=subdata.indexOf(searchWord,index);
        if (index==-1) {
          break;
        }
            if (index==0) {
                  var spaceAfterIndex=subdata.indexOf(' ',index+1);
                  var word=subdata.slice(index,spaceAfterIndex)
                  if (word==searchWord) {
                    var object={key:counter,data:paragraph.trim()}
                    searchedArray.push(object);
                    counter++;
                    break;
                  }
                  index+=1;
                }
                else{
                  if (subdata[index-1]==' ') {
                    var spaceAfterIndex=subdata.indexOf(' ',index+1);
                    var word=subdata.slice(index,spaceAfterIndex)
                            if (word==searchWord) {
                              var object={key:counter,data:paragraph.trim()}
                              searchedArray.push(object);
                              counter++;
                              break;

                            }
                      }
                            index+=1;
                  }
          }
}

    var searchResult={'word':searchWord,'searchedArray':searchedArray};

    if (searchedArray.length==0) {
      Alert.alert('Stop!','No result found');
      return;
    }

    this.props.navigator.push({
      screen:'DisplayResultScreen',
      passProps:{searchResult},
      navigatorStyle:{
        navBarHidden:true,
      },
    })
}

actionCheckBox1(){
  this.setState({
                isBook1Selected:!this.state.isBook1Selected,
                  });
}

actionCheckBox2(){
  this.setState({isBook2Selected:!this.state.isBook2Selected,
                    });
}

actionCheckBox3(){
  this.setState({isBook3Selected:!this.state.isBook3Selected,
                    });
}

actionCheckBox4(){
  this.setState({
                isBook4Selected:!this.state.isBook4Selected,
                  });
}

// _renderItem ({item, index}) {
//         var image=item.fileName
//     return (
//         <View style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}>
//             <Image source={image} style={{width:itemWidth,height:itemWidth,borderRadius:15}}/>
//         </View>
//     );
//   }

wordSelected(index){

  var letter=this.state.urduAlphabet[index].key;
  var finalArray=[];

  for (var x = 0; x < this.state.bookArray.length; x++) {
  var bookArray=this.state.bookArray[x].data;
  var searchedArray=[];
  var counter = 0;
  var flag = 0;

  for (var i = 0; i < bookArray.length; i++) {
    var mainHeading=bookArray[i].mainheading;
    var subHeading=bookArray[i].subheading;
    var subbestheading=bookArray[i].subbestheading.trim();
    var stringArray=subbestheading.split(")");
    var newString=stringArray[0];
    if (stringArray.length>0) {
      newString=stringArray[1];
    }

    if (newString == null) {
      continue;
    }

    newString=newString.trim();
    if (newString[0]==letter) {
      var ObjectToSaveInArray = {title:this.state.bookArray[x].title,data:bookArray[i]};
      finalArray.push(ObjectToSaveInArray)
    }
  }
}

this.state.urduAlphabet[index].data = 2;

this.setState({
  searchResultArray:finalArray,
})
}

 slectFunc(){

   for (var u = 0; u < this.state.urduAlphabet.length; u++) {
   var letter=this.state.urduAlphabet[u].key;
   var finalArray=[];
   for (var x = 0; x < this.state.bookArray.length; x++) {
   var bookArray=this.state.bookArray[x].data;
   var searchedArray=[];
   var counter = 0;
   var flag = 0;

   for (var i = 0; i < bookArray.length; i++) {
     // // // console.log('Book Array is = ',bookArray[i].data);
     var mainHeading=bookArray[i].mainheading;
     // // // console.log('Main Heading is = ',mainHeading);
     var subHeading=bookArray[i].subheading;
     // // // console.log('Sub Heading is = ',subHeading);
     // // // console.log('Subbest Heading before trim is = ',bookArray[i].subbestheading);
     var subbestheading=bookArray[i].subbestheading.trim();
     // // // console.log('Subbest Heading After trim is = ',subbestheading);
     // // // console.log('Main Data is = ',bookArray[i].data);
     var stringArray=subbestheading.split(")");
     // // // console.log('Array Length is = ',stringArray.length);
     // // // console.log('Array is = ',stringArray[0]);
     // // // console.log('Array is = ',stringArray[1]);
     var newString=stringArray[0];
     if (stringArray.length>0) {
       newString = stringArray[1];
       // // // console.log('If Greater Than Zero is = ', newString);
    }

    // What these lines are doing
     // var tempString=bookArray[i].data;
     // var tempPara=tempString.toLowerCase();
     if (newString == null) {
       continue;
     }
     newString=newString.trim();
     if (newString[0]==letter) {
       // // // console.log('New String Is = ',newString);
       // Need to add one extra key to control repitition
       var ObjectToSaveInArray = {title:this.state.bookArray[x].title,data:bookArray[i],key:newString};
       finalArray.push(ObjectToSaveInArray)
       // finalArray.push(bookArray[i])
       this.state.urduAlphabet[u].data = 1;
     }
   }
 }

 if (u == 0) {
   // 2 value is for selected item
   this.state.urduAlphabet[0].data = 2;
   this.setState({
     searchResultArray:finalArray,
   })
 }
}
}

 _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

callSomeFunction(index){
  var finalArrayToCheckRepitition = [];
  for (var i = 0; i < this.state.searchResultArray.length; i++) {
    if (this.state.searchResultArray[index].key == this.state.searchResultArray[i].key) {
      finalArrayToCheckRepitition.push(this.state.searchResultArray[i]);
    }
  }

  if (finalArrayToCheckRepitition.length > 1) {
    console.log('Compare Array Multiple',this.state.searchResultArray[0]);
    this.props.navigator.push({
      screen:'RelatedWords',
      title:'Related Items',
      passProps:{finalArrayToCheckRepitition},
      navigatorStyle:{
        navBarHidden:true,
      },
    })
  }else{
    var selectedRow = index;
    var sectionArray = [];
    sectionArray.push(this.state.searchResultArray[index]);
    console.log('Compare Array 1',sectionArray);
    // var selectedItem = this.state.searchResultArray[index].data;
    // var selectedTitle = this.state.searchResultArray[index].title;
    this.props.navigator.push({
      screen:'ReadingScreen',
      passProps:{sectionArray,selectedRow},
      navigatorStyle:{
        navBarHidden:true,
      },
    })
  }
}

  render(){
    return(
      <View style={styles.outerContainer}>
      <Image  source={backgroundImage} style={{width:window.width,height:window.height,backgroundColor:'gray'}}>
      <Header navigator={this.props.navigator} showMenu={true} title='طبی  کتب'/>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} enableOnAndroid={true}>
      <View style={styles.logoView}>
      <Image source={dashboard_logo} style={styles.logoStyle}/>
      </View>
      <View style={styles.subView}>
      <TextInput style={[styles.inputStyle,{textAlign:this.state.isUrduSelected?'right':'left'}]}

      onChangeText={(txtSearch) => this.setState({txtSearch})}
      placeholder={this.state.placeholderText}
      underlineColorAndroid='transparent'
       />

       {
      /*
       }<Text style={{textAlign:'right',marginRight:15,marginTop:15}}>کس کتاب سے تلاش کرنا چاہتے ہیں؟</Text>
      */
        }

      {
        /*
       <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginRight:40,marginLeft:40,backgroundColor:'transparent'}}>
       <View style={{flexDirection:'row'}}>

               <TouchableOpacity onPress={()=>this.actionCheckBox2()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>

               <View style={{flexDirection:'row',}}>
               <Text style={{alignSelf:'center',color:'white'}}>Title + Text</Text>
               <Image source={this.state.isBook2Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
               </View>

               </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.actionCheckBox1()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                <View style={{flexDirection:'row'}}>
                <Text style={{alignSelf:'center',color:'white'}}>Title</Text>
                <Image source={this.state.isBook1Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>

                </View>

                </TouchableOpacity>

      </View>

          <View style={{flexDirection:'row'}}>

                    <TouchableOpacity onPress={()=>this.actionCheckBox4()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{alignSelf:'center',color:'white'}}>علاج</Text>
                    <Image source={this.state.isBook4Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                    </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.actionCheckBox3()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:12,color:'white'}}>نسخہ جات یا بیماریاں</Text>
                    <Image source={this.state.isBook3Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                    </View>

                    </TouchableOpacity>
          </View>

     </View>
     */
   }

       <View style={styles.buttonView}>
       <TouchableOpacity onPress={()=>this.actionButtonSearch()} style={styles.buttonStyleOne}>
       <Text style={styles.textStyle}>{this.state.buttonSearchTitle}</Text>
       </TouchableOpacity>
       </View>

       {
      /*
       <View style={{flex:1,backgroundColor:'transparent',justifyContent:'flex-end'}}>
       <View style={{alignItems:'flex-start',marginBottom:isiPhone?10:30}}>
       <Carousel
          style={{}}
           ref={(c) => { this._carousel = c; }}
           data={this.state.bannersArray}
           renderItem={this._renderItem}
           sliderWidth={sliderWidth}
           itemWidth={itemWidth}
           itemHeight={itemWidth}
           loop={true}
           autoplay={true}
         />
         </View>
         </View>
         */
       }

{
/*
         <View style={styles.buttonView}>
         <TouchableOpacity onPress={()=>this.actionButtonBooksList()} style={styles.buttonStyleTwo}>
         <Text style={styles.textStyle}>{this.state.booksListTitle}</Text>
         </TouchableOpacity>
         </View>
*/
}

         <View style={{marginTop:25,}}>
         <FlatList
         data={this.state.urduAlphabet}
         keyExtractor={(item, index) => index}
         horizontal={true}
         inverted={true}
         renderItem={({item,index}) =>
          <TouchableOpacity
           style={{ height:60,
            width:60,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'white',backgroundColor:(this.state.urduAlphabet[index].data==0)?'transparent':(this.state.urduAlphabet[index].data==1)?'#38803B':'grey',}}
          onPress={()=> this.wordSelected(index)}
         >
          <Text style={styles.textStyleNP} > {item.key}  </Text>
          </TouchableOpacity>
        }
          />
         </View>

        <View style={{marginTop:20}}>
          <FlatList
          data={this.state.searchResultArray}
          keyExtractor={(item, index) => index}
          renderItem={({item,index}) =>
          <TouchableOpacity onPress={()=>this.callSomeFunction(index)} style={{
            height:50,
          }}>
          <View style={{
            marginLeft:20,
            marginRight:20,
            marginTop:10,
            borderColor:'white',
            borderWidth:1,
            flex:1,
            justifyContent:'center',
          }}>
          <Text numberOfLines={1} style={{
            backgroundColor:'transparent',
            color:'white',
            textAlign:'right',
            marginRight:20,
            marginLeft:20,
            fontSize:20,
            fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
          }}>{item.data.subbestheading}</Text>
          </View>
          </TouchableOpacity>
        }
          />
        </View>

      <View style={{marginTop:30}}/>
      </View>
      <Loader showProgress={this.state.showProgress}/>
      </KeyboardAwareScrollView>
      </Image>
      </View>
    );}
}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'#F5DDC5',
},
buttonPressed:{
            height:60,
            width:60,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'white',
            backgroundColor:'blue',
},
buttonNotpressed:{
            height:60,
            width:60,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'white',
          // backgroundColor:'blue',
},
subView:{
  flex:1,
  // backgroundColor:'gray',
  justifyContent:'flex-start',
  marginTop:25,
  // alignItems:'center',
},
inputStyle:{
  // width:140,
  marginRight:40,
  marginLeft:40,
  height:50,
  borderWidth:1,
  borderRadius:10,
  paddingLeft:15,
  paddingRight:15,
  borderColor:'#E0E3E7',
  color:'#AEAEAE',
  // fontFamily:'Adobe Arabic',
  fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
  fontSize:22,
  backgroundColor:'white',
  // backgroundColor:'green',
},
buttonView:{
  marginTop:20,
  alignItems:'center',
  justifyContent:'center',
},
buttonStyleOne:{
height:50,
width:140,
borderRadius:25,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#38803B',
marginTop:15,
},

buttonStyleTwo:{
height:50,
width:340,
borderRadius:25,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#38803B',
marginTop:15,
},

textStyle:{
  color:'white',
  fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
  fontSize:25,
  // fontWeight:'bold',
},
textStyleP:{
  color:'white',
  fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
  fontSize:25,
  backgroundColor:'blue',
  // fontWeight:'bold',
},
textStyleNP:{
  color:'white',
  fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
  fontSize:25,
  backgroundColor:'transparent',
  // fontWeight:'bold',
},
logoStyle:{
  height:150,
  width:135,
},
logoView:{
  alignItems:'center',
  justifyContent:'center',
  marginTop:15,
  // backgroundColor:'gray',
},
tabView:{
  flexDirection:'row',
  marginTop:20,
  alignItems:'center',
  justifyContent:'center',
  // marginLeft:75,
  // marginRight:75,
},
tabButtonStyle:{
  // flex:1,
  height:45,
  // marginRight:20,
  marginLeft:20,
  alignItems:'center',
  justifyContent:'center',

},
buttonText:{
  color:'blue',
  fontSize:15,
  fontWeight:'bold',
},
progressbarStyle:{
  position:'absolute',
  left:'40%',
  top:'50%',
},

  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    height:30,
    width:30,
    backgroundColor:'green',

  },

})

module.exports=HomeScreen;
