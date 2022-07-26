import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { DOMAIN_NAME, FETCH_SOFTWARE_BRAND_LIST, FETCH_TECHNICIANS_LIST } from '../../sample-data/constants';

import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width

const app_logo = require('../../assets/app.png')

export default function SoftwareBrandScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [software_brand_list, setSoftwareBrandList] = React.useState([])

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getDataSet()
      }, [navigation])
      
    async function getDataSet(){
      setLoading(true)
      axios.get(FETCH_SOFTWARE_BRAND_LIST)
      .then((response) => {
          if(response.data &&  response.status && response.data.success){
            setLoading(false)
            setSoftwareBrandList(response.data.software_brand_data)
          }
      })
      .catch((error) => {
          setLoading(false)
      })
    }

    const Card = ({brand}) => {
        
        return (
            <View>
                <TouchableOpacity style={style.card} onPress={() => navigation.navigate('BrandSoftwares', { brand: brand, brand_id: brand.id })}>
                    <View style={{ height: 100, alignItems: 'center', borderRadius: 100}}>
                        <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width/2 -70, backgroundColor: COLORS.light,
                          borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: COLORS.white, borderWidth: 2}}
                          source={ { uri : DOMAIN_NAME+ brand.image}}/>
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.green}}>{brand.title}</Text>

                    <View style={{
                        justifyContent: 'space-between',
                        marginTop: 5,
                        flex: 3
                    }}>
                        <Text style={{ fontSize: 14, fontWeight: '400',  color: COLORS.green}}>{brand.description}</Text>
                        
                    </View>
                    <View style={{ flex: 1}}>
                        <TouchableOpacity onPress={() => navigation.navigate('BrandSoftwares', { brand: brand, brand_id: brand.id })} style={{
                            height: 35,
                            width: 35,
                            backgroundColor: COLORS.light_green,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf:'flex-end',
                            marginBottom: -15,
                            marginRight: -15
                        }}>
                            <Icon name='chevron-right' color={COLORS.green} size={35}/>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                    
            </View>
        )
    }

    return (
        <SafeAreaView style={{marginTop: 50}}>
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
            { !loading && <FlatList 
                style={{backgroundColor: COLORS.white, marginBottom: 30}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                ListEmptyComponent={<Text style={{
                    textAlign: 'center', fontSize: 18, fontWeight: '500', borderColor: COLORS.green, color: COLORS.green,
                    borderRadius: 5, borderWidth: 2, padding: 15, margin: 15}}>Data Not Found</Text>}
                numColumns={2} data={software_brand_list}
                renderItem={({item}) => <Card brand={item}/>}/>}
            {loading && (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 150}}>
                    <LottieView source={require('../../assets/98657-loader.json')} 
                        autoPlay loop size={150} autoSize={true} 
                        style={{width: 140, color: COLORS.white}} color={COLORS.white}/>
                </View>
            )}
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
        marginBottom: 5,
        shadowColor: COLORS.green, shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.green,
        flex: 1
    },
    sortBtn: {
        marginHorizontal: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 20,
        backgroundColor: COLORS.white,
        paddingVertical: 5,
    },
    categoryText: {
        paddingRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: COLORS.light,
        color: COLORS.dark,
        borderRadius: 8,
        paddingHorizontal: 4,
        marginHorizontal: 5
    },
    categoryTextSelected: {
        color: COLORS.white,
        backgroundColor: COLORS.green,
        borderRadius: 8,
    },
    productCard: {
        backgroundColor: COLORS.green,
        width:width - 40,
        maxHeight: 450,
        minHeight: 450,
        marginBottom: 10 ,
        marginHorizontal: 5,
        borderRadius: 10
    },
    card: {
        minHeight: 255,
        backgroundColor: COLORS.light_green,
        width: width/2 -30,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        flex: 1,
        shadowColor: COLORS.dark, shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,
    }
})