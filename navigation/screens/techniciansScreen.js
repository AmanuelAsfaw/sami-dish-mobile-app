import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { DOMAIN_NAME, FETCH_TECHNICIANS_LIST } from '../../sample-data/constants';

import LottieView from 'lottie-react-native';

const width = Dimensions.get('screen').width

const app_logo = require('../../assets/app.png')

export default function TechniciansScreen({ navigation, route }) {
    const { city_id, region_id } = route.params
    const [location, setLocation] = React.useState({ key: null, label: null}) 
    const [loading, setLoading] = React.useState(false)
    const [technician_list, setTechnicianList] = React.useState([])
    const [city_data, setCityData] = React.useState([])
    const [region_list, setRegionList] = React.useState([])
    const [cityFilterKey, setCityFilterKey] = React.useState('')
    const [technicianFilterKey, setTechnicianFilterKey] = React.useState(0)


    const [modalVisible, setModalVisible] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false})
      }, [navigation])
    
    React.useEffect(() => {
        getTechnicianList()
    }, [city_id])

    async function getTechnicianList(){
        setLoading(true)
        axios.get(FETCH_TECHNICIANS_LIST+city_id)
        .then((response) => {
            if(response.data &&  response.status && response.data.success){
              setLoading(false)
              setTechnicianList(response.data.technician_data)
              
              setCityData(response.data.city_data)
            }
        })
        .catch((error) => {
            setLoading(false)
        })
      }
  
    const Card = ({technician}) => {
        
        return (
            <View>
                <TouchableOpacity style={style.card} onPress={() => {navigation.navigate('TechnicianDetail', technician)}}>
                    <View style={{ height: width/2 -65, width: width/2 -65, alignItems: 'center', justifyContent: 'center', borderRadius: width/2}}>
                        <Image style={{ flex: 1, resizeMode: 'contain',
                            width: width/2 -70, height: width/2 -70, backgroundColor: COLORS.light,
                            borderRadius: width/2 - 70, borderColor: COLORS.white, borderWidth: 2}} source={ { uri : DOMAIN_NAME+technician.photo}}/>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.green}}>{technician.first_name+ ' '+technician.middle_name}</Text>
                    <View style={{
                        justifyContent: 'space-between',
                        marginTop: 5,
                        flex: 2
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.green}}>{technician.region? technician.region.title: ''}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: COLORS.green}}>{technician.city? technician.city.title: ''}</Text>
                        
                    </View>
                    <View style={{ flex: 1}}>
                    <TouchableOpacity onPress={() => navigation.navigate('TechnicianDetail', technician)} style={{
                            height: 35,
                            width: 35,
                            backgroundColor: COLORS.green,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf:'flex-end'
                        }}>
                            <Icon name='phone' color={COLORS.white} size={35}/>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{marginTop: 50, backgroundColor: COLORS.white}}>
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
            
            { !loading && <FlatList 
                style={{backgroundColor: COLORS.white, marginBottom: 70}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                ListHeaderComponent={
                    <TouchableOpacity style={{backgroundColor: COLORS.white, marginBottom: 10, width: 40}} activeOpacity={.7}
                        onPressOut={() => {
                            navigation.navigate('CityScreen', { region_id})
                            }}>
                        <Icon name='chevron-left' color={COLORS.green} size={35}/>
                    </TouchableOpacity>
                }
                ListEmptyComponent={<Text style={{
                    textAlign: 'center', fontSize: 18, fontWeight: '500', borderColor: COLORS.green, color: COLORS.green,
                    borderRadius: 5, borderWidth: 2, padding: 15, margin: 15}}>Data Not Found</Text>}
                numColumns={2} data={technician_list.filter( techni => techni.city.id == technicianFilterKey || technicianFilterKey == 0)}
                renderItem={({item}) => <Card technician={item}/>}/>}
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
        shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 15, height: 45}, elevation: 6,
        marginBottom: 5
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
        height: 300,
        backgroundColor: COLORS.light_green,
        width: width/2 -30,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        shadowColor: COLORS.dark, shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,
    },
    region_item : {
        margin: 2, backgroundColor: COLORS.light, justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10, borderRadius: 25
    },
    active_region_item : {
        backgroundColor: COLORS.green
    }
})