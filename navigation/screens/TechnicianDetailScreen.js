import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions, Alert } from 'react-native';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';
import { DOMAIN_NAME } from '../../sample-data/constants';

const width = Dimensions.get('screen').width - 40

const app_logo = require('../../assets/app.png')

export default function TechnicianDetailScreen({ navigation, route }) {
    const technician = route.params;
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    const forwardToCall = async () => {
        const args = {
            number: technician.phone, // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch(console.error)  
    }
    const back_to = () => {
        navigation.goBack('')
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
                    <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width - 70, paddingHorizontal: 10, borderRadius: 150, marginLeft: 45, borderWidth: 1, borderColor: COLORS.white}} 
                        source={{uri : DOMAIN_NAME + technician.photo}}/>
                </View>
                
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', paddingTop: 15}}>{technician.first_name +' '+ technician.middle_name}</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 20, fontWeight: '500', textAlign: 'center'}}>{technician.region.title}</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 30, fontWeight: '300', textAlign: 'center'}}>{technician.city.title}</Text>
                
                <TouchableOpacity onPress={() => forwardToCall('+251964359872')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name='phone' size={30} color={COLORS.white}/>
                    <Text style={{color: COLORS.white, fontSize: 22, fontWeight: '500', textAlign: 'center', paddingLeft: 5}}>{technician.phone}</Text>
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