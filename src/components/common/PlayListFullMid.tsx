import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { PlaybackState, State, Track, useProgress } from 'react-native-track-player';
import { Icon } from '../ui/Icons';
import Slider from '@react-native-community/slider';
import { Spacer } from '../ui/Spacer';

interface PlayListFullMidProps {
  playlistAnimation: Animated.Value;
  track: Track;
  playBackState:
    | PlaybackState
    | {
        state: undefined;
      };
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  togglePlayback: (
    playback:
      | PlaybackState
      | {
          state?: undefined;
        },
  ) => Promise<void>;
}

const { height, width } = Dimensions.get('window');
const PlayListFullMid: React.FC<PlayListFullMidProps> = ({
  playlistAnimation,
  track,
  playBackState,
  skipToNext,
  skipToPrevious,
  togglePlayback,
}) => {
  const { position, duration } = useProgress();

  const handleSlidingComplete = (value: number) => {
    // console.log('value', value);
    TrackPlayer.seekTo(value);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: playlistAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [0, 0, 250],
          }),
          marginLeft: playlistAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [-(width * 0.3), -(width * 0.2), -(width * 0.2)],
          }),
          opacity: playlistAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [0, 0, 1],
          }),
        },
      ]}>
      {/* info */}
      <View style={styles.contentsContainer}>
        <Icon name="thumbs-down-outline" color="white" size={18} />

        <View style={styles.textContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {track?.title}
          </Text>
          <Text style={styles.textArtist}>{track?.artist}</Text>
        </View>

        <Icon name="thumbs-up-outline" color="white" size={18} />
      </View>

      {/* 슬라이더 */}
      <View style={styles.sliderContainer}>
        <Slider
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={handleSlidingComplete}
          thumbTintColor="#fff"
          maximumTrackTintColor="#fff"
          style={styles.sliderItem}
        />

        <View style={styles.timeContainer}>
          <Text style={styles.time}>{new Date(position * 1000).toISOString().substring(15, 19)}</Text>
          <Text style={styles.time}>{new Date((duration - position) * 1000).toISOString().substring(15, 19)}</Text>
        </View>
      </View>

      {/* 컨트롤 */}
      <View style={styles.controlContainer}>
        <View style={styles.controlButtonContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon name="play-back" size={40} color="#fff" />
          </TouchableOpacity>
          <Spacer horizontal space={24} />

          <TouchableOpacity onPress={() => togglePlayback(playBackState)}>
            <Icon name={playBackState.state === State.Playing ? 'pause' : 'play'} size={40} color="#fff" />
          </TouchableOpacity>

          <Spacer horizontal space={24} />
          <TouchableOpacity onPress={skipToNext}>
            <Icon name="play-forward" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -(width * 0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentsContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textArtist: {
    color: 'white',
    fontSize: 16,
  },
  sliderContainer: {
    width: '80%',
  },
  sliderItem: {
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
  controlContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButtonContainer: {
    flexDirection: 'row',
  },
});

export default PlayListFullMid;
