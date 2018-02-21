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
} from 'react-native';
var Header=require('./Header')
var Loader=require('./Loader')

var RNFS = require('react-native-fs');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress';
import Autocomplete from 'react-native-autocomplete-input';
import Carousel from 'react-native-snap-carousel';

var dashboard_logo=require('./Icons/logo.png')
var checkIcon=require('./Icons/checkBox.png');
var uncheckIcon=require('./Icons/uncheckBox.png');
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
    this.state={
        fileContent:'kdsnfk',
        bookArray:[],
        txtSearch:'',
        isUrduSelected:true,
        buttonSearchTitle:'تلاش کریں',
        placeholderText:'نسخہ جات تلاش کریں',
        showProgress:true,
        isBook1Selceted:true,
        isBook2Selected:false,
        bannersArray:[
          {fileName:require('./Banner/Matab_Banner_1.jpg'),key:5},
          {fileName:require('./Banner/Matab_Banner_2.png'),key:6},
          {fileName:require('./Banner/Matab_Banner_3.png'),key:7},
          {fileName:require('./Banner/honey_1.jpg'),key:0},
          {fileName:require('./Banner/honey_3.jpeg'),key:1},
          {fileName:require('./Banner/honey_2.jpg'),key:2},
          {fileName:require('./Banner/Honey_Farmi.jpg'),key:3},
          {fileName:require('./Banner/Honey_Wild.jpg'),key:4},
        ]
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
    if (!Constants.isBookLoaded) {
    this.actionButtonLoadBook();
  }else{
    this.setState({
      bookArray:Constants.BookArray,
      showProgress:false,
    })
  }


}

    componentWillUnmount() {

  }

  actionButtonLoadBook(){

    var path1='';
    var path2='';

    if (Platform.OS === 'ios') {
    // path1=RNFS.MainBundlePath+'/خواص آک.txt';
    path1=RNFS.MainBundlePath+'/Angoor.txt';
    console.log('Path For Book 1 is =' + path1);
    path2=RNFS.MainBundlePath+'/خواص آک.txt';
    console.log('Path For Book 2 is =' + path2);

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

        RNFS.readFile(path2)
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
                this.setState({showProgress:false});

              }
            })


        var mainArray=[];
        var Object1ToSaveInMainArray = {title:'خواص آک',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'خواص شہد',data:finalArray2};
        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:mainArray
        })


  }else{

    // For Android Path is different
  var  path1='خواص آک.txt';
   var  path2='خواص آک.txt';


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
                finalArray2.push(ObjectToSaveInArray);
                this.setState({showProgress:false});

              }
            })


        var mainArray=[];
        var Object1ToSaveInMainArray = {title:'خواص آک',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'خواص شہد',data:finalArray2};
        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:mainArray
        })

// readFileAssets
  }
}

actionButtonSearch(){
// this.searchExactWord();
var stringToSearch=this.state.txtSearch.trim();
console.log('String to Search' + stringToSearch);
  stringToSearch=stringToSearch.toLowerCase();
if (stringToSearch.length<=1) {
  Alert.alert('Stop!','Search complete word');
  return;
}


var finalArray=[];
var tempBookArray=[];
if (this.state.isBook1Selceted) {
  tempBookArray.push(this.state.bookArray[0])
}
if (this.state.isBook2Selected) {
  tempBookArray.push(this.state.bookArray[1])
}
if (!this.state.isBook1Selceted&&!this.state.isBook2Selected) {
  Alert.alert('Stop!','Select book to search');
  return;
}

this.setState({showProgress:true})

for (var x = 0; x < tempBookArray.length; x++) {
var bookArray=tempBookArray[x].data;
console.log('Book Array is =' + bookArray);
var searchedArray=[];
var counter=0;
for (var i = 0; i < bookArray.length; i++) {
  var tempString=bookArray[i].data;
  console.log('Data Wali tempString = '+tempString);
  console.log('Check For mainHeadings = ' + bookArray[i].mainheading);
  var mainHeading=bookArray[i].mainheading;
  console.log('Check For subHeadings = ' + bookArray[i].subheading);
  var subHeading=bookArray[i].subheading;
  console.log('Check For subbestHeadings = ' + bookArray[i].subbestheading);
  var subbestheading=bookArray[i].subbestheading;

  var tempPara=tempString.toLowerCase();

  var index=mainHeading.indexOf(stringToSearch);
  if (index==-1) {
  index=subHeading.indexOf(stringToSearch);
  }
  if (index==-1) {
    index=subbestheading.indexOf(stringToSearch);
  }
  if (index==-1) {
    var index=tempPara.indexOf(stringToSearch);
  }

  if (index != -1) {
    var object={key:counter,data:bookArray[i]}
    searchedArray.push(object);
    counter++;
  }
}

if (searchedArray.length>0) {
    console.log('Searched Array Length is = '+searchedArray.length);
}

var searchResult={'word':stringToSearch,'searchedArray':searchedArray,bookname:tempBookArray[x].title};
console.log('Search Result Word is = ',searchResult['word']);

this.setState({showProgress:false})
if (searchedArray.length==0) {
  Alert.alert('Stop!','No result found');
  return;
}

  finalArray.push(searchResult);

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

actionCheckBox2(){
  this.setState({isBook2Selected:!this.state.isBook2Selected,
                    });

}

actionCheckBox1(){

  this.setState({
                isBook1Selceted:!this.state.isBook1Selceted,
                  });

}




_renderItem ({item, index}) {
        var image=item.fileName
    return (
        <View style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}>

            <Image source={image} style={{width:itemWidth,height:itemWidth,borderRadius:15}}/>

        </View>
    );
  }






  render(){
    return(
      <View style={styles.outerContainer}>
      <Image  source={backgroundImage} style={{width:window.width,height:window.height,backgroundColor:'gray'}}>
      <Header navigator={this.props.navigator} showMenu={true} title='طبی کتب'/>
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

       <View style={styles.buttonView}>
       <TouchableOpacity onPress={()=>this.actionButtonSearch()} style={styles.buttonStyle}>
       <Text style={styles.textStyle}>{this.state.buttonSearchTitle}</Text>
       </TouchableOpacity>
       </View>


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


      {/*
         <Text style={{textAlign:'right',marginRight:15,marginTop:15}}>کس کتاب سے تلاش کرنا چاہتے ہیں؟</Text>

         <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginRight:15,}}>

          <TouchableOpacity onPress={()=>this.actionCheckBox1()} style={{width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{alignSelf:'center'}}>خواص آک</Text>
          <Image source={this.state.isBook1Selceted?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.actionCheckBox2()} style={{width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{alignSelf:'center'}}>خواص شہد</Text>
          <Image source={this.state.isBook2Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
          </View>
          </TouchableOpacity>

       </View>
     */}


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
  marginTop:10,
  alignItems:'center',
  justifyContent:'center',
},
buttonStyle:{
height:50,
width:140,
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
