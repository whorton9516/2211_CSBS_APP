import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../constants/styles';

const data = [
  { id: 10, value: 10 },
  { id: 12, value: 12 },
  { id: 15, value: 15 },
  { id: 20, value: 20 },
  { id: 25, value: 25 },
  { id: 30, value: 30 },
  { id: 35, value: 35 },
  { id: 40, value: 40 },
  { id: 45, value: 45 },
  { id: 50, value: 50 },
];

const renderItem = ({ item }) => {
  return (
    <View style={{ height: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
      <Text style={styles.text}>{item.value}</Text>
    </View>
  );
};

const ScrollingWheel = () => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      snapToInterval={10} // set the height of each item here
      decelerationRate={0} // set to 0 to disable deceleration
      snapToAlignment={'center'} // snap to the center of each item
      showsVerticalScrollIndicator={false} // hide scroll indicator
      initialNumToRender={5}

    />
  );
};

export default ScrollingWheel;