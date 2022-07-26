import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainContainer from './navigation/MainContainer';

import { AdMobBanner } from 'expo-ads-admob';

const addmob_app_id = 'ca-app-pub-9062921533681065~1294382058'
const native_addmob_app_id = 'ca-app-pub-9062921533681065/6207797385'

export default function App() {
  const bannerError = (error) => {
    console.log('bannerError ::: '+error);
  }
  return (
    <SafeAreaView style={{ flex: 1}}>
      <MainContainer/>
      <AdMobBanner
        style={{ paddingRight: 5}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-9062921533681065/6161649636"
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(error) => bannerError(error)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addmob: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
