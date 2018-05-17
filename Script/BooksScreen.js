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
} from 'react-native';

var Header=require('./Header');
var RNFS = require('react-native-fs');

class BooksScreen extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
    this.state={
        bookList:[],
        booksArray:[],
    }

  }

  onNavigationEvent(event) {
  // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link;
            this.props.navigator.resetTo({
            screen: parts,
            navigatorStyle: {
              navBarHidden:true,
            },
          });

    }
  }



  componentDidMount() {
    if (Platform.OS === 'ios') {
          this.loadBooksFromDocuments();
    }else{
          this.loadBooksFromDocumentsAndroid();
    }

   }

    componentWillUnmount() {

   }





   loadBooksFromDocumentsAndroid(){
   // Alert.alert('title')
   RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
     .then((result) => {
       // // console.log('GOT RESULT', result);
       var tempArray=[];
       for (var i = 0; i < result.length; i++) {
         var object=result[i];
         var nameIndex=object.name.indexOf('.');
         var ext=object.name.slice(nameIndex+1,object.name.length);
         if (ext=='txt') {
           var subName=object.name.slice(0,nameIndex);
           var document={name:subName,path:object.path};
           var tempObject={key:i,data:document};
           tempArray.push(tempObject);
         }

       }
       // console.log(tempArray);
       this.setState({bookList:tempArray});

       // stat the first file
       // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
     });

   }







loadBooksFromDocuments(){
// Alert.alert('title')
RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    // // console.log('GOT RESULT', result);
    var tempArray=[];
    for (var i = 0; i < result.length; i++) {
      var object=result[i];
      var nameIndex=object.name.indexOf('.');
      var ext=object.name.slice(nameIndex+1,object.name.length);
      if (ext=='txt') {
        var subName=object.name.slice(0,nameIndex);
        var document={name:subName,path:object.path};
        var tempObject={key:i,data:document};
        tempArray.push(tempObject);
      }

    }
    // // console.log(tempArray);

    this.setState({bookList:tempArray});

    // stat the first file
    // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  });

}







rowSelected(selectedItem){
          var bookName=selectedItem.data.name+'.txt'
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
      <Header navigator={this.props.navigator} showMenu={true} title='کتابیں'/>


        <FlatList
              data={this.state.bookList}
              renderItem={({item}) =>
              <TouchableOpacity onPress={()=>this.rowSelected(item)}>

              <View style={styles.textView}>
              <Text numberOfLines={1} style={styles.textStyle}>{item.data.name}</Text>
              </View>

              <View style={styles.lineView}/>

              </TouchableOpacity>

            }
            />


      </View>

    );
  }

}


const styles=StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:'white',
  },
  textView:{
    height:50,
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    // backgroundColor:'green',
  },
  lineView:{
    height:1,
    backgroundColor:'gray',
  },
  textStyle:{
    textAlign:'right',
  },

})


module.exports=BooksScreen;
