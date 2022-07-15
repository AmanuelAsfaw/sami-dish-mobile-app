import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../sample-data/COLORS';
import { SliderBox } from "react-native-image-slider-box";

const width = Dimensions.get('screen').width - 40

const app_logo = require('../../assets/app.png')

export default function NewsDetailScreen({ navigation, route }) {
    const { news, imageList } = route.params

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation])

    return (
        <SafeAreaView style={{marginTop: 50,}}>
            <ScrollView style={{marginBottom: 0}}>
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
            
            <SliderBox images={imageList}/>
            <View style={{marginTop: 5, marginHorizontal: 30, marginVertical: 20}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.green, textAlign: 'center', marginVertical: 10}}>{news.title}</Text>
                <Text style={{}}>{news.description}</Text>
            </View>
            </ScrollView>
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