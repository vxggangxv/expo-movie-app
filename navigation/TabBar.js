import React, { useEffect, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Button, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { Platform } from 'react-native';

export default function ({ state, descriptors, navigation, position }) {
  const platform = Platform.OS;
  let barStyle = {
    flexDirection: 'row',
  };
  if (platform === 'web') {
    barStyle = {
      ...barStyle,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#fff',
    };
  }

  return (
    <View style={barStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        // const opacity = Animated.interpolate(position, {
        //   inputRange,
        //   outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        // });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={route.key}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: '#000',
            }}
          >
            {/* <Animated.Text style={{}}>{label}</Animated.Text> */}
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
          // <Button
          //   title="Go somewhere"
          //   onPress={() => {
          //     // Navigate using the `navigation` prop that you received
          //     navigation.navigate('SomeScreen');
          //   }}
          // />
        );
      })}
    </View>
  );
}
