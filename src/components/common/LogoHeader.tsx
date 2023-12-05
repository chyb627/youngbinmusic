import React from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { Header } from '../ui/Header/Header';
import useHome from '../../hooks/useHome';

const IconItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TouchableOpacity>
      <View style={styles.headerIcon}>
        <Icon name={name} color="#fff" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const LogoHeader = () => {
  const { headerAnimation } = useHome();

  return (
    <>
      {/* 헤더 */}
      <Animated.View
        style={{
          marginTop: headerAnimation.interpolate({
            inputRange: [-40, 0, 100],
            outputRange: [0, 0, -45],
          }),
          opacity: headerAnimation.interpolate({
            inputRange: [-40, 0, 20],
            outputRange: [1, 1, 0],
          }),
        }}>
        <Header>
          <Image style={styles.headerImage} source={require('../../assets/images/logo.png')} />
          <View style={styles.headerIconContainer}>
            <IconItem name="logo-rss" />
            <IconItem name="search" />

            <TouchableOpacity>
              <View style={styles.headerIcon}>
                <View style={styles.userIcon}>
                  <Icon name="person-outline" color="#fff" size={20} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Header>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  headerImage: {
    height: 30,
    width: 90,
  },
  userIcon: {
    height: 30,
    width: 30,
    backgroundColor: '#555',
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default LogoHeader;
