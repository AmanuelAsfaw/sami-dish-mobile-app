import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import products from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('screen').width - 40

const data = products
const app_logo = require('../../assets/app.png')
export default function HomeScreen({ navigation }) {
    const category_list = ['All', 'Cable', 'Dish', 'Tv', 'Reciever','one', 'Cable', 'Dish', 'Tv', 'Reciever','two', 'Cable', 'Dish', 'Tv', 'Reciever']
    const [categoryIndex, setCategoryIndex] = React.useState(0) 

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

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
            {/* <CategoryList/> */}
            <View style={{flex: 0, flexDirection: 'row', marginLeft: 5, marginTop: 20}}>
                <ScrollView horizontal={true}>
                    {data.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Category', {product:item, categoryIndex: index})}>
                            <View style={style.productCard}>
                                <Text style={{ paddingLeft: 20, paddingTop: 20, fontWeight: '300', color: COLORS.white, fontSize: 22}}>{item.category}</Text>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 40, color: COLORS.white}}>{item.name}</Text>
                                <View style={{
                                    height: 150,
                                    alignItems: 'center',
                                    marginTop: 50,
                                    maxWidth: width -50
                                }}>
                                    <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width - 70, paddingHorizontal: 10}} source={item.img}/>
                                </View>
                                <Text style={{ paddingHorizontal: 10, color: COLORS.white, fontSize: 18, marginTop: 20, fontWeight: '500'}}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>                        
                    ))}
                </ScrollView>
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
        maxHeight: 500,
        minHeight: 500,
        marginBottom: 10 ,
        marginHorizontal: 5,
        borderRadius: 10
    }
})