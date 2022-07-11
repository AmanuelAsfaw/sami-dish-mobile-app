import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import TechniciansScreen from './screens/TechniciansScreen';
import SoftwaresScreen from './screens/SoftwareScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CategoryScreen from './screens/CategoryDetailScreen';
import TechnicianDetailScreen from './screens/TechnicianDetailScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';

//Screen names
const homeName = "Home";
const newsName = "News";
const technicianName = "Technicians"
const settingsName = "Settings";
const softwaresName = 'Softwares'
const ProductDetail = 'ProductDetail'
const CetegoryName = 'Category'
const TechnicianDetail = 'TechnicianDetail'
const NewsDetail = 'NewsDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === newsName) {
              iconName = focused ? 'newspaper' : 'newspaper-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === technicianName){
                iconName = focused? 'build': 'build-outline'
            } else if (rn === softwaresName){
                iconName = focused? 'download': 'download-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={technicianName} component={TechniciansScreen} />
        <Tab.Screen name={newsName} component={NewsScreen} />
        <Tab.Screen name={softwaresName} component={SoftwaresScreen} />
        <Tab.Screen name={CetegoryName} component={CategoryScreen} 
          options={{
            tabBarVisible: false, //like this
            tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
          }}/>
        <Tab.Screen name={ProductDetail} component={ProductDetailScreen} 
          options={{
            // tabBarVisible: false, //like this
            tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
          }}/>
        <Tab.Screen name={TechnicianDetail} component={TechnicianDetailScreen} 
          options={{
            // tabBarVisible: false, //like this
            tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
          }}/>
        <Tab.Screen name={NewsDetail} component={NewsDetailScreen} 
          options={{
            // tabBarVisible: false, //like this
            tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;