import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import BottomTab from '../components/common/BottomTab';

const StorageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Storage</Text>

      {/* 바텀탭 */}
      <BottomTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});

export default StorageScreen;
