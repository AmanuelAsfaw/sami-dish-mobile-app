import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import LottieView from 'lottie-react-native';

import { DOMAIN_NAME, FETCH_HOME_CATEGORY_LIST } from '../../sample-data/constants';


const width = Dimensions.get('window').width - 40
console.log(
    'screen width size'+ Dimensions.get('screen').width
);
console.log(
    'window width size'+ Dimensions.get('window').width
);
const app_logo = require('../../assets/app.png')

export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [category_list, setCategoryList] = React.useState([])

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getDataSet()
      }, [navigation])

    async function getDataSet(){
        setLoading(true)
        axios.get(FETCH_HOME_CATEGORY_LIST)
        .then((response) => {
            if(response.data &&  response.status && response.data.success){
              setLoading(false)
              setCategoryList(response.data.category_data)
        }
        })
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
            
            {!loading &&(<View style={{flex: 0, flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                <ScrollView horizontal={true}>
                    {category_list.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Category', {category_data:item, category_list, category_id: item.id})}>
                            <View style={style.productCard}>
                                <Text style={{ paddingLeft: 20, paddingTop: 20, fontWeight: '300', color: COLORS.white, fontSize: 22}}>{item.title}</Text>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 40, color: COLORS.white}}>{item.info}</Text>
                                <View style={{
                                    height: 250,
                                    alignItems: 'center',
                                    marginTop: 5,
                                    maxWidth: width -50,
                                    backgroundColor: COLORS.green,
                                    marginLeft: 25
                                }}>
                                    <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width - 70, paddingHorizontal: 10}} source={{uri: DOMAIN_NAME + item.image}}/>
                                </View>
                                <Text style={{ paddingHorizontal: 10, color: COLORS.white, fontSize: 18, marginTop: 40, fontWeight: '500', alignContent: 'center'}}>{item.description}</Text>
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
        alignItems: 'center'
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
        height: Dimensions.get('window').height - 210,
        marginBottom: 10 ,
        marginHorizontal: 5,
        borderRadius: 10
    }
})