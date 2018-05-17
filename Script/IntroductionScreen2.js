
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
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

var Header=require('./Header');
var personImage=require('./Icons/person.png')
const window = Dimensions.get('window');

class IntroductionScreen2 extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

  }

  onNavigationEvent(event) {
	// handle a deep link
		if (event.type == 'DeepLink') {
			const parts = event.link;
			if (parts=='Home') {
				// console.log(parts);
				return;
			}else{
    				this.props.navigator.resetTo({
    			  screen: parts,
    				navigatorStyle: {
    					navBarHidden:true,
    				},
    			});
			  }
		}
	}

render(){
  return(
    <View style={styles.outerContainer}>
    <Header navigator={this.props.navigator} showMenu={true} title='حالات زندگی'/>
    <ScrollView style={styles.scrollStyle}>
    <Text style={styles.textStyle}>
    اُستاذ الحکماء حکیم محمد عبداللہؒ (1974-1904) برّصغیر پاک وہند کی طبّی دنیا میں کسی تعارف کے محتاج نہیں، پشت ہا پشت سے علم طب، علم دین اور تصنیف و تالیف آپکے خاندان کی شناخت چلی آتی ہے۔ آپکا تعلق متحدہ پنجاب (اب ہریانہ) کے قصبہ روڑی ضلع سرسہ سے تھا۔ آپکے والد گرامی مولانا محمد سلیمانؒ ایک طبیب اور مبلغ اسلام کے طور پرمعروف تھے۔ مولانا سلیمانؒ بلا شبہ ایک ولی کامل اورہندوستان کی اسلامی تحریکوں کے پشتیبان تھے۔ آپکی تصانیف کی تعداد بیس سے زائد ہے۔ حکیم محمد عبداللہؒ مولانا خیرالدین سرسوی ؒ کے شاگرد رشید تھے۔ آپ نے کچھ عرصہ حکیم اجمل خان مرحوم کے استاد حکیم عبدالوہاب انصاری المعروف نابینا صاحب کے سامنے بھی زانوئے تلمذ تہہ کیا۔1923ء میں محض انیس سال کی عمر میں پھٹکڑی جیسی سستی دوا سے تمام امراض کے علاج کیلئے اپنی پہلی کتاب ’’خواص پھٹکڑی‘‘ تصنیف کی۔لاہور کے ناشران کتب کیجانب سے ایک نو آموز کی کتاب چھاپنے سے انکار پر آپ نے روڑی جیسے دور افتادہ علاقے میں دارالکتب سلیمانی کے نام سے ایک اشاعتی ادارہ کی بنیاد رکھی۔ 1946ء تک آپکے قلم سے تقریباً 60 طبی کتب شائع ہو کر مقبول عام و خاص ہوئیں۔ آپکی مطبوعہ وغیرمطبوعہ کتب (جو تقسیم کے باعث ہندوستان میں رہ گئیں)کی تعداد 140کے قریب ہے۔ 1934ء میں مسیح الملک حکیم اجمل خانؒ کی قائم کردہ ممتاز ترین اطباء پر مشتمل آل انڈیا یونانی اینڈ آیورویدک طبی کانفرنس نے ان کتب کو طبّ یونانی میں بیش بہا وجلیل القدر اضافہ قراردیتے ہوئے فاضل مصنّف کو درجہ اوّل کی سند اور طلائی تمغہ عطا فرما کر حوصلہ افزائی فرمائی۔آپ پہلے طبّی مصنف تھے جو اس منفرد و یگانہ اعزاز کے مستحق قرار پائے۔ تقسیم برّصغیر کے بعد آپ اپنے وطنِ مالوف سے ہجرت کر کے جہانیاںضلع خانیوال میں اقامت پذیر ہوگئے اور یہاں مکتبہ سلیمانی کے نام سے سلسلہ خواص کی 6کتب طبع کی گئیں، تاہم نامساعد معاشی حالات کے باعث آپ نے کتب کے اشاعتی حقوق عارضی طور پر شیخ محمد اشرف تاجر کتب کشمیری بازار لاہور کو عطا کر دئیے۔جہانیاں میں آپکا مطب مرجع خلائق تھا ، تادم زندگی قلم وقرطاس سے آپکارشتہ برقرار رہااور آپ فروغ علم و طب میں ہمہ تن مشغول رہے۔ بحیثیت خطیب آپکی تقاریر بہت دلپذیر اور موثر ہوتیں،پاکستان کے اکثر دینی وعلمی اکابرین سے آپکا ذاتی تعلق تھا۔کتابوں سے محبت آپکو وراثت میں عطا ہوئی تھی،روڑی میں دس ہزار سے زائد نادر و نایاب کتب پر مشتمل آپکے کتب خانہ کا شمار ہندوستان کی بیمثال ذاتی لائبریریوں میں ہوتا تھا ۔کتابوں سے شیفتگی کا یہ عالم تھا کہ قیام پاکستان کے بعدنامساعد حالات کے باوجود چند ہی سالوں میں سلیمانی لائبریری جہانیاں کے نام سے آٹھ دس ہزار کتب دوبارہ اکٹھی کر لیں۔
    </Text>
    </ScrollView>
    </View>
  )
}
}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'white',
},
scrollStyle:{
  flex:1,

},
imageStyle:{

  backgroundColor:'green',
  width: window.width-30,
  height:window.width-180,
  marginLeft:15,
},
textStyle:{
  marginTop:20,
  paddingLeft:15,
  paddingRight:15,
  textAlign:'right',
  fontSize:20,
  lineHeight:35,
  fontFamily:'Nafees Web Naskh',
  marginBottom:40,
}

})

module.exports=IntroductionScreen2;
