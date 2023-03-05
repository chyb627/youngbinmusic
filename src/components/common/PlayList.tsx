import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';
import { RemoteImage } from '../ui/RemoteImage';
// import PlayListFull from './PlayListFull';
import PlayListMini from './PlayListMini';

const { height, width } = Dimensions.get('window');
interface PlayListProps {
  playListAnimation: Animated.Value;
}

const PlayList: React.FC<PlayListProps> = ({ playListAnimation }) => {
  const playlistRef = useRef('mini'); // mini or full

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // console.log('gestureState', gestureState);
        const { dy } = gestureState;

        if (playlistRef.current === 'mini') {
          playListAnimation.setValue(-dy);
        }

        if (playlistRef.current === 'full') {
          playListAnimation.setValue(height - dy);
        }
      },
      onPanResponderEnd: (event, gestureState) => {
        const { dy } = gestureState;

        // 위로 착 붙도록
        if (dy < -100 && playlistRef.current === 'mini') {
          Animated.spring(playListAnimation, {
            toValue: height,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'full';
        }

        // 조금만 위로 올리면 제자리로 오도록
        if (dy > -100 && playlistRef.current === 'mini') {
          Animated.spring(playListAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        // 아래로 착 붙도록
        if (dy > 100 && playlistRef.current === 'full') {
          Animated.spring(playListAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'mini';
        }

        // 조금만 아래로 내리면 제자리로 오도록
        if (dy < 100 && playlistRef.current === 'full') {
          Animated.spring(playListAnimation, {
            toValue: height,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          marginTop: playListAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [0, -200, -200],
          }),
          height: playListAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [60, 160],
          }),
          paddingLeft: playListAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [10, width * 0.1, width * 0.1],
          }),
        },
      ]}>
      {/* <PlayListFull /> */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            width: playListAnimation.interpolate({
              inputRange: [0, height / 2, height],
              outputRange: [50, width * 0.8, width * 0.8],
            }),
            height: playListAnimation.interpolate({
              inputRange: [0, height / 2, height],
              outputRange: [50, width * 0.8, width * 0.8],
            }),
          },
        ]}>
        <RemoteImage url="https://picsum.photos/50" style={styles.image} />
      </Animated.View>

      <Animated.View
        style={[
          styles.playListMiniContainer,
          {
            opacity: playListAnimation.interpolate({
              inputRange: [0, height / 2],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <PlayListMini />
      </Animated.View>
    </Animated.View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  playListMiniContainer: {
    flex: 1,
  },
});
