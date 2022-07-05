import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';

const width = Dimensions.get('screen').width - 40

const data = news_list
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
export default function NewsScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    const forwardToCall = async () => {
        const args = {
            number: phone, // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch(console.error)  
    }
    const Card = ({news}) => {
        console.log(news)
        return (
            <View style={{ flex: .1, flexDirection: 'column', backgroundColor: COLORS.light, borderRadius: 5, marginBottom: 5}}
                >
                
                <View style={{paddingHorizontal: 10}}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green}}>{news.name}</Text>
                    <View style={{ marginVertical: 5, alignItems: 'flex-start', justifyContent: 'space-evenly', minHeight: 100, maxHeight: 250, backgroundColor: COLORS.dark}}>
                        <Image style={{ flex: 1, resizeMode: 'cover', maxWidth: '100%'}} source={news.img}/>
                    </View>
                    <Text numberOfLines={4} lineHeight={10} style={{fontSize:11, marginRight: 0, color: COLORS.dark}}>{news.about}</Text>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        margin: 5,
                        padding: 5,
                        borderColor: COLORS.green,
                        borderWidth: 2,
                        borderRadius: 8
                    }}
                    onPress={() => navigation.navigate('NewsDetail')}>
                        <Text style={{ color: COLORS.green, fontSize: 20, fontWeight: '500', fontStyle: 'normal'}}>Instant View</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
    return (
        <SafeAreaView style={{marginTop: 50,}}>
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
            <View>
                
            <FlatList 
                style={{backgroundColor: COLORS.white, marginTop: 5, marginBottom: 100}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                data={data} 
                renderItem={({item}) => <Card news={item}/>}/>
            </View>
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