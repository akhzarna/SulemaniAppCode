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
  Dimensions,
  TextInput,
  Image,
} from 'react-native';

const window = Dimensions.get('window');
class DialerResultScreen extends Component{


  constructor(props){
    super(props);

    this.state={

    }

  }

  render(){
    return(
      <View style={styles.outercontainer}>
    
      </View>
    );
  }


}

const styles=StyleSheet.create({
  outercontainer:{
    flex:1,
    backgroundColor:'gray',
  }

})


module.exports=DialerResultScreen;
