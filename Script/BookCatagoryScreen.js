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
  AsyncStorage,
  Platform,
} from 'react-native';

var Header=require('./Header')
var Loader=require('./Loader')
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
const buttonWidth=DEVICE_WIDTH/2-50;

var RNFS = require('react-native-fs');
var Loader=require('./Loader')
var Constants=require('./Constants')

class BookCatagoryScreen extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
    this.state={
      showProgress:true,
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

    }
      }).done();

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

      path1=RNFS.MainBundlePath+'/Arnad.txt';
      path2=RNFS.MainBundlePath+'/Andrain.txt';
      path3=RNFS.MainBundlePath+'/Angoor.txt';
      path4=RNFS.MainBundlePath+'/Aaam.txt';
      path5=RNFS.MainBundlePath+'/خواص آک.txt';
      path6=RNFS.MainBundlePath+'/Badam.txt';
      path7=RNFS.MainBundlePath+'/Bargad.txt';
      path8=RNFS.MainBundlePath+'/Dhatoora.txt';
      path9=RNFS.MainBundlePath+'/خواص شہد.txt';
      path10=RNFS.MainBundlePath+'/Dhania.txt';
      path11=RNFS.MainBundlePath+'/Dhoodh.txt';
      path12=RNFS.MainBundlePath+'/Gajar.txt';
      path13=RNFS.MainBundlePath+'/Ghee kvar.txt';
      path14=RNFS.MainBundlePath+'/Ghee.txt';
      path15=RNFS.MainBundlePath+'/Dahee.txt';
      path16=RNFS.MainBundlePath+'/Gul Surk.txt';

      // BookNameArray:[ 'Arnad','Andrain','Angoor','Aaam','خواص آک','Badam','Bargad','Dhatoora','خواص شہد','Dhania','Dhoodh','Gajar','Ghee kvar','Ghee','Dahee','Gul Surk'],

      var finalArray1=[];
      RNFS.readFile(path1)
          .then((contents) => {
            var contentString = contents.toString();
            console.log('Content Of Complete Book' + contentString);
            var chaptersArray=[];
            // For Chapters Titles denoted by & Sign
            for (var i = 0; i < contentString.length; i++) {
              var firstIndex=contentString.indexOf('&',i);
              var secondIndex=contentString.indexOf('&',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
              chaptersArray.push(tempString);
              i=secondIndex;
            }

            console.log('Chapters Array is ='+chaptersArray);

            var titlesArray=[];

            // For Main Titles denoted by @ Sign
            for (var i = 0; i < chaptersArray.length; i++) {
              var stringAtIndex = chaptersArray[i];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              console.log('Akhzar is testing heading' + testString);

              for (var x = 0; x < stringAtIndex.length; x++) {

                var firstIndex=stringAtIndex.indexOf('@',x);
                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                titlesArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }
            }

            console.log('Titles Array is ='+titlesArray);

            var tempArray=[];
            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < titlesArray.length; i++) {

              var mainHeading = titlesArray[i].heading;
              var stringAtIndex = titlesArray[i].data;
              console.log('Main Heading is == ' + mainHeading);
              console.log('stringAtIndex is == ' + stringAtIndex);
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              console.log('Mobeen Gainda is testing heading' + testString);
              for (var x = 0; x < stringAtIndex.length; x++) {
                var firstIndex=stringAtIndex.indexOf('$',x);
                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }
                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                tempArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }
            }

            console.log('Main Temp Temp Array is ='+tempArray);
            // Extract Headings from Sub Content From $ Sign.
            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < tempArray.length; i++) {

              var mainHeading = tempArray[i].mainheading;
              var subHeading = tempArray[i].subheading;
              var stringAtIndex = tempArray[i].data;

              console.log('Main Main Heading is == ' + mainHeading);
              console.log('Sub Sub Heading is == ' + subHeading);
              console.log('Main Main Data is == ' + stringAtIndex);

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

                                                                      })




          // BookNameArray:[ 'Arnad','Andrain','Angoor','Aaam','خواص آک','Badam','Bargad','Dhatoora','خواص شہد','Dhania','Dhoodh','Gajar','Ghee kvar','Ghee','Dahee','Gul Surk'],

          var mainArray=[];

          var Object1ToSaveInMainArray = {title:'Arnad',data:finalArray1};
          var Object2ToSaveInMainArray = {title:'Andrain',data:finalArray2};
          var Object3ToSaveInMainArray = {title:'Angoor',data:finalArray3};
          var Object4ToSaveInMainArray = {title:'Aaam',data:finalArray4};
          var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
          var Object6ToSaveInMainArray = {title:'Badam',data:finalArray6};
          var Object7ToSaveInMainArray = {title:'Bargad',data:finalArray7};
          var Object8ToSaveInMainArray = {title:'Dhatoora',data:finalArray8};
          var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
          var Object10ToSaveInMainArray = {title:'Dhania',data:finalArray10};
          var Object11ToSaveInMainArray = {title:'Dhoodh',data:finalArray11};
          var Object12ToSaveInMainArray = {title:'Gajar',data:finalArray12};
          var Object13ToSaveInMainArray = {title:'Ghee kvar',data:finalArray13};
          var Object14ToSaveInMainArray = {title:'Ghee',data:finalArray14};
          var Object15ToSaveInMainArray = {title:'Dahee',data:finalArray15};
          var Object16ToSaveInMainArray = {title:'Gul Surk',data:finalArray16};

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

          // AsyncStorage.setItem('booksData', JSON.stringify(mainArray));

    }else{

      // For Android Path is different  خواص آک

      var  path1='Arnad.txt';
      var  path2='Andrain.txt';
      var  path3='Angoor.txt';
      var  path4='Aaam.txt';
      var  path5='Khawas_aak.txt';
      var  path6='Badam.txt';
      var  path7='Bargad.txt';
      var  path8='Dhatoora.txt';
      var  path9='خواص شہد.txt';
      var  path10='Dhania.txt';
      var  path11='Dhoodh.txt';
      var  path12='Gajar.txt';
      var  path13='Ghee kvar.txt';
      var  path14='Ghee.txt';
      var  path15='Dahee.txt';
      var  path16='Gul Surk.txt';

      // Alert.alert('title')
      RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          console.log('GOT RESULT', result);
        // stat the first file
          // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        });
        console.log('End of File results');
      // BookNameArray:[ 'Arnad','Andrain','Angoor','Aaam','خواص آک','Badam','Bargad','Dhatoora','خواص شہد','Dhania','Dhoodh','Gajar','Ghee kvar','Ghee','Dahee','Gul Surk'],

      var finalArray1=[];
      RNFS.readFileAssets(path1)
          .then((contents) => {
            var contentString = contents.toString();
            console.log('Content Of Complete Book' + contentString);
            var chaptersArray=[];
            // For Chapters Titles denoted by & Sign
            for (var i = 0; i < contentString.length; i++) {
              var firstIndex=contentString.indexOf('&',i);
              var secondIndex=contentString.indexOf('&',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
              chaptersArray.push(tempString);
              i=secondIndex;
            }

            console.log('Chapters Array is ='+chaptersArray);

            var titlesArray=[];

            // For Main Titles denoted by @ Sign
            for (var i = 0; i < chaptersArray.length; i++) {
              var stringAtIndex = chaptersArray[i];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              console.log('Akhzar is testing heading' + testString);

              for (var x = 0; x < stringAtIndex.length; x++) {

                var firstIndex=stringAtIndex.indexOf('@',x);
                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                titlesArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }

            }

            console.log('Titles Array is ='+titlesArray);

            var tempArray=[];
            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < titlesArray.length; i++) {

              var mainHeading = titlesArray[i].heading;
              var stringAtIndex = titlesArray[i].data;
              console.log('Main Heading is == ' + mainHeading);
              console.log('stringAtIndex is == ' + stringAtIndex);

              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              console.log('Akhzar is testing heading' + testString);

              for (var x = 0; x < stringAtIndex.length; x++) {

                var firstIndex=stringAtIndex.indexOf('$',x);
                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                tempArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }
            }
            console.log('Main Temp Temp Array is ='+tempArray);

            // Extract Headings from Sub Content From $ Sign.

            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < tempArray.length; i++) {

              var mainHeading = tempArray[i].mainheading;
              var subHeading = tempArray[i].subheading;
              var stringAtIndex = tempArray[i].data;

              console.log('Main Main Heading is == ' + mainHeading);
              console.log('Sub Sub Heading is == ' + subHeading);
              console.log('Main Main Data is == ' + stringAtIndex);

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
                console.log('Content Of Complete Book' + contentString);
                var chaptersArray=[];
                // For Chapters Titles denoted by & Sign
                for (var i = 0; i < contentString.length; i++) {
                  var firstIndex=contentString.indexOf('&',i);
                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                  chaptersArray.push(tempString);
                  i=secondIndex;
                }

                console.log('Chapters Array is ='+chaptersArray);

                var titlesArray=[];

                // For Main Titles denoted by @ Sign
                for (var i = 0; i < chaptersArray.length; i++) {
                  var stringAtIndex = chaptersArray[i];
                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                  var testString=stringAtIndex.slice(0,headingEndIndex);
                  console.log('Akhzar is testing heading' + testString);

                  for (var x = 0; x < stringAtIndex.length; x++) {

                    var firstIndex=stringAtIndex.indexOf('@',x);
                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                    // Save String and Heading Both in Array
                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                    titlesArray.push(ObjectToSaveInArray);
                    x=secondIndex;

                  }

                }

                console.log('Titles Array is ='+titlesArray);

                var tempArray=[];
                // For Nuskha Jaat denoted by $ Sign
                for (var i = 0; i < titlesArray.length; i++) {

                  var mainHeading = titlesArray[i].heading;
                  var stringAtIndex = titlesArray[i].data;
                  console.log('Main Heading is == ' + mainHeading);
                  console.log('stringAtIndex is == ' + stringAtIndex);

                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                  var testString=stringAtIndex.slice(0,headingEndIndex);
                  console.log('Akhzar is testing heading' + testString);

                  for (var x = 0; x < stringAtIndex.length; x++) {

                    var firstIndex=stringAtIndex.indexOf('$',x);
                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                    console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                    tempArray.push(ObjectToSaveInArray);
                    x=secondIndex;

                  }
                }
                console.log('Main Temp Temp Array is ='+tempArray);

                // Extract Headings from Sub Content From $ Sign.

                // For Nuskha Jaat denoted by $ Sign
                for (var i = 0; i < tempArray.length; i++) {

                  var mainHeading = tempArray[i].mainheading;
                  var subHeading = tempArray[i].subheading;
                  var stringAtIndex = tempArray[i].data;

                  console.log('Main Main Heading is == ' + mainHeading);
                  console.log('Sub Sub Heading is == ' + subHeading);
                  console.log('Main Main Data is == ' + stringAtIndex);

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
                    console.log('Content Of Complete Book' + contentString);
                    var chaptersArray=[];
                    // For Chapters Titles denoted by & Sign
                    for (var i = 0; i < contentString.length; i++) {
                      var firstIndex=contentString.indexOf('&',i);
                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                      chaptersArray.push(tempString);
                      i=secondIndex;
                    }

                    console.log('Chapters Array is ='+chaptersArray);

                    var titlesArray=[];

                    // For Main Titles denoted by @ Sign
                    for (var i = 0; i < chaptersArray.length; i++) {
                      var stringAtIndex = chaptersArray[i];
                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                      var testString=stringAtIndex.slice(0,headingEndIndex);
                      console.log('Akhzar is testing heading' + testString);

                      for (var x = 0; x < stringAtIndex.length; x++) {

                        var firstIndex=stringAtIndex.indexOf('@',x);
                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                        // Save String and Heading Both in Array
                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                        titlesArray.push(ObjectToSaveInArray);
                        x=secondIndex;

                      }

                    }

                    console.log('Titles Array is ='+titlesArray);

                    var tempArray=[];
                    // For Nuskha Jaat denoted by $ Sign
                    for (var i = 0; i < titlesArray.length; i++) {

                      var mainHeading = titlesArray[i].heading;
                      var stringAtIndex = titlesArray[i].data;
                      console.log('Main Heading is == ' + mainHeading);
                      console.log('stringAtIndex is == ' + stringAtIndex);

                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                      var testString=stringAtIndex.slice(0,headingEndIndex);
                      console.log('Akhzar is testing heading' + testString);

                      for (var x = 0; x < stringAtIndex.length; x++) {

                        var firstIndex=stringAtIndex.indexOf('$',x);
                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                        console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                        tempArray.push(ObjectToSaveInArray);
                        x=secondIndex;

                      }
                    }
                    console.log('Main Temp Temp Array is ='+tempArray);

                    // Extract Headings from Sub Content From $ Sign.

                    // For Nuskha Jaat denoted by $ Sign
                    for (var i = 0; i < tempArray.length; i++) {

                      var mainHeading = tempArray[i].mainheading;
                      var subHeading = tempArray[i].subheading;
                      var stringAtIndex = tempArray[i].data;

                      console.log('Main Main Heading is == ' + mainHeading);
                      console.log('Sub Sub Heading is == ' + subHeading);
                      console.log('Main Main Data is == ' + stringAtIndex);

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
                        console.log('Content Of Complete Book' + contentString);
                        var chaptersArray=[];
                        // For Chapters Titles denoted by & Sign
                        for (var i = 0; i < contentString.length; i++) {
                          var firstIndex=contentString.indexOf('&',i);
                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                          chaptersArray.push(tempString);
                          i=secondIndex;
                        }

                        console.log('Chapters Array is ='+chaptersArray);

                        var titlesArray=[];

                        // For Main Titles denoted by @ Sign
                        for (var i = 0; i < chaptersArray.length; i++) {
                          var stringAtIndex = chaptersArray[i];
                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                          var testString=stringAtIndex.slice(0,headingEndIndex);
                          console.log('Akhzar is testing heading' + testString);

                          for (var x = 0; x < stringAtIndex.length; x++) {

                            var firstIndex=stringAtIndex.indexOf('@',x);
                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                            // Save String and Heading Both in Array
                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                            titlesArray.push(ObjectToSaveInArray);
                            x=secondIndex;

                          }

                        }

                        console.log('Titles Array is ='+titlesArray);

                        var tempArray=[];
                        // For Nuskha Jaat denoted by $ Sign
                        for (var i = 0; i < titlesArray.length; i++) {

                          var mainHeading = titlesArray[i].heading;
                          var stringAtIndex = titlesArray[i].data;
                          console.log('Main Heading is == ' + mainHeading);
                          console.log('stringAtIndex is == ' + stringAtIndex);

                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                          var testString=stringAtIndex.slice(0,headingEndIndex);
                          console.log('Akhzar is testing heading' + testString);

                          for (var x = 0; x < stringAtIndex.length; x++) {

                            var firstIndex=stringAtIndex.indexOf('$',x);
                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                            console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                            tempArray.push(ObjectToSaveInArray);
                            x=secondIndex;

                          }
                        }
                        console.log('Main Temp Temp Array is ='+tempArray);

                        // Extract Headings from Sub Content From $ Sign.

                        // For Nuskha Jaat denoted by $ Sign
                        for (var i = 0; i < tempArray.length; i++) {

                          var mainHeading = tempArray[i].mainheading;
                          var subHeading = tempArray[i].subheading;
                          var stringAtIndex = tempArray[i].data;

                          console.log('Main Main Heading is == ' + mainHeading);
                          console.log('Sub Sub Heading is == ' + subHeading);
                          console.log('Main Main Data is == ' + stringAtIndex);

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
                            console.log('Content Of Complete Book' + contentString);
                            var chaptersArray=[];
                            // For Chapters Titles denoted by & Sign
                            for (var i = 0; i < contentString.length; i++) {
                              var firstIndex=contentString.indexOf('&',i);
                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                              chaptersArray.push(tempString);
                              i=secondIndex;
                            }

                            console.log('Chapters Array is ='+chaptersArray);

                            var titlesArray=[];

                            // For Main Titles denoted by @ Sign
                            for (var i = 0; i < chaptersArray.length; i++) {
                              var stringAtIndex = chaptersArray[i];
                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                              var testString=stringAtIndex.slice(0,headingEndIndex);
                              console.log('Akhzar is testing heading' + testString);

                              for (var x = 0; x < stringAtIndex.length; x++) {

                                var firstIndex=stringAtIndex.indexOf('@',x);
                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                // Save String and Heading Both in Array
                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                titlesArray.push(ObjectToSaveInArray);
                                x=secondIndex;

                              }

                            }

                            console.log('Titles Array is ='+titlesArray);

                            var tempArray=[];
                            // For Nuskha Jaat denoted by $ Sign
                            for (var i = 0; i < titlesArray.length; i++) {

                              var mainHeading = titlesArray[i].heading;
                              var stringAtIndex = titlesArray[i].data;
                              console.log('Main Heading is == ' + mainHeading);
                              console.log('stringAtIndex is == ' + stringAtIndex);

                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                              var testString=stringAtIndex.slice(0,headingEndIndex);
                              console.log('Akhzar is testing heading' + testString);

                              for (var x = 0; x < stringAtIndex.length; x++) {

                                var firstIndex=stringAtIndex.indexOf('$',x);
                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                tempArray.push(ObjectToSaveInArray);
                                x=secondIndex;

                              }
                            }
                            console.log('Main Temp Temp Array is ='+tempArray);

                            // Extract Headings from Sub Content From $ Sign.

                            // For Nuskha Jaat denoted by $ Sign
                            for (var i = 0; i < tempArray.length; i++) {

                              var mainHeading = tempArray[i].mainheading;
                              var subHeading = tempArray[i].subheading;
                              var stringAtIndex = tempArray[i].data;

                              console.log('Main Main Heading is == ' + mainHeading);
                              console.log('Sub Sub Heading is == ' + subHeading);
                              console.log('Main Main Data is == ' + stringAtIndex);

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
                                console.log('Content Of Complete Book' + contentString);
                                var chaptersArray=[];
                                // For Chapters Titles denoted by & Sign
                                for (var i = 0; i < contentString.length; i++) {
                                  var firstIndex=contentString.indexOf('&',i);
                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                  chaptersArray.push(tempString);
                                  i=secondIndex;
                                }

                                console.log('Chapters Array is ='+chaptersArray);

                                var titlesArray=[];

                                // For Main Titles denoted by @ Sign
                                for (var i = 0; i < chaptersArray.length; i++) {
                                  var stringAtIndex = chaptersArray[i];
                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                  console.log('Akhzar is testing heading' + testString);

                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                    // Save String and Heading Both in Array
                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                    titlesArray.push(ObjectToSaveInArray);
                                    x=secondIndex;

                                  }

                                }

                                console.log('Titles Array is ='+titlesArray);

                                var tempArray=[];
                                // For Nuskha Jaat denoted by $ Sign
                                for (var i = 0; i < titlesArray.length; i++) {

                                  var mainHeading = titlesArray[i].heading;
                                  var stringAtIndex = titlesArray[i].data;
                                  console.log('Main Heading is == ' + mainHeading);
                                  console.log('stringAtIndex is == ' + stringAtIndex);

                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                  console.log('Akhzar is testing heading' + testString);

                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                    console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                    tempArray.push(ObjectToSaveInArray);
                                    x=secondIndex;

                                  }
                                }
                                console.log('Main Temp Temp Array is ='+tempArray);

                                // Extract Headings from Sub Content From $ Sign.

                                // For Nuskha Jaat denoted by $ Sign
                                for (var i = 0; i < tempArray.length; i++) {

                                  var mainHeading = tempArray[i].mainheading;
                                  var subHeading = tempArray[i].subheading;
                                  var stringAtIndex = tempArray[i].data;

                                  console.log('Main Main Heading is == ' + mainHeading);
                                  console.log('Sub Sub Heading is == ' + subHeading);
                                  console.log('Main Main Data is == ' + stringAtIndex);

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
                                    console.log('Content Of Complete Book' + contentString);
                                    var chaptersArray=[];
                                    // For Chapters Titles denoted by & Sign
                                    for (var i = 0; i < contentString.length; i++) {
                                      var firstIndex=contentString.indexOf('&',i);
                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                      chaptersArray.push(tempString);
                                      i=secondIndex;
                                    }

                                    console.log('Chapters Array is ='+chaptersArray);

                                    var titlesArray=[];

                                    // For Main Titles denoted by @ Sign
                                    for (var i = 0; i < chaptersArray.length; i++) {
                                      var stringAtIndex = chaptersArray[i];
                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                      console.log('Akhzar is testing heading' + testString);

                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                        // Save String and Heading Both in Array
                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                        titlesArray.push(ObjectToSaveInArray);
                                        x=secondIndex;

                                      }

                                    }

                                    console.log('Titles Array is ='+titlesArray);

                                    var tempArray=[];
                                    // For Nuskha Jaat denoted by $ Sign
                                    for (var i = 0; i < titlesArray.length; i++) {

                                      var mainHeading = titlesArray[i].heading;
                                      var stringAtIndex = titlesArray[i].data;
                                      console.log('Main Heading is == ' + mainHeading);
                                      console.log('stringAtIndex is == ' + stringAtIndex);

                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                      console.log('Akhzar is testing heading' + testString);

                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                        console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                        tempArray.push(ObjectToSaveInArray);
                                        x=secondIndex;

                                      }
                                    }
                                    console.log('Main Temp Temp Array is ='+tempArray);

                                    // Extract Headings from Sub Content From $ Sign.

                                    // For Nuskha Jaat denoted by $ Sign
                                    for (var i = 0; i < tempArray.length; i++) {

                                      var mainHeading = tempArray[i].mainheading;
                                      var subHeading = tempArray[i].subheading;
                                      var stringAtIndex = tempArray[i].data;

                                      console.log('Main Main Heading is == ' + mainHeading);
                                      console.log('Sub Sub Heading is == ' + subHeading);
                                      console.log('Main Main Data is == ' + stringAtIndex);

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
                                        console.log('Content Of Complete Book' + contentString);
                                        var chaptersArray=[];
                                        // For Chapters Titles denoted by & Sign
                                        for (var i = 0; i < contentString.length; i++) {
                                          var firstIndex=contentString.indexOf('&',i);
                                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                          chaptersArray.push(tempString);
                                          i=secondIndex;
                                        }

                                        console.log('Chapters Array is ='+chaptersArray);

                                        var titlesArray=[];

                                        // For Main Titles denoted by @ Sign
                                        for (var i = 0; i < chaptersArray.length; i++) {
                                          var stringAtIndex = chaptersArray[i];
                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                          console.log('Akhzar is testing heading' + testString);

                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                            var firstIndex=stringAtIndex.indexOf('@',x);
                                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                            // Save String and Heading Both in Array
                                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                            titlesArray.push(ObjectToSaveInArray);
                                            x=secondIndex;

                                          }

                                        }

                                        console.log('Titles Array is ='+titlesArray);

                                        var tempArray=[];
                                        // For Nuskha Jaat denoted by $ Sign
                                        for (var i = 0; i < titlesArray.length; i++) {

                                          var mainHeading = titlesArray[i].heading;
                                          var stringAtIndex = titlesArray[i].data;
                                          console.log('Main Heading is == ' + mainHeading);
                                          console.log('stringAtIndex is == ' + stringAtIndex);

                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                          console.log('Akhzar is testing heading' + testString);

                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                            var firstIndex=stringAtIndex.indexOf('$',x);
                                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                            console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                            tempArray.push(ObjectToSaveInArray);
                                            x=secondIndex;

                                          }
                                        }
                                        console.log('Main Temp Temp Array is ='+tempArray);

                                        // Extract Headings from Sub Content From $ Sign.

                                        // For Nuskha Jaat denoted by $ Sign
                                        for (var i = 0; i < tempArray.length; i++) {

                                          var mainHeading = tempArray[i].mainheading;
                                          var subHeading = tempArray[i].subheading;
                                          var stringAtIndex = tempArray[i].data;

                                          console.log('Main Main Heading is == ' + mainHeading);
                                          console.log('Sub Sub Heading is == ' + subHeading);
                                          console.log('Main Main Data is == ' + stringAtIndex);

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
                                            console.log('Content Of Complete Book' + contentString);
                                            var chaptersArray=[];
                                            // For Chapters Titles denoted by & Sign
                                            for (var i = 0; i < contentString.length; i++) {
                                              var firstIndex=contentString.indexOf('&',i);
                                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                              chaptersArray.push(tempString);
                                              i=secondIndex;
                                            }

                                            console.log('Chapters Array is ='+chaptersArray);

                                            var titlesArray=[];

                                            // For Main Titles denoted by @ Sign
                                            for (var i = 0; i < chaptersArray.length; i++) {
                                              var stringAtIndex = chaptersArray[i];
                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                              console.log('Akhzar is testing heading' + testString);

                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                var firstIndex=stringAtIndex.indexOf('@',x);
                                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                // Save String and Heading Both in Array
                                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                titlesArray.push(ObjectToSaveInArray);
                                                x=secondIndex;

                                              }

                                            }

                                            console.log('Titles Array is ='+titlesArray);

                                            var tempArray=[];
                                            // For Nuskha Jaat denoted by $ Sign
                                            for (var i = 0; i < titlesArray.length; i++) {

                                              var mainHeading = titlesArray[i].heading;
                                              var stringAtIndex = titlesArray[i].data;
                                              console.log('Main Heading is == ' + mainHeading);
                                              console.log('stringAtIndex is == ' + stringAtIndex);

                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                              console.log('Akhzar is testing heading' + testString);

                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                var firstIndex=stringAtIndex.indexOf('$',x);
                                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                tempArray.push(ObjectToSaveInArray);
                                                x=secondIndex;

                                              }
                                            }
                                            console.log('Main Temp Temp Array is ='+tempArray);

                                            // Extract Headings from Sub Content From $ Sign.

                                            // For Nuskha Jaat denoted by $ Sign
                                            for (var i = 0; i < tempArray.length; i++) {

                                              var mainHeading = tempArray[i].mainheading;
                                              var subHeading = tempArray[i].subheading;
                                              var stringAtIndex = tempArray[i].data;

                                              console.log('Main Main Heading is == ' + mainHeading);
                                              console.log('Sub Sub Heading is == ' + subHeading);
                                              console.log('Main Main Data is == ' + stringAtIndex);

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
                                                console.log('Content Of Complete Book' + contentString);
                                                var chaptersArray=[];
                                                // For Chapters Titles denoted by & Sign
                                                for (var i = 0; i < contentString.length; i++) {
                                                  var firstIndex=contentString.indexOf('&',i);
                                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                  chaptersArray.push(tempString);
                                                  i=secondIndex;
                                                }

                                                console.log('Chapters Array is ='+chaptersArray);

                                                var titlesArray=[];

                                                // For Main Titles denoted by @ Sign
                                                for (var i = 0; i < chaptersArray.length; i++) {
                                                  var stringAtIndex = chaptersArray[i];
                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                  console.log('Akhzar is testing heading' + testString);

                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                    // Save String and Heading Both in Array
                                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                    titlesArray.push(ObjectToSaveInArray);
                                                    x=secondIndex;

                                                  }

                                                }

                                                console.log('Titles Array is ='+titlesArray);

                                                var tempArray=[];
                                                // For Nuskha Jaat denoted by $ Sign
                                                for (var i = 0; i < titlesArray.length; i++) {

                                                  var mainHeading = titlesArray[i].heading;
                                                  var stringAtIndex = titlesArray[i].data;
                                                  console.log('Main Heading is == ' + mainHeading);
                                                  console.log('stringAtIndex is == ' + stringAtIndex);

                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                  console.log('Akhzar is testing heading' + testString);

                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                    console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                    tempArray.push(ObjectToSaveInArray);
                                                    x=secondIndex;

                                                  }
                                                }
                                                console.log('Main Temp Temp Array is ='+tempArray);

                                                // Extract Headings from Sub Content From $ Sign.

                                                // For Nuskha Jaat denoted by $ Sign
                                                for (var i = 0; i < tempArray.length; i++) {

                                                  var mainHeading = tempArray[i].mainheading;
                                                  var subHeading = tempArray[i].subheading;
                                                  var stringAtIndex = tempArray[i].data;

                                                  console.log('Main Main Heading is == ' + mainHeading);
                                                  console.log('Sub Sub Heading is == ' + subHeading);
                                                  console.log('Main Main Data is == ' + stringAtIndex);

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
                                                    console.log('Content Of Complete Book' + contentString);
                                                    var chaptersArray=[];
                                                    // For Chapters Titles denoted by & Sign
                                                    for (var i = 0; i < contentString.length; i++) {
                                                      var firstIndex=contentString.indexOf('&',i);
                                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                      chaptersArray.push(tempString);
                                                      i=secondIndex;
                                                    }

                                                    console.log('Chapters Array is ='+chaptersArray);

                                                    var titlesArray=[];

                                                    // For Main Titles denoted by @ Sign
                                                    for (var i = 0; i < chaptersArray.length; i++) {
                                                      var stringAtIndex = chaptersArray[i];
                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                      console.log('Akhzar is testing heading' + testString);

                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                        // Save String and Heading Both in Array
                                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                        titlesArray.push(ObjectToSaveInArray);
                                                        x=secondIndex;

                                                      }

                                                    }

                                                    console.log('Titles Array is ='+titlesArray);

                                                    var tempArray=[];
                                                    // For Nuskha Jaat denoted by $ Sign
                                                    for (var i = 0; i < titlesArray.length; i++) {

                                                      var mainHeading = titlesArray[i].heading;
                                                      var stringAtIndex = titlesArray[i].data;
                                                      console.log('Main Heading is == ' + mainHeading);
                                                      console.log('stringAtIndex is == ' + stringAtIndex);

                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                      console.log('Akhzar is testing heading' + testString);

                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                        console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                        tempArray.push(ObjectToSaveInArray);
                                                        x=secondIndex;

                                                      }
                                                    }
                                                    console.log('Main Temp Temp Array is ='+tempArray);

                                                    // Extract Headings from Sub Content From $ Sign.

                                                    // For Nuskha Jaat denoted by $ Sign
                                                    for (var i = 0; i < tempArray.length; i++) {

                                                      var mainHeading = tempArray[i].mainheading;
                                                      var subHeading = tempArray[i].subheading;
                                                      var stringAtIndex = tempArray[i].data;

                                                      console.log('Main Main Heading is == ' + mainHeading);
                                                      console.log('Sub Sub Heading is == ' + subHeading);
                                                      console.log('Main Main Data is == ' + stringAtIndex);

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
                                                        console.log('Content Of Complete Book' + contentString);
                                                        var chaptersArray=[];
                                                        // For Chapters Titles denoted by & Sign
                                                        for (var i = 0; i < contentString.length; i++) {
                                                          var firstIndex=contentString.indexOf('&',i);
                                                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                          chaptersArray.push(tempString);
                                                          i=secondIndex;
                                                        }

                                                        console.log('Chapters Array is ='+chaptersArray);

                                                        var titlesArray=[];

                                                        // For Main Titles denoted by @ Sign
                                                        for (var i = 0; i < chaptersArray.length; i++) {
                                                          var stringAtIndex = chaptersArray[i];
                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                          console.log('Akhzar is testing heading' + testString);

                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                            var firstIndex=stringAtIndex.indexOf('@',x);
                                                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                            // Save String and Heading Both in Array
                                                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                            titlesArray.push(ObjectToSaveInArray);
                                                            x=secondIndex;

                                                          }

                                                        }

                                                        console.log('Titles Array is ='+titlesArray);

                                                        var tempArray=[];
                                                        // For Nuskha Jaat denoted by $ Sign
                                                        for (var i = 0; i < titlesArray.length; i++) {

                                                          var mainHeading = titlesArray[i].heading;
                                                          var stringAtIndex = titlesArray[i].data;
                                                          console.log('Main Heading is == ' + mainHeading);
                                                          console.log('stringAtIndex is == ' + stringAtIndex);

                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                          console.log('Akhzar is testing heading' + testString);

                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                            var firstIndex=stringAtIndex.indexOf('$',x);
                                                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                            console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                            tempArray.push(ObjectToSaveInArray);
                                                            x=secondIndex;

                                                          }
                                                        }
                                                        console.log('Main Temp Temp Array is ='+tempArray);

                                                        // Extract Headings from Sub Content From $ Sign.

                                                        // For Nuskha Jaat denoted by $ Sign
                                                        for (var i = 0; i < tempArray.length; i++) {

                                                          var mainHeading = tempArray[i].mainheading;
                                                          var subHeading = tempArray[i].subheading;
                                                          var stringAtIndex = tempArray[i].data;

                                                          console.log('Main Main Heading is == ' + mainHeading);
                                                          console.log('Sub Sub Heading is == ' + subHeading);
                                                          console.log('Main Main Data is == ' + stringAtIndex);

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
                                                            console.log('Content Of Complete Book' + contentString);
                                                            var chaptersArray=[];
                                                            // For Chapters Titles denoted by & Sign
                                                            for (var i = 0; i < contentString.length; i++) {
                                                              var firstIndex=contentString.indexOf('&',i);
                                                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                              chaptersArray.push(tempString);
                                                              i=secondIndex;
                                                            }

                                                            console.log('Chapters Array is ='+chaptersArray);

                                                            var titlesArray=[];

                                                            // For Main Titles denoted by @ Sign
                                                            for (var i = 0; i < chaptersArray.length; i++) {
                                                              var stringAtIndex = chaptersArray[i];
                                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                                              console.log('Akhzar is testing heading' + testString);

                                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                                var firstIndex=stringAtIndex.indexOf('@',x);
                                                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                // Save String and Heading Both in Array
                                                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                titlesArray.push(ObjectToSaveInArray);
                                                                x=secondIndex;

                                                              }

                                                            }

                                                            console.log('Titles Array is ='+titlesArray);

                                                            var tempArray=[];
                                                            // For Nuskha Jaat denoted by $ Sign
                                                            for (var i = 0; i < titlesArray.length; i++) {

                                                              var mainHeading = titlesArray[i].heading;
                                                              var stringAtIndex = titlesArray[i].data;
                                                              console.log('Main Heading is == ' + mainHeading);
                                                              console.log('stringAtIndex is == ' + stringAtIndex);

                                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                                              console.log('Akhzar is testing heading' + testString);

                                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                                var firstIndex=stringAtIndex.indexOf('$',x);
                                                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                tempArray.push(ObjectToSaveInArray);
                                                                x=secondIndex;

                                                              }
                                                            }
                                                            console.log('Main Temp Temp Array is ='+tempArray);

                                                            // Extract Headings from Sub Content From $ Sign.

                                                            // For Nuskha Jaat denoted by $ Sign
                                                            for (var i = 0; i < tempArray.length; i++) {

                                                              var mainHeading = tempArray[i].mainheading;
                                                              var subHeading = tempArray[i].subheading;
                                                              var stringAtIndex = tempArray[i].data;

                                                              console.log('Main Main Heading is == ' + mainHeading);
                                                              console.log('Sub Sub Heading is == ' + subHeading);
                                                              console.log('Main Main Data is == ' + stringAtIndex);

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
                                                                console.log('Content Of Complete Book' + contentString);
                                                                var chaptersArray=[];
                                                                // For Chapters Titles denoted by & Sign
                                                                for (var i = 0; i < contentString.length; i++) {
                                                                  var firstIndex=contentString.indexOf('&',i);
                                                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                  chaptersArray.push(tempString);
                                                                  i=secondIndex;
                                                                }

                                                                console.log('Chapters Array is ='+chaptersArray);

                                                                var titlesArray=[];

                                                                // For Main Titles denoted by @ Sign
                                                                for (var i = 0; i < chaptersArray.length; i++) {
                                                                  var stringAtIndex = chaptersArray[i];
                                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                  console.log('Akhzar is testing heading' + testString);

                                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                    // Save String and Heading Both in Array
                                                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                    titlesArray.push(ObjectToSaveInArray);
                                                                    x=secondIndex;

                                                                  }

                                                                }

                                                                console.log('Titles Array is ='+titlesArray);

                                                                var tempArray=[];
                                                                // For Nuskha Jaat denoted by $ Sign
                                                                for (var i = 0; i < titlesArray.length; i++) {

                                                                  var mainHeading = titlesArray[i].heading;
                                                                  var stringAtIndex = titlesArray[i].data;
                                                                  console.log('Main Heading is == ' + mainHeading);
                                                                  console.log('stringAtIndex is == ' + stringAtIndex);

                                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                  console.log('Akhzar is testing heading' + testString);

                                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                    console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                    tempArray.push(ObjectToSaveInArray);
                                                                    x=secondIndex;

                                                                  }
                                                                }
                                                                console.log('Main Temp Temp Array is ='+tempArray);

                                                                // Extract Headings from Sub Content From $ Sign.

                                                                // For Nuskha Jaat denoted by $ Sign
                                                                for (var i = 0; i < tempArray.length; i++) {

                                                                  var mainHeading = tempArray[i].mainheading;
                                                                  var subHeading = tempArray[i].subheading;
                                                                  var stringAtIndex = tempArray[i].data;

                                                                  console.log('Main Main Heading is == ' + mainHeading);
                                                                  console.log('Sub Sub Heading is == ' + subHeading);
                                                                  console.log('Main Main Data is == ' + stringAtIndex);

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
                                                                    console.log('Content Of Complete Book' + contentString);
                                                                    var chaptersArray=[];
                                                                    // For Chapters Titles denoted by & Sign
                                                                    for (var i = 0; i < contentString.length; i++) {
                                                                      var firstIndex=contentString.indexOf('&',i);
                                                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                      chaptersArray.push(tempString);
                                                                      i=secondIndex;
                                                                    }

                                                                    console.log('Chapters Array is ='+chaptersArray);

                                                                    var titlesArray=[];

                                                                    // For Main Titles denoted by @ Sign
                                                                    for (var i = 0; i < chaptersArray.length; i++) {
                                                                      var stringAtIndex = chaptersArray[i];
                                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                      console.log('Akhzar is testing heading' + testString);

                                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                        // Save String and Heading Both in Array
                                                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                        titlesArray.push(ObjectToSaveInArray);
                                                                        x=secondIndex;

                                                                      }

                                                                    }

                                                                    console.log('Titles Array is ='+titlesArray);

                                                                    var tempArray=[];
                                                                    // For Nuskha Jaat denoted by $ Sign
                                                                    for (var i = 0; i < titlesArray.length; i++) {

                                                                      var mainHeading = titlesArray[i].heading;
                                                                      var stringAtIndex = titlesArray[i].data;
                                                                      console.log('Main Heading is == ' + mainHeading);
                                                                      console.log('stringAtIndex is == ' + stringAtIndex);

                                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                      console.log('Akhzar is testing heading' + testString);

                                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                        console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                        tempArray.push(ObjectToSaveInArray);
                                                                        x=secondIndex;

                                                                      }
                                                                    }
                                                                    console.log('Main Temp Temp Array is ='+tempArray);

                                                                    // Extract Headings from Sub Content From $ Sign.

                                                                    // For Nuskha Jaat denoted by $ Sign
                                                                    for (var i = 0; i < tempArray.length; i++) {

                                                                      var mainHeading = tempArray[i].mainheading;
                                                                      var subHeading = tempArray[i].subheading;
                                                                      var stringAtIndex = tempArray[i].data;

                                                                      console.log('Main Main Heading is == ' + mainHeading);
                                                                      console.log('Sub Sub Heading is == ' + subHeading);
                                                                      console.log('Main Main Data is == ' + stringAtIndex);

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
                                                                        console.log('Content Of Complete Book' + contentString);
                                                                        var chaptersArray=[];
                                                                        // For Chapters Titles denoted by & Sign
                                                                        for (var i = 0; i < contentString.length; i++) {
                                                                          var firstIndex=contentString.indexOf('&',i);
                                                                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                          chaptersArray.push(tempString);
                                                                          i=secondIndex;
                                                                        }

                                                                        console.log('Chapters Array is ='+chaptersArray);

                                                                        var titlesArray=[];

                                                                        // For Main Titles denoted by @ Sign
                                                                        for (var i = 0; i < chaptersArray.length; i++) {
                                                                          var stringAtIndex = chaptersArray[i];
                                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                          console.log('Akhzar is testing heading' + testString);

                                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                                            var firstIndex=stringAtIndex.indexOf('@',x);
                                                                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                                              break;
                                                                            }

                                                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                            // Save String and Heading Both in Array
                                                                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                            titlesArray.push(ObjectToSaveInArray);
                                                                            x=secondIndex;

                                                                          }

                                                                        }

                                                                        console.log('Titles Array is ='+titlesArray);

                                                                        var tempArray=[];
                                                                        // For Nuskha Jaat denoted by $ Sign
                                                                        for (var i = 0; i < titlesArray.length; i++) {

                                                                          var mainHeading = titlesArray[i].heading;
                                                                          var stringAtIndex = titlesArray[i].data;
                                                                          console.log('Main Heading is == ' + mainHeading);
                                                                          console.log('stringAtIndex is == ' + stringAtIndex);

                                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                          console.log('Akhzar is testing heading' + testString);

                                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                                            var firstIndex=stringAtIndex.indexOf('$',x);
                                                                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                                              break;
                                                                            }

                                                                            console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                            console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                            tempArray.push(ObjectToSaveInArray);
                                                                            x=secondIndex;

                                                                          }
                                                                        }
                                                                        console.log('Main Temp Temp Array is ='+tempArray);

                                                                        // Extract Headings from Sub Content From $ Sign.

                                                                        // For Nuskha Jaat denoted by $ Sign
                                                                        for (var i = 0; i < tempArray.length; i++) {

                                                                          var mainHeading = tempArray[i].mainheading;
                                                                          var subHeading = tempArray[i].subheading;
                                                                          var stringAtIndex = tempArray[i].data;

                                                                          console.log('Main Main Heading is == ' + mainHeading);
                                                                          console.log('Sub Sub Heading is == ' + subHeading);
                                                                          console.log('Main Main Data is == ' + stringAtIndex);

                                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                          finalArray16.push(ObjectToSaveInArray);

                                                                        }

                                                                        this.setState({showProgress:false});
                                                                        AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));

                                                                      })


          // BookNameArray:[ 'Arnad','Andrain','Angoor','Aaam','خواص آک','Badam','Bargad','Dhatoora','خواص شہد','Dhania','Dhoodh','Gajar','Ghee kvar','Ghee','Dahee','Gul Surk'],

          var mainArray=[];

          var Object1ToSaveInMainArray = {title:'Arnad',data:finalArray1};
          var Object2ToSaveInMainArray = {title:'Andrain',data:finalArray2};
          var Object3ToSaveInMainArray = {title:'Angoor',data:finalArray3};
          var Object4ToSaveInMainArray = {title:'Aaam',data:finalArray4};
          var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
          var Object6ToSaveInMainArray = {title:'Badam',data:finalArray6};
          var Object7ToSaveInMainArray = {title:'Bargad',data:finalArray7};
          var Object8ToSaveInMainArray = {title:'Dhatoora',data:finalArray8};
          var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
          var Object10ToSaveInMainArray = {title:'Dhania',data:finalArray10};
          var Object11ToSaveInMainArray = {title:'Dhoodh',data:finalArray11};
          var Object12ToSaveInMainArray = {title:'Gajar',data:finalArray12};
          var Object13ToSaveInMainArray = {title:'Ghee kvar',data:finalArray13};
          var Object14ToSaveInMainArray = {title:'Ghee',data:finalArray14};
          var Object15ToSaveInMainArray = {title:'Dahee',data:finalArray15};
          var Object16ToSaveInMainArray = {title:'Gul Surk',data:finalArray16};

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





