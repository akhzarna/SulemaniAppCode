
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

  class RelatedWords extends Component{
    constructor(props){
      super(props);
      var finalArray=[];
        finalArray = this.props.finalArrayToCheckRepitition

        this.state={
          finalArray:finalArray,
        }

        console.log('Final Data Array for Section LIST is = ' + this.state.finalArray);
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

    render(){

      return(

        <View>
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
        sections={this.state.finalArray}
        />

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

  module.exports = RelatedWords;
