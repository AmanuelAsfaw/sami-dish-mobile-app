import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions, Alert } from 'react-native';
import ProductCard from '../../components/ProductCard';
import products from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';

const width = Dimensions.get('screen').width - 40

const data = products
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
export default function TechnicianDetailScreen({ navigation }) {
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
    const back_to = () => {

        console.log('back to');
    }

    return (
        <SafeAreaView style={{marginTop: 50,}}>
            <View style={style.header}>
                <TouchableOpacity onPress={back_to()} activeOpacity={.5}>
                    <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.green}} onPress={() => Alert.alert('text')}>Sami-Dish</Text>
                </TouchableOpacity>
                
                <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#fff',
                    alignItems: 'center'
                }}>
                    <Image source={app_logo} style={{flex: 1, resizeMode: 'center'}}/>
                </View>            
            </View>
            <View style={{flex: 0, flexDirection: 'row', marginLeft: 5}}>
            <View style={style.productCard}>
                <View style={{
                    height: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    maxWidth: width -50,
                    borderRadius: 50
                }}>
                    <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width - 70, paddingHorizontal: 10, borderRadius: 150, marginLeft: 45}} source={img}/>
                </View>
                
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', paddingTop: 15}}>Your Name</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 20, fontWeight: '500', textAlign: 'center'}}>Region</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 30, fontWeight: '300', textAlign: 'center'}}>City</Text>
                
                <TouchableOpacity onPress={() => forwardToCall('+251964359872')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name='phone' size={30} color={COLORS.white}/>
                    <Text style={{color: COLORS.white, fontSize: 22, fontWeight: '500', textAlign: 'center', paddingLeft: 5}}>+251964359872</Text>
                </TouchableOpacity>
            </View>
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