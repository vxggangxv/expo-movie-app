import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from '../screens/Detail';
import Tabs from './Tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 5000,
//     damping: 500,
//     mass: 10,
//     overshootClamping: true,
//     restDisplacementThreshold: 5,
//     restSpeedThreshold: 5,
//   },
// };

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: 'black',
        shadowColor: 'black',
      },
      headerTintColor: '#FFFFFF',
      headerBackTitleVisible: false,
      headerBackImage: () => <Ionicons name="md-arrow-back" color={'white'} size={26} />,
      // gestureEnabled: true,
      // gestureDirection: 'horizontal',
      // transitionSpec: {
      //   open: config,
      //   close: config,
      // },
    }}
  >
    <Stack.Screen name="Tab" component={Tabs} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);
