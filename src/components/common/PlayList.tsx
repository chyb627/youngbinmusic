import React, { useRef } from 'react';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, View } from 'react-native';
import PlayListMini from './PlayListMini';
import usePlayer from '../../hooks/usePlayer';
import PlayListFullTop from './PlayListFullTop';
import PlayListFullBottom from './PlayListFullBottom';
import PlayListFullMid from './PlayListFullMid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlayListProps {
  playlistAnimation: Animated.Value;
}

const { height, width } = Dimensions.get('window');
const PlayList: React.FC<PlayListProps> = ({ playlistAnimation }) => {
  const insets = useSafeAreaInsets();
  const playlistRef = useRef('mini'); // 'mini', 'full'
  const { track, playBackState, skipToNext, skipToPrevious, togglePlayback } = usePlayer();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // console.log(gestureState);
        const { dy } = gestureState;
        if (playlistRef.current === 'mini') {
          playlistAnimation.setValue(-dy);
        }
        if (playlistRef.current === 'full') {
          playlistAnimation.setValue(height - dy);
        }
      },
      onPanResponderEnd: (event, gestureState) => {
        const { dy } = gestureState;

        // 위로 착 붙게
        if (dy < -100 && playlistRef.current === 'mini') {
          Animated.spring(playlistAnimation, {
            toValue: height,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'full';
        }

        // -100보다 덜 드래그 했다면(조금만 드래그 했다면) 다시 제자리로 돌아오기
        if (dy > -100 && playlistRef.current === 'mini') {
          Animated.spring(playlistAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        //아래로 착 붙게
        if (dy > 100 && playlistRef.current === 'full') {
          Animated.spring(playlistAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'mini';
        }

        // 100보다 덜 드래그 했다면(조금만 드래그 했다면) 다시 제자리로 돌아오기
        if (dy < 100 && playlistRef.current === 'full') {
          Animated.spring(playlistAnimation, {
            toValue: height,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <>
      {track && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.container,
            {
              marginTop: playlistAnimation.interpolate({
                inputRange: [0, height / 2, height],
                outputRange: [0, -(114 + insets.top), -(114 + insets.top)],
              }),
              height: playlistAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [60, 160],
              }),
              paddingLeft: playlistAnimation.interpolate({
                inputRange: [0, height],
                outputRange: [10, width * 0.2],
              }),
            },
          ]}>
          <View style={styles.playlistFullContainer}>
            {/* 플레이 리스트 Full Top */}
            <PlayListFullTop playlistAnimation={playlistAnimation} />

            {/* Image */}
            <Animated.View
              style={[
                {
                  width: playlistAnimation.interpolate({
                    inputRange: [0, height / 2, height],
                    outputRange: [50, width * 0.6, width * 0.6],
                  }),
                  height: playlistAnimation.interpolate({
                    inputRange: [0, height / 2, height],
                    outputRange: [50, width * 0.6, width * 0.6],
                  }),
                },
              ]}>
              <Image source={{ uri: track.artwork }} style={styles.image} />
            </Animated.View>

            {/* 플레이 리스트 Full Mid */}
            <PlayListFullMid
              playlistAnimation={playlistAnimation}
              track={track}
              playBackState={playBackState}
              skipToNext={skipToNext}
              skipToPrevious={skipToPrevious}
              togglePlayback={togglePlayback}
            />
          </View>

          {/* 플레이 리스트 미니 */}
          <PlayListMini
            playlistAnimation={playlistAnimation}
            track={track}
            playBackState={playBackState}
            skipToNext={skipToNext}
            skipToPrevious={skipToPrevious}
            togglePlayback={togglePlayback}
          />

          {/* Bottom */}
          <PlayListFullBottom playlistAnimation={playlistAnimation} />
        </Animated.View>
      )}
    </>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 0,
  },
  playlistFullContainer: {
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
