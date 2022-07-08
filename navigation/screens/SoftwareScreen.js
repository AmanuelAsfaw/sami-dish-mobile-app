import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions, Linking } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';

import LottieView from 'lottie-react-native';

import * as FileSystem from 'expo-file-system';

import * as Permissions from 'expo-permissions';

import * as MediaLibrary from 'expo-media-library';

// import * as Permissions from "expo-permissions";

import RNDownloadButton from 'react-native-download-button'
import { downloadToFolder } from 'expo-file-dl';
import axios from 'axios';
import { DOMAIN_NAME, FETCH_SOFTWARE_LIST } from '../../sample-data/constants';

const width = Dimensions.get('screen').width - 40

const channelId = "DownloadInfo";

const data = news_list
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
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
    
    const callback = downloadProgress => {
        const progress = 100*(downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite)
        setDownloadProgress(progress)
    }

    async function getMediaLibraryPermissions() {
        // await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    }
    
    async function getNotificationPermissions() {
        // await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    
    const DownloadSoftware = async () => {
        // const Permissions={}
        const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        const permission2 = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY)
        if( permission.status != 'granted' && permission2.status != 'granted'){
            console.log('media library permission not granted');
            return;
        }
        const filename = 'samid2.pdf'
        const fileUri =  `${FileSystem.documentDirectory}${filename}`
        const uri = 'https://sebrisat.com/wp-content/uploads/2020/03/TIGER-T8-HIGH-CLASS-V2flower_V3.8021557_20032020.bin'
        const uri2 = 'http://techslides.com/demos/sample-videos/small.mp4'
        // const down_file = await FileSystem.downloadAsync('http://www.soundczech.cz/temp/lorem-ipsum.pdf', `${FileSystem.documentDirectory}myDirectory/lorem-ipsum.pdf`)
        //                     .then(({uri}) => Linking.openURL(uri))
        
        var response_ = null

        axios.get('http://techslides.com/demos/sample-videos/small.mp4')
            .then(function (response) {
                console.log(response)
                response_ = response
            }).catch(function (error) {
                console.log(error);
            })
        
        const file_write = await FileSystem.writeAsStringAsync(filename, response_)
        console.log(file_write)
        // await downloadToFolder('http://www.soundczech.cz/temp/lorem-ipsum.pdf', filename, '../SamiFolder','sami-id')
        
        // const downloadedFile = await FileSystem.downloadAsync('https://sebrisat.com/wp-content/uploads/2020/03/TIGER-T8-HIGH-CLASS-V2flower_V3.8021557_20032020.bin', fileUri)

        // try {
        //     const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        //     const album = await MediaLibrary.getAlbumAsync('Sami-Dish');
        //     if (album == null) {
        //       await MediaLibrary.createAlbumAsync('SamiDish', asset, false);
        //     } else {
        //       await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    const ShowDownloadIicon = ({id, link}) => {
        console.log(link);
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
                    <Icon name='get-app' size={20} color={COLORS.white} style={{borderRadius: 10}}/>
                </TouchableOpacity>
            )
        }
    }

    const Card = ({software}) => {
        var image_uri;
        if(software.software_file_set.length > 0){
            // image_uri = {uri: DOMAIN_NAME + software.software_file_set[0].file}
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, marginRight: 0, textAlign: 'center', marginVertical: 20}}>{software.title}</Text>
                        <Text style={{fontSize:11, marginRight: 20, textAlign: 'center'}}>{software.description}</Text>        
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', 
                            marginRight: 25, alignItems: 'center', minWidth: width - 150}}>
                            <View style={{backgroundColor: COLORS.green, marginRight: 0, marginVertical: 10, borderRadius: 40, padding: 5, minWidth: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                <ShowDownloadIicon id={software.id} link={software.file}/>
                            </View>
                            <TouchableOpacity onPress={() => setExpandSoft(null)}>
                                <Icon name='expand-less' size={35} color={COLORS.green}/>
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
                                    <Icon name='expand-more' size={35} color={COLORS.green}/>
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