import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Loading from './components/base/Loading';
import Weather from './components/Weather';
import * as api from './api';
import useAsync from './hooks/useAsync';
import useDidUpdate from './hooks/useDidUpdate';
import getEnvVars from './environment';

export default function App() {
  const [isLoading, setIsLoading] = useState(null);
  const [values, setValues] = useState({
    latitude: null,
    longitude: null,
  });
  const { OPENWEATHER_API_KEY } = getEnvVars();
  // const [locationState, locationRefetch] = useAsync(Location.requestPermissionsAsync(), []);
  // console.log(locationState, 'locationState');
  const [weatherState, weatherRefetch] = useAsync(
    api.getWeather(values.latitude, values.longitude, OPENWEATHER_API_KEY),
    [],
  );
  const { loading, data, error } = weatherState;
  // const { data, error } = weatherState;
  // const loading = true;
  const temp = data?.main?.temp;
  const condition = data?.weather[0]?.main;

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // this.getWeather(latitude, longitude);
      setValues({
        ...values,
        latitude,
        longitude,
      });
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // useDidUpdate(() => {
  //   console.log('test');
  //   console.log(values, 'values');
  // }, [values]);

  if (!data || loading) return <Loading />;
  return (
    <Weather temp={Math.round(temp)} condition={condition} />
    // <View style={styles.container}>
    //   <Text>Working Now!</Text>
    //   <Text>{temp}</Text>
    //   <Text>{weather[0].main}</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
