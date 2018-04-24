
  import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    SectionList,
    ImageBackground,
    Dimensions,
    TextInput,
  } from 'react-native';

  var Header=require('./Header');
  var arrow_left=require('./Icons/arrow_left.png');
  import HTMLView from 'react-native-htmlview';
  import SearchHeader from './SearchHeader';


  var isiPhone=Platform.OS === 'ios';
  var backArrow=require('./Icons/backArrow_2.png')
  var headerImage=require('./Icons/header.png');
  var searchIcon =  require('./Icons/search_icon.png');

  const window = Dimensions.get('window');


  class ChaptersListScreen extends Component{
    constructor(props){
      super(props);

            var finalArray=[];
            for (var x = 0; x < this.props.finalArray.length; x++) {
            var arrayList=[];
            for (var i = 0; i < this.props.finalArray[x].searchedArray.length; i++) {
              var paragraph=''+this.props.finalArray[x].searchedArray[i].data.data;
              var searchWord=this.props.finalArray[x].word;
              var index=paragraph.indexOf(searchWord);
              // console.log('Index to HightLight is = '+index);
              var data='';
              var firstIndex=-1;
              var secondIndex=-1;
              if (index-15>0) {
                var tempIndex=index-15;
                firstIndex=paragraph.indexOf(' ',tempIndex);
              }else{
                firstIndex=0;
              }
              secondIndex=paragraph.indexOf(' ',index+100);
              if (secondIndex==-1) {
                secondIndex==paragraph.length;
              }
              data=paragraph.slice(firstIndex,secondIndex);
              data=data.replace(/\r|\n/g,' ');
              data=data.replace(/#/g,' ');
              // data=data.replace(searchWord,'<b>'+searchWord+'</b>');
              // data='<p>'+data+'</p>';
              var frequency=this.findFrequencyOfSearchWord(paragraph)

              // console.log('paragraph is = ' + paragraph);
              // console.log('data is = ' + data);
              // console.log('key is = ' + i);
              // console.log('frequency is = ' + frequency);

              var object={data:data,key:i,frequency:frequency};
              arrayList.push(object)
              arrayList.sort(function(a,b){
                return parseInt(b.frequency)-parseInt(a.frequency);
              })

          }

              finalArray.push(arrayList);

        }

        var tempNewArray=[];
        for (var i = 0; i < finalArray.length; i++) {
          var data=finalArray[i];
          var title=this.props.finalArray[i].bookname
          var key=i;
          var object={data:data,key:key,title:title};
          tempNewArray.push(object);
        }

        this.state={
          dataArray:tempNewArray,
          searchedData:tempNewArray,
          showSearchField:false,
          finalArray:finalArray,
          textSearch:'',
        }

        console.log('Final Data Array for Section LIST is = ' + this.state.dataArray);
  }

  findFrequencyOfSearchWord(paragraph){

      var searchWord=this.props.finalArray[0].word;
      // console.log('Search Result For Frequency is = ' + searchWord);
      var freqCounter = 0;
      var headingEndIndex = paragraph.indexOf('\r',1);

      // console.log('Heading End Index is = ' + headingEndIndex);
      // console.log('Paragraph Length is = ' + paragraph.length);

      for (var j = 0; j <paragraph.length; j++) {
              var index=paragraph.indexOf(searchWord,j);
              if (index == -1) {
                break;
              }
              else{
                freqCounter++;
              }
              if (index<headingEndIndex) {
                freqCounter=1000;
              }
              j=index+1;
      }
      return freqCounter;
  }

  rowSelected(item,section){

  // console.log('Choosed Item is =' + item);
  if (item.key == -1) {
    return ;
  }
  var dataSelected=this.props.finalArray[section.key].searchedArray[item.key].data;
  // console.log('DataSelected is =' + dataSelected);
  var searchWord=this.props.finalArray[0].word;
  var selectedItem={key:item.key,data:dataSelected,searchWord:searchWord};
    this.props.navigator.push({
      screen:'DescriptionScreen',
      passProps:{selectedItem},
      navigatorStyle:{
        navBarHidden:true,
      },
    })
  }



  actButtonSearch(){
    this.setState({
      showSearchField:true,
    })

    // this.refs.SearchInput.focus();

  }
  actSearch(text){


    var searchWord=text.trim();
    var orignalData=this.state.dataArray;
    this.setState({
    textSearch:searchWord
  })
    if (searchWord == '') {
      this.setState({
        searchedData:orignalData,
      })
      return;
    }
    var finalArray=[];
    for (var x = 0; x < this.props.finalArray.length; x++) {
    var arrayList=[];
    for (var i = 0; i < this.props.finalArray[x].searchedArray.length; i++) {
      var paragraph=''+this.props.finalArray[x].searchedArray[i].data.data;

      var index=paragraph.indexOf(searchWord);
      // console.log('Index to HightLight is = '+index);
      if (index == -1) {
        continue;
      }
      var data='';
      var firstIndex=-1;
      var secondIndex=-1;
      if (index-15>0) {
        var tempIndex=index-15;
        firstIndex=paragraph.indexOf(' ',tempIndex);
      }else{
        firstIndex=0;
      }
      secondIndex=paragraph.indexOf(' ',index+100);
      if (secondIndex==-1) {
        secondIndex==paragraph.length;
      }
      data=paragraph.slice(firstIndex,secondIndex);
      data=data.replace(/\r|\n/g,' ');
      data=data.replace(/#/g,' ');
      // data=data.replace(searchWord,'<b>'+searchWord+'</b>');
      // data='<p>'+data+'</p>';
      var frequency=this.findFrequencyOfSearchWord(paragraph)

      // console.log('paragraph is = ' + paragraph);
      // console.log('data is = ' + data);
      // console.log('key is = ' + i);
      // console.log('frequency is = ' + frequency);

      var object={data:data,key:i,frequency:frequency};
      arrayList.push(object)
      arrayList.sort(function(a,b){
        return parseInt(b.frequency)-parseInt(a.frequency);
      })

  }
  if (arrayList.length == 0) {
    var object={data:"نتیج نہیں ملا",key:-1,frequency:"1"};
    arrayList.push(object);
  }
      finalArray.push(arrayList);

}

var tempNewArray=[];
for (var i = 0; i < finalArray.length; i++) {
  var data=finalArray[i];
  var title=this.props.finalArray[i].bookname
  var key=i;
  var object={data:data,key:key,title:title};
  tempNewArray.push(object);
}


    this.setState({
      searchedData:tempNewArray,

    })



  }




 actionTextBlur(){

  if (this.state.textSearch == '') {
    this.setState({
      showSearchField:false,
    })
  }

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

                    }}>{this.props.book.bookNameWithoutExtension}</Text>
                  )
                }
                </View>

                <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginRight:10}}>
                <Image style={{width:30,height:22}} source={backArrow}/>
                </TouchableOpacity>


          </View>

        </ImageBackground>
        </View>




        <SectionList
        renderItem={({item,section}) => <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                      <View style={styles.textView}>
                      <View style={{flex:1}}>
                      <Image source={arrow_left} style={styles.iconDimention}/>
                      </View>
                      <View style={{flex:8}}>
                      <Text numberOfLines={1} style={styles.textStyle}> {item.data}</Text>
                      </View>
                      </View>
                      <View style={styles.lineView}/>
                      </TouchableOpacity>}
        renderSectionHeader={({section}) =>
        <View style={{height:40,backgroundColor:'#999999',justifyContent:'center'}}>
        <Text style={{color:'white',textAlign:'right',
        paddingLeft:15,paddingRight:15,
        fontSize:20,
        fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
          }}>
          {section.title}
          </Text>
        </View>
        }
        sections={this.state.searchedData}
        />

        {

        // <Header title='نتائج' navigator={this.props.navigator}/>
        //         <FlatList
        //               data={this.state.dataArray}
        //               renderItem={({item}) =>
        //               <TouchableOpacity onPress={()=>this.rowSelected(item)}>
        //               <View style={styles.textView}>
        //               <View style={{flex:1}}>
        //               <Image source={arrow_left} style={styles.iconDimention}/>
        //               </View>
        //               <View style={{flex:8}}>
        //               <Text numberOfLines={1} style={styles.textStyle}>{item.data}</Text>
        //               </View>
        //               </View>
        //               <View style={styles.lineView}/>
        //               </TouchableOpacity>
        //             }
        //             />
  }
        </View>

      );}

  }

  const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'#F7FAFB',
    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      marginLeft:15,
      marginRight:15,
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
      fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
      fontSize:17,
    },
    iconDimention:{
      width:12,
      height:20,
    }
  })

  const htmlstyles = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
    b:{
      fontWeight:'bold',
      color:'red',
    }
  });

  module.exports = ChaptersListScreen;
