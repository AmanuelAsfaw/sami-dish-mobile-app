import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Clipboard, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { news_list } from '../../sample-data/products';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../../sample-data/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';

const width = Dimensions.get('screen').width - 40

const data = news_list
const app_logo = require('../../assets/app.png')
const img = require('../../assets/yonatan.jpg')
export default function SoftwaresScreen({ navigation }) {
    const [phone, setPhone] = React.useState('+251964359872')
    const [expandSoft, setExpandSoft] = React.useState(null)

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
    const ShowDownloadIicon = ({id}) => {
        if(id % 3 == 0){
            return (
                <Icon name='pending' size={40} color={COLORS.white} style={{borderRadius: 10}}/>
            )
        } else if (id % 2 === 0){
            return(
                <Icon name='save' size={40} color={COLORS.white} style={{borderRadius: 10}}/>
            )
        } else{
            return(
                <Icon name='get-app' size={40} color={COLORS.white} style={{borderRadius: 10}}/>
            )
        }
    }
    const Card = ({news}) => {
        if(news.id == expandSoft){
            return(
                <TouchableOpacity style={{ flex: 1, backgroundColor: COLORS.light, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {                        
                        setExpandSoft(null)
                    }}>
                    <View style={{ 
                        maxHeight: 150, 
                        backgroundColor: COLORS.dark,
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width -70}} source={news.img}/>
                    </View>  
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, marginRight: 0, textAlign: 'center', marginVertical: 20}}>{news.name}</Text>
                        <Text style={{fontSize:11, marginRight: 20, textAlign: 'center'}}>{news.about}</Text>        
                    <View style={{backgroundColor: COLORS.green, alignItems: 'flex-end', marginRight: 20, alignSelf: 'flex-end', marginVertical: 10, borderRadius: 40, padding: 5}}>
                        <ShowDownloadIicon id={news.id}/>
                    </View>
                    </View>   
                </TouchableOpacity>
            )
        }
        else{
            return (
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', backgroundColor: COLORS.light, marginBottom: 5}}
                    onPress={() => setExpandSoft(news.id)}>
                    <View style={{ 
                        maxHeight: 100, 
                        backgroundColor: COLORS.dark,
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
                        <Image style={{ flex: 1, resizeMode: 'contain', maxWidth: width/2 -70}} source={news.img}/>
                    </View>  
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green, marginRight: 90}}>{news.name} Softwares</Text>
                        <Text numberOfLines={4} style={{fontSize:11, marginRight: 85}}>{news.about}</Text>        
                    <View style={{backgroundColor: COLORS.green, alignItems: 'flex-end', marginRight: 90, alignSelf: 'flex-end', marginVertical: 10, borderRadius: 40, padding: 5}}>
                        <ShowDownloadIicon id={news.id}/>
                    </View>
                    </View>   
                </TouchableOpacity>
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