import React, { useCallback } from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet, Dimensions, ScrollView, Linking, Alert, TouchableOpacity, Clipboard} from 'react-native';
import { SliderBox } from "react-native-image-slider-box"
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../sample-data/COLORS';
import { DOMAIN_NAME } from '../../sample-data/constants';

const width = Dimensions.get('screen').width

const app_logo = require('../../assets/app.png')

const ProductDetailScreen = ({navigation, route}) => {
  const {product, category_list} = route.params;
  console.log(route.params);
  const tg_username = 'namingishard' 
  const [quantity, setQuantity] = React.useState(1)
  const [imageList, setImageList] = React.useState([])

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation])

  React.useEffect(() => {
    if(product && product.product_file_set && product.product_file_set.length){
      const images = []
      product.product_file_set.forEach(element => {
        images.push(DOMAIN_NAME + element.file)
      })
      setImageList(images)
    }
  }, [product])

  const forwardToTelegram = useCallback(async() => {
    const text = product.title + ' \n'+ 'Quantity: '+quantity+'\n'+ 'Total Price: '+(product.price * quantity)
    const url = "https://t.me/samidish_info/url?new&text=asd"
    const supported = await Linking.canOpenURL(url)
    if(supported){
      Clipboard.setString(text)
      await Linking.openURL(url)
    }
    else{
      Alert.alert('Url Open Error : '+url)
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
      <TouchableOpacity style={{backgroundColor: COLORS.white, width: 40}} activeOpacity={.7}
          onPressOut={() => {
              navigation.navigate('Category', {category_data: product.category, category_list, category_id: product.category.id})
              }}>
          <Icon name='chevron-left' color={COLORS.green} size={35}/>
        </TouchableOpacity>
      <View style={style.imageContainer}>
        
        <SliderBox 
          images={
            product?
              product.product_file_set.map((product_file) =>  DOMAIN_NAME + product_file.file)
            :[
              require('../../assets/app.png'),
              require('../../assets/app.png')
            ]
          }/>
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
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{product.title}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {product.price} ETB
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
            {product.description}
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
              <TouchableOpacity style={style.borderBtn} 
                onPress={() => {
                  if(quantity > 0){
                    setQuantity(quantity - 1)
                  }
                }}
                disabled={ quantity > 0? false : true}>
                <Text style={style.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                {quantity}
              </Text>
              <TouchableOpacity style={style.borderBtn} onPress={() => setQuantity(quantity+1)}>
                <Text style={style.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[style.buyBtn, quantity < 1? style.disabledBuyBtn: {}]} onPress={() => forwardToTelegram()} disabled={quantity < 1}>
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
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    shadowColor: COLORS.dark,
    shadowOpacity: .8,
    shadowOffset: { width: 45, height: 45},
    elevation: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 10,
    paddingTop: 30,
    // shadowColor: '#00c04b',
    shadowColor: COLORS.dark,
    shadowOpacity: .8,
    shadowOffset: { width: 45, height: 45},
    elevation: 10,
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
    borderColor: COLORS.light,
    borderWidth: 2
  },
  priceTag: {
    backgroundColor: COLORS.green,
    minWidth: 80,
    paddingRight: 5,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  disabledBuyBtn : {
      borderColor: COLORS.white,
      borderWidth: 2,
      shadowColor: '#00c04b',
      shadowOpacity: .8,
      shadowOffset: { width: 45, height: 45},
      elevation: 10,
      backgroundColor: COLORS.light
  }
});

export default ProductDetailScreen;