actionButtonPress(id){
  var screenName='BooksListScreen';
  if (id==4) {
    // screenName='HomeScreen';
  }
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
    navigatorStyle:{
      navBarHidden:true,
    },
  })
}


  render(){


    return(
      <View style={styles.outerContainer}>
      <Header navigator={this.props.navigator} showMenu={true} title='طبی کتب'/>

     

      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>


              <View style={[styles.rowView,{flex:0.15,justifyContent:'center',}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(1)} style={styles.buttonStyle}>
                    <Text style={styles.titleStyle}>علمی ادبی معاشرتی کتب</Text>
                    </TouchableOpacity>
              </View>
              <View style={[styles.rowView,{flex:0.15,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(2)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>تصانیف حکیم عبداللہ</Text>
                    </TouchableOpacity>
              </View>

       

       

              <View style={[styles.rowView,{flex:0.15,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(3)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>دیگر</Text>
                    </TouchableOpacity>
              </View>
              <View style={[styles.rowView,{flex:0.15,justifyContent:'center',alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>this.actionButtonPress(4)} style={styles.buttonStyle}>

                    <Text style={styles.titleStyle}>نسخہ جات</Text>
                    </TouchableOpacity>
              </View>

       







      </View>

      {
        this.state.showProgress?(
          <View
          style={{
            position:'absolute',
            width:DEVICE_WIDTH,
            height:DEVICE_HEIGHT,
            backgroundColor:'rgba(0,0,0, 0.50)',
          }}
          />
        ):(null)

      }

      <Loader showProgress={this.state.showProgress}/>



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
  //width:buttonWidth,
  //height:buttonWidth,
  //borderWidth:StyleSheet.hairlineWidth,
  borderColor:'black',
  height:70,
  width:400,
  marginLeft:15,
  marginRight:15,
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
  //  width:buttonWidth,
  //  height:buttonWidth,
    // backgroundColor:'orange',
  }

});

module.exports=BookCatagoryScreen;
