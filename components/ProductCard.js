import { StyleSheet, Text, View, Image } from "react-native";
import COLORS from "../sample-data/COLORS";

export default function ProductCard(props){
    const { name, description } = props
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <View style={{backgroundColor: '#eee', borderRadius: 10, overflow: 'hidden'}}>
                <View>
                    <Image
                        source={require('../assets/products/product1.jpg')}
                        style={{
                            height: 135,
                            width: 155
                        }}
                    />
                </View>
                <View style={{ padding: 10, width: 155}}>
                    <Text>{ name}</Text>
                    <Text style={{ color: '#777', paddingTop: 5}}>{ description }</Text>
                    
                    
                </View>
            </View>
        </View>
    )
}