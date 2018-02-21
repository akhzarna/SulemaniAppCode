import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import { RegisterScreen } from './Script/RegisterScreen';

RegisterScreen();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'HomeScreen',
    title: 'Home',
    navigatorStyle: {
      navBarHidden:true,
        },
  },
  appStyle: {
      statusBarColor: 'black',
    },
      drawer: {
          right: {
            screen: 'SideMenu',
          },
        style:{ // ( iOS only )
          drawerShadow: true, // optional, add this if you want a side menu drawer shadow
          contentOverlayColor: 'rgba(0,0,0,0.30)', // optional, add this if you want a overlay color when drawer is open
          leftDrawerWidth: 80 ,// optional, add this if you want a define left drawer width (50=percent)
          rightDrawerWidth: 80 // optional, add this if you want a define right drawer width (50=percent)
        },
        disableOpenGesture: true ,
        }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BookAPP', () => BookAPP);
