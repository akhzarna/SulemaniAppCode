
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

var Header=require('./Header');

class NotesScreen extends Component{
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
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

  render(){
    return(
      <View style={styles.outerContainer}>
      <Header navigator={this.props.navigator} showMenu={true} title='Notes'/>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:'green',
  }
})

module.exports=NotesScreen;
