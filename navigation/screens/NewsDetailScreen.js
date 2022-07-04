import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from "react-native-image-slider-box";

const width = Dimensions.get('screen').width - 40

const app_logo = require('../../assets/app.png')
const news1 = require('../../assets/News/4.jpg')
const news2 = require('../../assets/News/6.jpg')
export default function NewsDetailScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])
    const images = [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree",
    ]
    const Card = ({news}) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: COLORS.light, marginBottom: 5}}>
                <View style={{ maxHeight: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width/2 -70}} source={news.img}/>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green}}>{news.name}</Text>
                    <Text numberOfLines={4} style={{fontSize:11, marginRight: 85}}>{news.about}</Text>
                </View>                
            </View>
        )
    }
    return (
        <SafeAreaView style={{marginTop: 50,}}>
            <ScrollView style={{marginBottom: 0}}>
            <View style={style.header}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.green}}>SamiDish</Text>
                <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#fff',
                    alignItems: 'center'
                }}>
                    <Image source={app_logo} style={{flex: 1, resizeMode: 'center'}}/>
                </View>            
            </View>
            
            <SliderBox images={images}/>
            <View style={{marginTop: 5, marginHorizontal: 30, marginVertical: 20}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green, textAlign: 'center', marginVertical: 10}}>ኢትዮጵያ ድል አደረገች 💚💛❤️</Text>
                <Text style={{}}>
                ኢትዮጵያ ግብፅን በፍፁም የበላይነት ድል አደረገቻት።   

                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                የዛሬውን ጨዋታ ለማስተናገድ ብቁ ሜዳ አጥታ በሰው ሀገር ማላዊ ከግብፅ አቻዋ ጋር በአፍሪካ ዋንጫ የምድብ ማጣሪያ የተፋለመችው ሀገራችን ኢትዮጵያ እጅግ ድንቅ እንቅስቃሴ በማድረግ ግብፅን አሸንፋለች።

                ሀገራችን ሙሉ ጨዋታውን በከፍተኛ የበላይነት ነው ያጠናቀቀችው።

                ማላዊያን አንድም የግብፅ ሽንፈት ለሀገራቸው የሚሰጠውን ከምድብ የማለፍ እድልን ታሳቢ አድርገው በሌላ በኩል ኢትዮጵያ በሜዳ ውስጥ ባሳየችው ድንቅ እንቅስቃሴ ተስበው ከፍተኛ ድጋፍ ሲያደርጉ ታይተዋል።

                የኢትዮጵያ ህዝብ ለሀገሩ እና ለኳስ ያለው ፍቅር ምን ያህል እንደሆነ ይታወቃል የዛሬው ጨዋታ እዚህ ኢትዮጵያ ውስጥ ተደርጎ ቢሆን ከዛሬውም የበለጠ ድባብ ይኖረው ነበር።
                </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    productCard: {
        backgroundColor: COLORS.green,
        width,
        marginVertical: 10,
        maxHeight: 550,
        minHeight: 550,
        marginBottom: 10 ,
        marginLeft: 15,
        borderRadius: 10
    }
})