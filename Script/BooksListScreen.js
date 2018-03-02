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
  Dimensions,
  AsyncStorage,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';

const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var Cell_Width=DEVICE_WIDTH/2

class BooksListScreen extends Component{

    constructor(props){
      super(props);
      // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

      this.state={
          dataArray:[
            {bookName:'خواص ارنڈ',key:0,cover:require('./Icons/Book1.jpg'),description:''},
            {bookName:'خواص اندرائن',key:1,cover:require('./Icons/Book3.jpg'),description:''},
            {bookName:'خواص انگور',key:2,cover:require('./Icons/Book4.jpg'),description:''},
            {bookName:'خواص آم',key:3,cover:require('./Icons/Book5.jpg'),description:''},
            {bookName:'خواص آک',key:4,cover:require('./Icons/Book6.jpg'),description:''},
            {bookName:'خواص بادام',key:5,cover:require('./Icons/Book7.jpg'),description:''},
            {bookName:'خواص برگد',key:6,cover:require('./Icons/Book8.jpg'),description:''},
            {bookName:'خواص دھتورہ',key:7,cover:require('./Icons/Book9.jpg'),description:''},

            {bookName:'خواص شہد',key:8,cover:require('./Icons/Book3.jpg'),description:''},
            {bookName:'دھنیہ',key:9,cover:require('./Icons/Book4.jpg'),description:''},
            {bookName:'دودھ',key:10,cover:require('./Icons/Book5.jpg'),description:''},
            {bookName:'گاجر',key:11,cover:require('./Icons/Book6.jpg'),description:''},
            {bookName:'گھی',key:12,cover:require('./Icons/Book7.jpg'),description:''},
            {bookName:'دھی',key:13,cover:require('./Icons/Book8.jpg'),description:''},
            {bookName:'گل سرک',key:14,cover:require('./Icons/Book9.jpg'),description:''},
            {bookName:'خواص انار',key:15,cover:require('./Icons/Book2.jpg'),description:''},

          ],
          BookNameArray:[ 'Arnad','Andrain','Angoor','Aaam','خواص آک','Badam','Bargad','Dhatoora','خواص شہد','Dhania','Dhoodh','Gajar','Ghee kvar','Ghee','Dahee','Gul Surk'],
          bookArray:[],
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
        // this.actionButtonLoadBook();
      }else{

      this.setState({
        bookArray:JSON.parse(value)
      });

      // this.setState({showProgress:false});

  }
      }).done();

  }


    rowSelected(item){

        var bookName=this.state.BookNameArray[item.key]
        var bookNameWithoutExtension=bookName;
        bookName=bookName+".txt";

        console.log('Ghalib Sab Testing');
        console.log(this.state.bookArray[0]);

        var finalArray=[];
        var bookArray;

        for (var x = 0; x < this.state.bookArray.length; x++) {
          if (this.state.bookArray[x].title == bookNameWithoutExtension) {
            var searchedArray=[];
            var bookArray=this.state.bookArray[x].data;
            // console.log('tahir testing');
            // console.log(bookArray);
            for (var i = 0; i < bookArray.length; i++) {
              var object={key:i,data:bookArray[i]}
              searchedArray.push(object);
            }
            break;
          }
        }

        var searchResult;

        var flag = 0;
        for (var i = flag; i < searchedArray.length; i++) {
          var title;
          var arrayForSections=[];
          for (var j = flag; j < searchedArray.length; j++) {
            if (searchedArray[i].data.mainheading == searchedArray[j].data.mainheading) {
               arrayForSections.push(searchedArray[j]);
               title = searchedArray[j].data.mainheading;
            }else{
              flag = j;
              break;
            }

          }

          if (arrayForSections.length>0) {
            console.log('Tahir');
            // console.log(arrayForSections[flag].data.mainheading);
            searchResult={'word':'Testing','searchedArray':arrayForSections,bookname:title};
            finalArray.push(searchResult);
          }

        }

        var book={bookName:bookName,
                  bookNameWithoutExtension:bookNameWithoutExtension};

        this.props.navigator.push({
            screen:'ChaptersListScreen',
            passProps:{book,finalArray},
            navigatorStyle:{
                    navBarHidden:true,
            },
        })

    }

  render(){

    return(
      <View style={styles.outerContainer}>
      <Header title='تصنیف' showMenu={false} navigator={this.props.navigator}/>

            <View style={{flex:1}}>
            <FlatList
                  style={{flex:1,marginBottom:20}}
                  data={this.state.dataArray}
                  numColumns={2}
                  renderItem={({item}) =>
                  <TouchableOpacity style={{marginTop:10,backgroundColor:'white',width:Cell_Width}} onPress={()=>this.rowSelected(item)}>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                    <Image source={item.cover} style={{width:100,height:140}}/>
                    <Text style={{color:'#38803B',marginTop:3,textAlign:'center',fontSize:15,fontWeight:'bold'}}>{item.bookName}</Text>
                    </View>
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
  backgroundColor:'white'
}
})

module.exports=BooksListScreen;
