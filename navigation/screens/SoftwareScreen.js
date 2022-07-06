import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';

import LottieView from 'lottie-react-native';
import * as FileSystem from 'expo-file-system'

import RNDownloadButton from 'react-native-download-button'

const width = Dimensions.get('screen').width - 40

const data = news_list
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
export default function SoftwaresScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')
    const [expandSoft, setExpandSoft] = React.useState(null)
    const [downloadProgressPercent, setDownloadProgress] = React.useState(0)

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])
    
    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
        setDownloadProgress(progress)
    }
    const DownloadSoftware = async () => {
        FileSystem.makeDirectoryAsync('sami-dish')
        const downloadResumable = FileSystem.createDownloadResumable(
            'http://techslides.com/demos/sample-videos/small.mp4',
            FileSystem.documentDirectory+ 'small.mp4',
            {},
            callback
        )
        try{
            const data = await downloadResumable.downloadAsync()
            console.log(data);
            console.log('Finished downloading to ', data.uri);
        } catch (e) {
            console.log(e);
        }
    }

    const ShowDownloadIicon = ({id}) => {
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
                <TouchableOpacity onPress={() => {
                    console.log('download start')
                    DownloadSoftware()
                }}>
                    <Icon name='get-app' size={20} color={COLORS.white} style={{borderRadius: 10}}/>
                </TouchableOpacity>
            )
        }
    }

    const Card = ({news}) => {
        if(news.id == expandSoft){
            return(
                <View style={{ flex: 1, backgroundColor: COLORS.light, paddingTop: 90, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}
                    >
                    <View style={{ 
                        maxHeight: 150, 
                        backgroundColor: COLORS.dark,
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width -50}} source={news.img}/>
                    </View>  
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, marginRight: 0, textAlign: 'center', marginVertical: 20}}>{news.name}</Text>
                        <Text style={{fontSize:11, marginRight: 20, textAlign: 'center'}}>{news.about}</Text>        
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 25, alignItems: 'center'}}>
                            <View style={{backgroundColor: COLORS.green, marginRight: 0, marginVertical: 10, borderRadius: 40, padding: 5, minWidth: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                <ShowDownloadIicon id={news.id} />
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
                        <Image style={{ flex: 1, resizeMode: 'contain',maxWidth: 80}} source={news.img}/>
                    </View>  
                    <View style={{paddingHorizontal: 10}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, marginRight: 90}}>{news.name} Softwares</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 25, alignItems: 'center'}}>
                                <View style={{backgroundColor: COLORS.green, alignItems: 'flex-start', marginRight: 0, alignSelf: 'flex-start', marginVertical: 10, borderRadius: 40, padding: 5}}>
                                    <ShowDownloadIicon id={news.id}/>
                                </View>
                                <TouchableOpacity onPress={() => setExpandSoft(news.id)} style={{justifyContent: 'flex-end'}}>
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
                
            <FlatList 
                style={{backgroundColor: COLORS.white, marginTop: 5, marginBottom: 100}}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                    marginHorizontal: 10
                }}
                data={data} 
                renderItem={({item}) => <Card news={item}/>}/>
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