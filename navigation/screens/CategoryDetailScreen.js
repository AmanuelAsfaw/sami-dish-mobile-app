import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import products from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import { DOMAIN_NAME, FETCH_HOME_PRODUCT_LIST } from '../../sample-data/constants';
import LottieView from 'lottie-react-native'

const width = Dimensions.get('screen').width

const data = products
const app_logo = require('../../assets/app.png')
export default function CategoryScreen({ navigation, route }) {
    console.log(route.params)
    const { category_data, category_list, category_id } = route.params
    const [categoryIndex, setCategoryIndex] = React.useState(category_id)
    const [loading, setLoading] = React.useState(false)
    const [product_list, setProductList] = React.useState([])
        
    console.log(categoryIndex);
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getProductList()
        if(category_id || categoryIndex !== category_id){
            setCategoryIndex(category_id)
        }
      }, [navigation])
    
    React.useEffect(()=> {
        getProductList()
    }, [categoryIndex])

    React.useEffect(() => {
        console.log('category_id changed'+ category_id)
        console.log('category_id from route changed'+ route.params)
        console.log(route.params)
        if(category_id || categoryIndex !== category_id){
            setCategoryIndex(category_id)
        }
    }, [category_id])

    async function getProductList(){
        setLoading(true)
        axios.get(FETCH_HOME_PRODUCT_LIST+categoryIndex)
        .then((response) => {
            // console.log(response)
            // console.log('Product list featch response ')
            if(response.data &&  response.status && response.data.success){
            //   console.log(response.data.products_data)
              setLoading(false)
              setProductList(response.data.products_data)
            }
        })
        .catch((error) => {
            console.log('Error: Product list feath error')
            setLoading(false)
            console.log(error.message)
        })
    }
    const CategoryList = () => {
        return (
            <View style={style.categoryContainer}>
                <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
                    {category_list.map((item,index) => (
                        <TouchableOpacity key={index} onPress={() => setCategoryIndex(item.id)} activeOpacity={.9}>
                            <Text key={index} style={[style.categoryText, categoryIndex == item.id && style.categoryTextSelected]}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }
    const Card = ({product}) => {
        var image_uri;
        if(product.product_file_set.length > 0){
            image_uri = { uri: DOMAIN_NAME + product.product_file_set[0].file }
        }else{
            image_uri = require('../../assets/notfound.jpg')
        }
        return (
            <View>
                <View style={style.card}>
                    <View style={{ height: 100, alignItems: 'center'}}>
                        <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width/2 -70}} source={image_uri}/>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10}}>{product.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{ fontSize: 19, fontWeight: '300'}}>{product.price} ETB</Text>
                    </View>
                    <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', product)} style={{
                            height: 35,
                            width: 35,
                            backgroundColor: COLORS.green,
                            borderRadius: 2.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf:'flex-end'
                        }}>
                            <Icon name='shopping-cart' color={COLORS.white} size={30}/>
                        </TouchableOpacity>
                    </View>
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
            <View style={{marginTop: 1, flexDirection: 'row', backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 5}}>
                <View style={style.searchContainer}>
                    <Icon name='search' size={25} style={{marginLeft: 5}} color={COLORS.green}/> 
                    <TextInput placeholder={'Search from '+ category_data.title} style={style.input} placeholderTextColor={COLORS.light_green}/>
                </View>
                <View style={style.sortBtn}>
                    <Icon name='sort' size={30} color={COLORS.white}/>
                </View>
            </View>
            <CategoryList/>
            {!loading &&(<FlatList 
                style={{backgroundColor: COLORS.white, marginBottom: 150}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                numColumns={2} data={product_list} 
                renderItem={({item}) => <Card product={item}/>}
                ListEmptyComponent={<Text style={{
                    textAlign: 'center', fontSize: 18, fontWeight: '500', borderColor: COLORS.green, color: COLORS.green,
                    borderRadius: 5, borderWidth: 2, padding: 15, margin: 15}}>Data Not Found</Text>}
                />)}
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
        paddingLeft: 2,
        paddingVertical: 5,
    },
    categoryText: {
        paddingRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: COLORS.light,
        color: COLORS.dark,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        paddingVertical: 3
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
        height: 255,
        backgroundColor: COLORS.light,
        width: width/2 -30,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    }
})