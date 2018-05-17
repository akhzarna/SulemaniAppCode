
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
          sectionArray:[],
        }

        // console.log('Final Data Array for Section LIST is = ' + this.state.finalArray[0]);
  }

  componentWillMount(){
    // console.log("will mount");
    this.function();
  }

  rowSelected(item,section){
     // console.log("read dfdnnfd",section.key,"item",item.key,"index",);
    var selectedItem =this.state.sectionArray[item.key].read;
    var selectedTitle = this.state.sectionArray[item.key].title;
    this.props.navigator.push({
      screen:'ReadingScreen',
      passProps:{selectedItem,selectedTitle},
      navigatorStyle:{
        navBarHidden:true,
      },
    });
  

  }

 function(){
  // console.log("calling"); 
  tempArray=[]; 
  title=[]; 
   for(var i=0; i<this.props.finalArrayToCheckRepitition.length; i++){
    //   var abc=this.props.finalArrayToCheckRepitition[i].data;
       var obj=this.props.finalArrayToCheckRepitition[i].data;
       var title=this.props.finalArrayToCheckRepitition[i].title;
    //   // console.log("datatta",abc.subbestheading);
      //  // console.log("abcd",title);
        var mainObj = {title:title,data:[{data:obj.subbestheading, key:i} ],  read:obj };
       tempArray.push(mainObj);
  }
  // console.log("saved array",tempArray);
  this.setState({ sectionArray: tempArray,
  });
 // // console.log("abcd",this.state.sectionArray);
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
         <Header title='Related Items' showMenu={false} navigator={this.props.navigator}/>

          <SectionList
        renderItem={({item,section}) => <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                      <View style={styles.textView}>
                      <View style={{flex:1}}>
                      <Image source={arrow_left} style={styles.iconDimention}/>
                      </View>
                      <View style={{flex:8}}>
                      <Text numberOfLines={1} style={styles.textStyle}> {item.data} {item.read}</Text>
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
        sections={this.state.sectionArray}
    
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
