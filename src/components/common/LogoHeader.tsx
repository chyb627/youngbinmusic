import React from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { Header } from '../ui/Header/Header';

interface LogoHeaderProps {
  headerAnimation: Animated.Value;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ headerAnimation }) => {
  // interpolate 함수는 입력범위(inputRange)와 출력범위(outputRange)를 기반으로 주어진 입력값에 대한 출력 값을 계산하는 함수이다.
  // inputRange는 interpolate함수에 전달되는 값의 범위를 나타낸다.
  // 예를들면 스크롤위치, 시간, 숫자...
  // inputRange 배열의 값은 입력 값의 최소 및 최대 범위를 정의하며, 이 범위 내의 값이 interpolate 함수에 전달된다.
  // outputRange는 inputRange에 대응하는 출력 값의 범위를 나타낸다.

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

const IconItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TouchableOpacity>
      <View style={styles.headerIcon}>
        <Icon name={name} color="#fff" size={20} />
      </View>
    </TouchableOpacity>
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
