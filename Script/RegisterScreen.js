import { Navigation } from 'react-native-navigation';

var HomeScreen=require('./HomeScreen');
var SideMenu=require('./SideMenu');
var DisplayResultScreen=require('./DisplayResultScreen');
var DescriptionScreen=require('./DescriptionScreen');
var BooksScreen=require('./BooksScreen');
var BookMarkScreen=require('./BookMarkScreen');
var NotesScreen=require('./NotesScreen');
var BookContents=require('./BookContents');
var ReadingScreen=require('./ReadingScreen');
var IndexScreen=require('./IndexScreen');
var BookMarkReading=require('./BookMarkReading');
var IntroductionScreen=require('./IntroductionScreen');
var IntroductionScreen2=require('./IntroductionScreen2');
var ListScreen=require('./ListScreen');
var EassyReading=require('./EassyReading');
var DialerScreen=require('./DialerScreen');
var DialerResultScreen=require('./DialerResultScreen');
var BookCatagoryScreen=require('./BookCatagoryScreen');
var NewHomeScreen=require('./NewHomeScreen');
var BooksListScreen=require('./BooksListScreen');
var ChaptersListScreen=require('./ChaptersListScreen');

export function RegisterScreen(){
  Navigation.registerComponent('HomeScreen', () => HomeScreen);
  Navigation.registerComponent('SideMenu', () => SideMenu);
  Navigation.registerComponent('DisplayResultScreen', () => DisplayResultScreen);
  Navigation.registerComponent('DescriptionScreen', () => DescriptionScreen);
  Navigation.registerComponent('BooksScreen', () => BooksScreen);
  Navigation.registerComponent('BookMarkScreen', () => BookMarkScreen);
  Navigation.registerComponent('NotesScreen', () => NotesScreen);
  Navigation.registerComponent('BookContents', () => BookContents);
  Navigation.registerComponent('ReadingScreen', () => ReadingScreen);
  Navigation.registerComponent('IndexScreen', () => IndexScreen);
  Navigation.registerComponent('BookMarkReading', () => BookMarkReading);
  Navigation.registerComponent('IntroductionScreen', () => IntroductionScreen);
  Navigation.registerComponent('IntroductionScreen2', () => IntroductionScreen2);
  Navigation.registerComponent('ListScreen', () => ListScreen);
  Navigation.registerComponent('EassyReading', () => EassyReading);
  Navigation.registerComponent('DialerScreen', () => DialerScreen);
  Navigation.registerComponent('DialerResultScreen', () => DialerResultScreen);
  Navigation.registerComponent('NewHomeScreen', () => NewHomeScreen);
  Navigation.registerComponent('BooksListScreen', () => BooksListScreen);
  Navigation.registerComponent('ChaptersListScreen', () => ChaptersListScreen);
  Navigation.registerComponent('BookCatagoryScreen', () => BookCatagoryScreen);

}
