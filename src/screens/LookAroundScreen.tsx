import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomTab from '../components/Home/BottomTab';
import LogoHeader from '../components/common/LogoHeader';

const LookAroundScreen = () => {
  return (
    <View style={styles.container}>
      <LogoHeader />

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

export default LookAroundScreen;
