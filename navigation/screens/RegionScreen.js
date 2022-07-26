import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../../sample-data/COLORS';

import { DOMAIN_NAME, FETCH_NEWS_LIST, FETCH_REGION_LIST } from '../../sample-data/constants';

import axios from 'axios';

import LottieView from 'lottie-react-native';

const width = Dimensions.get('screen').width - 40

const app_logo = require('../../assets/app.png')

export default function RegionScreen({ navigation }) {
    const [regionList, setRegionList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    React.useEffect(() => {
        getNewsList()
    }, [])

    async function getNewsList(){
        setLoading(true)
        axios.get(FETCH_REGION_LIST)
        .then((response) => {
            if(response.data &&  response.status && response.data.success){
                setLoading(false)
                setRegionList(response.data.region_data)
            }
        })
        .catch((error) => {
            setLoading(false)
        })
    }
    
    const Card = ({region}) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('CityScreen', {region_id: region.id})} style={{ 
                flex: 1, flexDirection: 'row',
                alignItems: 'center', margin: 5,
                marginVertical: 10,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                padding: 15,
                shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,
                }}>
                <View style={{ backgroundColor: COLORS.light_green, padding: 15, borderRadius: 50}}>
                    <Icon name='location-on' color={COLORS.green} size={35}/>
                </View>
                <Text style={{ flex: 4, fontWeight: '500', fontSize: 18, marginLeft: 20, color: COLORS.green }}>{region.title} </Text>
                <Icon name='navigate-next' color={COLORS.light_green} size={45} style={{ flex: 1}}/>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{marginTop: 50,}}>
            <View style={style.header}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.green}}>EthioDish</Text>
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
                data={regionList} 
                renderItem={({item}) => <Card region={item}/>}/>)}
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
        shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 15, height: 45}, elevation: 6,
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