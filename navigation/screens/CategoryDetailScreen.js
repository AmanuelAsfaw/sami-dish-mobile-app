import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import products from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('screen').width

const data = products
const app_logo = require('../../assets/app.png')
export default function CategoryScreen({ navigation }) {
    const category_list = ['All', 'Cable', 'Dish', 'Tv', 'Reciever','one', 'Cable', 'Dish', 'Tv', 'Reciever','two', 'Cable', 'Dish', 'Tv', 'Reciever']
    const [categoryIndex, setCategoryIndex] = React.useState(0) 

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    const CategoryList = () => {
        return (
            <View style={style.categoryContainer}>
                <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
                    {category_list.map((item,index) => (
                        <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)} activeOpacity={.2}>
                            <Text key={index} style={[style.categoryText, categoryIndex == index && style.categoryTextSelected]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }
    const Card = ({product}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', product)}>
                <View style={style.card}>
                    <View style={{ height: 100, alignItems: 'center'}}>
                        <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width/2 -70}} source={product.img}/>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10}}>{product.name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{ fontSize: 19, fontWeight: '300'}}>{product.price} ETB</Text>
                        
                    </View>
                    <View>
                    <View style={{
                            height: 25,
                            width: 25,
                            backgroundColor: COLORS.green,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf:'flex-end'
                        }}>
                            <Text style={{ fontSize: 22, color: COLORS.white, fontWeight: 'bold'}}>+</Text>
                        </View>
                    </View>
                    </View>
                    
            </TouchableOpacity>
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
                    <TextInput placeholder='Search' style={style.input} placeholderTextColor={COLORS.light_green}/>
                </View>
                <View style={style.sortBtn}>
                    <Icon name='sort' size={30} color={COLORS.white}/>
                </View>
            </View>
            <CategoryList/>
            <FlatList 
                style={{backgroundColor: COLORS.white, marginBottom: 150}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                numColumns={2} data={data} 
                renderItem={({item}) => <Card product={item}/>}/>
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