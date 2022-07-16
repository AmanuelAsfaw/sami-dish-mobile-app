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
                <TouchableOpacity activeOpacity={.5}>
                    <Text style={{fontSize: 28, fontWeight: 'bold', color: COLORS.green}}>Sami-Dish</Text>
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
            <View style={{flex: 0, flexDirection: 'row', margin: 5}}>
            <View style={style.productCard}>
                <TouchableOpacity style={{backgroundColor: COLORS.green, margin: 5, width: 40}} activeOpacity={.7}
                    onPressOut={() => {
                        navigation.navigate('RegionTechnicians', { city_id: technician.city.id, region_id: technician.region.id})
                        }}>
                    <Icon name='chevron-left' color={COLORS.white} size={35}/>
                </TouchableOpacity>
                <View style={{
                    height: width -48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    width: width -48,
                    borderRadius: width -48,
                    borderWidth: 1,
                    alignSelf: 'center',
                    borderColor: COLORS.white,
                    padding: 1,
                }}>
                    <Image style={{ flex: 1, resizeMode: 'contain', width: width - 50, height: width - 50,
                        borderRadius: width - 50, borderWidth: .51, borderColor: COLORS.white}} 
                        source={{uri : DOMAIN_NAME + technician.photo}}/>
                </View>
                
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', paddingTop: 15}}>{technician.first_name +' '+ technician.middle_name}</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 20, fontWeight: '500', textAlign: 'center'}}>{technician.region? technician.region.title: ''}</Text>
                <Text style={{color: COLORS.white, fontSize: 18, marginTop: 30, fontWeight: '300', textAlign: 'center'}}>{technician.city? technician.city.title: ''}</Text>
                
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
        height: Dimensions.get('window').height - 160,
        marginBottom: 10 ,
        marginLeft: 15,
        borderRadius: 10
    }
})