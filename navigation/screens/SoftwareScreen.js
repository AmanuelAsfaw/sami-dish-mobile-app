import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LottieView from 'lottie-react-native';

import * as FileSystem from 'expo-file-system';

import * as Permissions from 'expo-permissions';

import axios from 'axios';
import { DOMAIN_NAME, FETCH_SOFTWARE_LIST } from '../../sample-data/constants';

const width = Dimensions.get('screen').width - 40

const app_logo = require('../../assets/app.png')

export default function SoftwaresScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')
    const [expandSoft, setExpandSoft] = React.useState(null)
    const [downloadProgressPercent, setDownloadProgress] = React.useState(0)
    const [software_list, setSoftwareList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        console.log('use effect');
        getSoftwares()
    }, [])

    async function getSoftwares(){
        setLoading(true)
        axios.get(FETCH_SOFTWARE_LIST)
        .then((response) => {
            console.log(response)
            console.log('sotware list featch response ')
            console.log(response.data)
            if(response.data &&  response.status && response.data.success){
                console.log(response.data.software_data)
                setLoading(false)
                setSoftwareList(response.data.software_data)
            }
        })
        .catch((error) => {
            console.log('Error: software list feath error')
            setLoading(false)
            console.log(error.message)
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
        getSoftwares()
      }, [navigation])
    
    const ShowDownloadIicon = ({id, link}) => {
        console.log(link)
        if(id % 3 == 0){
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView source={require('../../assets/98657-loader.json')} 
                        autoPlay loop size={50} autoSize={true} 
                        style={{width: 30, color: COLORS.white}} color={COLORS.white}/>
                        <Text style={{paddingLeft: 10, color: COLORS.white, fontSize: 18}}>{(downloadProgressPercent * 100).toFixed(2)}%</Text>
                </View>
            )
        } else if (id % 2 === 0){
            return(
                <Icon name='check-circle' size={20} color={COLORS.white} style={{borderRadius: 10}}/>
            )
        } else{
            return(
                <TouchableOpacity onPress={async() => {
                    console.log('download start')
                    await Linking.openURL(DOMAIN_NAME+link)
                    // DownloadSoftware()
                }}>
                    <Icon name='get-app' size={30} color={COLORS.white} style={{borderRadius: 10}}/>
                </TouchableOpacity>
            )
        }
    }

    const Card = ({software}) => {
        var image_uri;
        if(software.icon){
            console.log(DOMAIN_NAME + software.icon);
            image_uri = {uri: DOMAIN_NAME + software.icon}
        }else{
            var image_uri = require('../../assets/notfound.jpg')
        }
        
        if(software.id == expandSoft){
            return(
                <View style={{ flex: 1, backgroundColor: COLORS.light, paddingTop: 90, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}
                    >
                    <View style={{ 
                        maxHeight: 150, 
                        backgroundColor: COLORS.dark,
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', minWidth: width -50}} source={image_uri}/>
                    </View>  
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green, marginRight: 0, textAlign: 'center', marginVertical: 20}}>{software.title}</Text>
                        <Text style={{fontSize:16, marginRight: 20, textAlign: 'center'}}>{software.description}</Text>        
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', 
                            marginRight: 25, alignItems: 'center', minWidth: width - 150}}>
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
                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, backgroundColor: COLORS.light, marginBottom: 5, position: 'relative' } }
                    >
                    <View style={{ 
                        maxHeight: 100, 
                        // backgroundColor: COLORS.dark,
                        borderRadius: 15,
                        alignItems: 'center', 
                        justifyContent: 'center',
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain',minWidth: 80}} 
                            source={image_uri}/>
                    </View>  
                    <View style={{paddingHorizontal: 10, marginHorizontal: 0}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, }}>{software.title} s</Text>
                            <View style={{ 
                                flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', minWidth: 150}}>
                                <View style={{backgroundColor: COLORS.green, alignItems: 'flex-start', marginRight: 0, alignSelf: 'flex-start', marginVertical: 10, borderRadius: 40, padding: 5}}>
                                    <ShowDownloadIicon id={software.id} link={software.file}/>
                                </View>
                                <TouchableOpacity onPress={() => setExpandSoft(software.id)} style={{justifyContent: 'flex-end'}}>
                                    <Icon name='expand-more' size={45} color={COLORS.green}/>
                                </TouchableOpacity>
                            </View>
                            
                    </View>   
                </View>
            )
        }
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
                renderItem={({item}) => <Card software={item}/>}/>)}
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