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
var backspaceIcon=require('./Icons/backspaceIcon.png');
import WebServiceHandler from 'react-native-web-service-handler';


class DialerScreen extends Component{


  constructor(props){
    super(props);
    this.state={
      text:'',
      responseObject:'',
    }

  }



  buttonPressed(ButtonNumber){
    var text=this.state.text;
    text=text+ButtonNumber;
    this.setState({text:text})
  }

buttonBackPressed(){
  var text=this.state.text;
  var newText=text.slice(0,text.length-1);
  this.setState({text:newText});
}


actionButtonPlay(){
  //something to do with button play

  var url='http://textalks.com/mobileadmin/frontend/web/api/dialer/get?number=12';
   return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({responseObject:responseJson});
      this.navigateToNextScreen(responseJson)
    })
    .catch((error) => {
      // console.error(error);
      Alert.alert(error.message);

    });



}

navigateToNextScreen(responseJson){

  this.props.navigator.push({
    screen:'DialerResultScreen',
    passProps:{responseJson},
    navigatorStyle:{
      navBarHidden:true,
    },
  })
}








  render(){

    var DEVICE_WIDTH=window.width;
    var Column_Width=DEVICE_WIDTH/3;



    return(
      <View style={styles.outercontainer}>

            <View style={{marginTop:80,height:100,backgroundColor:'white'}}>

              <TextInput
              style={{color:'black',backgroundColor:'white',flex:1,fontSize:45,textAlign:'center'}}
              editable = {false}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              underlineColorAndroid='transparent'
              />
            </View>

            {//button layout
            }
            <View style={{flex:1,backgroundColor:'white'}}>

            {
              /**
               * first layer
               */
            }
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                            <View style={styles.roundButtonView}>
                                  <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('1')}>
                                  <Text style={styles.roundTextSytle}>1</Text>
                                  </TouchableOpacity>
                            </View>

                            <View style={styles.roundButtonView}>
                            <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('2')}>
                            <Text style={styles.roundTextSytle}>2</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={styles.roundButtonView}>
                            <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('3')}>
                                <Text style={styles.roundTextSytle}>3</Text>
                            </TouchableOpacity>
                            </View>
                    </View>
                </View>




                {
                  /**
                   * second layer
                   */
                }

                <View style={{flex:1}}>
                          <View style={{flexDirection:'row',flex:1}}>
                                  <View style={styles.roundButtonView}>
                                        <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('4')}>
                                        <Text style={styles.roundTextSytle}>4</Text>
                                        </TouchableOpacity>
                                  </View>

                                  <View style={styles.roundButtonView}>
                                  <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('5')}>
                                  <Text style={styles.roundTextSytle}>5</Text>
                                  </TouchableOpacity>
                                  </View>

                                  <View style={styles.roundButtonView}>
                                  <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('6')}>
                                      <Text style={styles.roundTextSytle}>6</Text>
                                  </TouchableOpacity>
                                  </View>
                          </View>
                </View>

                  {
                    /**
                     * 3rd layer
                     */
                  }



                <View style={{flex:1}}>

                      <View style={{flexDirection:'row',flex:1}}>
                              <View style={styles.roundButtonView}>
                                    <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('7')}>
                                    <Text style={styles.roundTextSytle}>7</Text>
                                    </TouchableOpacity>
                              </View>

                              <View style={styles.roundButtonView}>
                              <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('8')}>
                              <Text style={styles.roundTextSytle}>8</Text>
                              </TouchableOpacity>
                              </View>

                              <View style={styles.roundButtonView}>
                              <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('9')}>
                                  <Text style={styles.roundTextSytle}>9</Text>
                              </TouchableOpacity>
                              </View>
                      </View>

                </View>


                {
                  /**
                   * 4th layer
                   */
                }

                <View style={{flex:1}}>

                      <View style={{flexDirection:'row',flex:1}}>
                              <View style={styles.roundButtonView}>
                                    <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('+')}>
                                    <Text style={styles.roundTextSytle}>+</Text>
                                    </TouchableOpacity>
                              </View>
                              <View style={styles.roundButtonView}>
                                    <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonPressed('0')}>
                                    <Text style={styles.roundTextSytle}>0</Text>
                                    </TouchableOpacity>
                              </View>
                              <View style={styles.roundButtonView}>
                                    <TouchableOpacity style={styles.roundButtonStyle} onPress={()=>this.buttonBackPressed()} >
                                    <Image source={backspaceIcon} style={{width:35,height:30}}/>
                                    </TouchableOpacity>
                              </View>
                      </View>

                </View>

                {
                  /**
                   * last button
                   */
                }

                <View style={{height:80,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>this.actionButtonPlay()} style={{backgroundColor:'gray',width:DEVICE_WIDTH-50,height:50,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Play</Text>
                  </TouchableOpacity>
                </View>


            </View>



      </View>
    );
}

}

const styles=StyleSheet.create({
  outercontainer:{
    flex:1,
    backgroundColor:'white',
  },
  roundButtonView:{
    flex:1,alignItems:'center',justifyContent:'center'
  },
  roundButtonStyle:{
    height:80,
    width:80,
    borderRadius:40,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderColor:'black'
  },
  roundTextSytle:{
    fontSize:35,
    color:'black',
  }
})



module.exports=DialerScreen;
