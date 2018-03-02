const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  ListView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,

} = require('react-native');

import * as Progress from 'react-native-progress';


const Loader = (props)=>{

// <Progress.Circle  size={90} borderWidth={3}  indeterminate={true} />

return(
  <View style={styles.progressbarStyle}>
  {
    props.showProgress?(
        <View>
        <ActivityIndicator size='large' color='white'/>
        <Text style={styles.textStyle}>Loading All Books...</Text>
        </View>
  ):(null)

}
</View>

);


}


const styles=StyleSheet.create({
  progressbarStyle:{
    position:'absolute',
    left:'40%',
    top:'50%',

    // padding:20,
    // borderRadius:30,
    // backgroundColor:'rgba(0, 0, 0, 0.3)',
  },
  textStyle:{
    textAlign:'center',
    marginTop:5,
    fontSize:15,
    color:'white',
    backgroundColor:'transparent',


  }

})



module.exports=Loader;
