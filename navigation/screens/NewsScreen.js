import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';
import { DOMAIN_NAME, FETCH_NEWS_LIST } from '../../sample-data/constants';

import axios from 'axios';

import LottieView from 'lottie-react-native';

const width = Dimensions.get('screen').width - 40

const data = news_list
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
export default function NewsScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')
    const [newsList, setNewsList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    React.useEffect(() => {
        console.log('use effect');
        getNewsList()
    }, [])
    async function getNewsList(){
        setLoading(true)
        axios.get(FETCH_NEWS_LIST)
        .then((response) => {
            console.log(response)
            console.log('News list featch response ')
            console.log(response.data)
            if(response.data &&  response.status && response.data.success){
                console.log(response.data.news_data)
                setLoading(false)
                setNewsList(response.data.news_data)
            }
        })
        .catch((error) => {
            console.log('Error: News list feath error')
            setLoading(false)
            console.log(error.message)
        })
    }
    
    const Card = ({news}) => {
        var image_uri;
        if(news.news_files.length > 0){
            console.log(DOMAIN_NAME + news.news_files[0].file);
            image_uri = {uri: DOMAIN_NAME + news.news_files[0].file}
        }else{
            var image_uri = require('../../assets/notfound.jpg')
        }

        return (
            <View style={{ flex: .1, flexDirection: 'column', backgroundColor: COLORS.light, borderRadius: 5, marginBottom: 5}}
                >
                
                <View style={{paddingHorizontal: 10}}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green}}>{news.title}</Text>
                    <View style={{ marginVertical: 5, alignItems: 'center', justifyContent: 'center', minHeight: 100, maxHeight: 250, backgroundColor: COLORS.dark}}>
                        <Image style={{ flex: 1, resizeMode: 'cover', maxWidth: '100%', minWidth: width - 20, height: '100%'}} source={image_uri}/>
                    </View>
                    <Text numberOfLines={4} lineHeight={10} style={{fontSize:14, marginRight: 0, color: COLORS.dark}}>{news.description}</Text>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        margin: 5,
                        padding: 5,
                        borderColor: COLORS.green,
                        borderWidth: 2,
                        borderRadius: 8
                    }}
                    onPress={() => {
                        const news_image_list = []
                        news.news_files.forEach(element => {
                            news_image_list.push(DOMAIN_NAME+element.file)
                        });
                        navigation.navigate('NewsDetail', {news: news, imageList : news_image_list})}}>
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
                
            {!loading && (<FlatList 
                style={{backgroundColor: COLORS.white, marginTop: 5, marginBottom: 100}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                data={newsList} 
                renderItem={({item}) => <Card news={item}/>}/>)}
            {loading && (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 150}}>
                    <LottieView source={require('../../assets/98657-loader.json')} 
                        autoPlay loop size={150} autoSize={true} 
                        style={{width: 140, color: COLORS.white}} color={COLORS.white}/>
                </View>
            )}
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