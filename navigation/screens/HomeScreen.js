import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import products from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import LottieView from 'lottie-react-native';

import { DOMAIN_NAME, FETCH_HOME_CATEGORY_LIST } from '../../sample-data/constants';
import product_list from '../../sample-data/products';

const width = Dimensions.get('screen').width - 40
const data = product_list

const app_logo = require('../../assets/app.png')
export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [category_list, setCategoryList] = React.useState([])

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getDataSet()
        console.log(category_list);
      }, [navigation])

    async function getDataSet(){
        setLoading(true)
        console.log(FETCH_HOME_CATEGORY_LIST)
        axios.get(FETCH_HOME_CATEGORY_LIST)
        .then((response) => {
            console.log('Home Page Category list featch response ')
            if(response.data &&  response.status && response.data.success){
              console.log(response.data.category_data)
              setLoading(false)
              setCategoryList(response.data.category_data)
        }
        })
    }

    return (
        <SafeAreaView style={{marginTop: 50,}}>
            {true&&(<View style={style.header}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.green}}>SamiDish</Text>
                <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#fff',
                    alignItems: 'center'
                }}>
                    <Image source={app_logo} style={{flex: 1, resizeMode: 'center'}}/>
                </View>            
            </View>)}
            {false&&(<View style={{marginTop: 1, flexDirection: 'row', backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 5}}>
                <View style={style.searchContainer}>
                    <Icon name='search' size={25} style={{marginLeft: 5}} color={COLORS.green}/> 
                    <TextInput placeholder='Search' style={style.input} placeholderTextColor={COLORS.light_green}/>
                </View>
                <View style={style.sortBtn}>
                    <Icon name='sort' size={30} color={COLORS.white}/>
                </View>
            </View>)}
            
            {!loading &&(<View style={{flex: 0, flexDirection: 'row', marginLeft: 5, marginTop: 20}}>
                <ScrollView horizontal={true}>
                    {category_list.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Category', {category_data:item, category_list, category_id: item.id})}>
                            <View style={style.productCard}>
                                <Text style={{ paddingLeft: 20, paddingTop: 20, fontWeight: '300', color: COLORS.white, fontSize: 22}}>{item.title}</Text>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 40, color: COLORS.white}}>{item.info}</Text>
                                <View style={{
                                    height: 250,
                                    alignItems: 'center',
                                    marginTop: 50,
                                    maxWidth: width -50
                                }}>
                                    <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width - 70, paddingHorizontal: 10}} source={{uri: DOMAIN_NAME + item.image}}/>
                                </View>
                                <Text style={{ paddingHorizontal: 10, color: COLORS.white, fontSize: 18, marginTop: 20, fontWeight: '500'}}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>                        
                    ))}
                </ScrollView>
            </View>)}

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
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center' 
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
        alignItems: 'center'       
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
        width,
        maxHeight: 550,
        minHeight: 550,
        marginBottom: 10 ,
        marginHorizontal: 5,
        borderRadius: 10
    }
})