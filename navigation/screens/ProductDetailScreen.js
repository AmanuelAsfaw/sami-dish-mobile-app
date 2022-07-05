import React, { useCallback } from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet, Dimensions, ScrollView, Linking, Alert, TouchableOpacity, Clipboard} from 'react-native';
import { SliderBox } from "react-native-image-slider-box"
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../sample-data/COLORS';
import { image_list } from '../../sample-data/products.js';

const width = Dimensions.get('screen').width

const app_logo = require('../../assets/app.png')

const ProductDetailScreen = ({navigation, route}) => {
  const plant = route.params;
  const tg_username = 'namingishard' 
//   const image_list_ = image_list 

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation])

  const forwardToTelegram = useCallback(async() => {
    const text = plant.name + ' \n'+ 'Quantity: '+2+'\n'+ 'Total Price: 200'
    const url = "https://t.me/Alemseged/url?new&text=asd"
    const url1 = "tg://msg?text="+text+"&to=@Alemseged"
    const supported = await Linking.canOpenURL(url)
    if(supported){
      console.log(url)
      Clipboard.setString(text)
      await Linking.openURL(url)
    }
    else{
      Alert.alert('Some Url Error : '+url)
    }
  })

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: 20
      }}>
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
      <View style={style.imageContainer}>
        <Image source={plant.img} style={{resizeMode: 'contain', flex: 1, maxWidth: width -30}} />
        {/* <SliderBox images={image_list_}/> */}
      </View>
      <ScrollView style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{plant.name}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ${plant.price}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10, marginBottom: 50}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            {plant.about}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>-</Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                1
              </Text>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View>
            </View>

            <TouchableOpacity style={style.buyBtn} onPress={() => forwardToTelegram()}>
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 10,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default ProductDetailScreen;