import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LottieView from 'lottie-react-native';

import axios from 'axios';
import { DOMAIN_NAME, FETCH_SOFTWARE_LIST } from '../../sample-data/constants';

const width = Dimensions.get('window').width - 40

const app_logo = require('../../assets/app.png')

export default function SoftwaresScreen({ navigation, route }) {
    const { brand, brand_id } = route.params
    const [expandSoft, setExpandSoft] = React.useState(null)
    const [downloadProgressPercent, setDownloadProgress] = React.useState(0)
    const [software_list, setSoftwareList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        getSoftwares()
    }, [brand_id])

    async function getSoftwares(){
        setLoading(true)
        axios.get(FETCH_SOFTWARE_LIST+brand_id)
        .then((response) => {
            if(response.data &&  response.status && response.data.success){
                setLoading(false)
                setSoftwareList(response.data.software_data)
            }
        })
        .catch((error) => {
            setLoading(false)
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getSoftwares()
      }, [navigation])
    
    const ShowDownloadIicon = ({id, link}) => {
        
        if(id === -1){
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView source={require('../../assets/98657-loader.json')} 
                        autoPlay loop size={50} autoSize={true} 
                        style={{width: 30, color: COLORS.white}} color={COLORS.white}/>
                        <Text style={{paddingLeft: 10, color: COLORS.white, fontSize: 18}}>{(downloadProgressPercent * 100).toFixed(2)}%</Text>
                </View>
            )
        } else if (id === -2){
            return(
                <Icon name='check-circle' size={20} color={COLORS.white} style={{borderRadius: 10}}/>
            )
        } else{
            return(
                <TouchableOpacity onPress={async() => {
                    await Linking.openURL(DOMAIN_NAME+link)
                }}>
                    <Icon name='get-app' size={30} color={COLORS.white} style={{borderRadius: 10}}/>
                </TouchableOpacity>
            )
        }
    }

    const Card = ({software}) => {
        var image_uri;
        if(software.icon){
            image_uri = {uri: DOMAIN_NAME + software.icon}
        }else{
            var image_uri = require('../../assets/notfound.jpg')
        }
        
        if(software.id == expandSoft){
            return(
                <View style={{  paddingTop: 20, paddingHorizontal: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'center',
                flex: 1, flexDirection: 'column',
                    alignItems: 'center', margin: 5,
                    marginVertical: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    padding: 15,
                    shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,
            }}
                    >
                    <View style={{ 
                        maxHeight: 150, 
                        backgroundColor: COLORS.white,
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width -50 }} source={image_uri}/>
                    </View>  
                    <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green, marginRight: 0, textAlign: 'center', marginVertical: 20}}>{software.title}</Text>
                        <Text style={{fontSize:16, marginRight: 0, textAlign: 'center', backgroundColor: COLORS.white}}>{software.description}</Text>        
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                            maxHeight: 70, marginTop: 30, width: width - 10, paddingHorizontal: 20,
                            marginRight: 0, alignItems: 'center'}}>
                            <View style={{backgroundColor: COLORS.green, marginRight: 0, marginVertical: 10, borderRadius: 40, padding: 5, minWidth: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                <ShowDownloadIicon id={software.id} link={software.file}/>
                            </View>
                            <TouchableOpacity onPress={() => setExpandSoft(null)}>
                                <Icon name='expand-less' size={45} color={COLORS.green}/>
                            </TouchableOpacity>
                        </View>
                    </View>   
                </View>
            )
        }
        else{
            return (
                <TouchableOpacity onPress={() => setExpandSoft(software.id)} style={{ 
                    flex: 1, flexDirection: 'row',
                    alignItems: 'center', margin: 5,
                    marginVertical: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    padding: 15,
                    shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 35, height: 35}, elevation: 16,

                }}
                    >
                    <View style={{ 
                        height: 70,
                        width: 70,                        
                        borderRadius: 70,
                        alignItems: 'center', 
                        justifyContent: 'center',
                        paddingLeft: 0,
                        backgroundColor: COLORS.light_green
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', width: 60, height: 60, maxHeight: 60, borderRadius: 60, paddingLeft: 0} }
                            source={image_uri}/>
                    </View>  
                    <View style={{paddingHorizontal: 10, marginHorizontal: 0, marginRight: 70, paddingTop: 20}}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.green, justifyContent: 'space-evenly'}}>{software.title}</Text>
                            <View style={{ 
                                flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-start',
                                alignItems: 'center', minWidth: 230}}>
                                {false && (<View style={{backgroundColor: COLORS.green, alignItems: 'flex-start', marginRight: 0, alignSelf: 'flex-start', marginVertical: 10, borderRadius: 40, padding: 5}}>
                                    <ShowDownloadIicon id={software.id} link={software.file}/>
                                </View>)}
                                <TouchableOpacity onPress={() => setExpandSoft(software.id)} style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                                    <Icon name='expand-more' size={45} color={COLORS.green}/>
                                </TouchableOpacity>
                            </View>
                            
                    </View>   
                </TouchableOpacity>
            )
        }
    }

    return (
        <SafeAreaView style={{marginTop: 50, backgroundColor: COLORS.white, minHeight: 650}}>
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
            <View>
                
            {!loading && (<FlatList 
                style={{backgroundColor: COLORS.white, marginTop: 5, marginBottom: 100}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                data={software_list} 
                renderItem={({item}) => <Card software={item}/>}
                ListFooterComponent={
                    <View></View>
                }
                ListFooterComponentStyle={{ marginBottom: 50}}                
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
        shadowColor: '#00c04b', shadowOpacity: .8, shadowOffset: { width: 15, height: 15}, elevation: 6,
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