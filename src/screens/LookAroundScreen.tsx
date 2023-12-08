import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomTab from '../components/common/BottomTab';
import LogoHeader from '../components/common/LogoHeader';
import useHomeScroll from '../hooks/useHomeScroll';

const LookAroundScreen = () => {
  const { headerAnimation } = useHomeScroll();

  return (
    <View style={styles.container}>
      <LogoHeader headerAnimation={headerAnimation} />

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
