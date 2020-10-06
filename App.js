import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Stack from './navigation/Stack';

// import useAsync from './hooks/useAsync';
// import useDidUpdate from './hooks/useDidUpdate';
// import getEnvVars from './environment';
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf';

const cacheImages = images =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    const images = cacheImages([
      'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80',
      require('./assets/splash.png'),
    ]);
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    return Promise.all([...images, ...fonts]);
  };
  const handleFinish = () => setIsReady(true);
  if (!isReady)
    return <AppLoading startAsync={loadAssets} onFinish={handleFinish} onError={console.error} />;
  return (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  );
}
