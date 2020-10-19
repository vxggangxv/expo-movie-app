import React from 'react';
import { Text, View } from 'react-native';

function Detail({ route: params }) {
  // console.log(props, 'props');
  const { isTv, id, title, backgroundImage, poster, votes, overview } = params;
  console.log(params, 'params');
  return (
    <View>
      <Text>This is Detail</Text>
    </View>
  );
}

export default Detail;
