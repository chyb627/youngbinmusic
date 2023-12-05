import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BottomTab from '../components/Home/BottomTab';

const StorageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Storage</Text>

      {/* 바텀탭 */}
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});

export default StorageScreen;
