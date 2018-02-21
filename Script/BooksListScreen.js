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
            {bookName:'خواص انار',key:1,cover:require('./Icons/Book2.jpg'),description:''},
            {bookName:'خواص اندرائن',key:2,cover:require('./Icons/Book3.jpg'),description:''},
            {bookName:'خواص انگور',key:3,cover:require('./Icons/Book4.jpg'),description:''},
            {bookName:'خواص آم',key:4,cover:require('./Icons/Book5.jpg'),description:''},
            {bookName:'خواص آک',key:5,cover:require('./Icons/Book6.jpg'),description:''},
            {bookName:'خواص بادام',key:5,cover:require('./Icons/Book7.jpg'),description:''},
            {bookName:'خواص برگد',key:5,cover:require('./Icons/Book8.jpg'),description:''},
            {bookName:'خواص دھتورہ',key:5,cover:require('./Icons/Book9.jpg'),description:''},

          ],
          BookNameArray:[ 'Dhania','Dhatoora','Dhoodh','Gajar','Ghee','Ghee kvar','Gul Surk'],
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



    rowSelected(item){
        // Alert.alert('Alert','Sorry Book is not available right now');
        // var bookName=selectedItem.data.name+'.txt'
        var bookName=this.state.BookNameArray[item.key]
        bookName=bookName+".txt";
        if (item.key>=this.state.BookNameArray.length) {
            bookName='Angoor.txt'
        }
        // var bookName='Angoor.txt'
        var book={bookName:bookName};
        this.props.navigator.push({
            screen:'IndexScreen',
            passProps:{book},
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
