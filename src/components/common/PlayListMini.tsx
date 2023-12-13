import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { PlaybackState, State, Track } from 'react-native-track-player';

interface PlayListMiniProps {
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

const { height } = Dimensions.get('window');
const PlayListMini: React.FC<PlayListMiniProps> = ({
  playlistAnimation,
  track,
  playBackState,
  skipToNext,
  skipToPrevious,
  togglePlayback,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: playlistAnimation.interpolate({
            inputRange: [0, height / 2],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <View style={styles.textContainer}>
        <Text style={styles.songNameText} numberOfLines={1}>
          {track?.title}
        </Text>
        <Text style={styles.singerText} numberOfLines={1}>
          {track?.artist}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={skipToPrevious}>
          <View style={styles.iconContainer}>
            <Icon name="play-skip-back" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            togglePlayback(playBackState);
          }}>
          <View style={styles.iconContainer}>
            <Icon name={playBackState.state === State.Playing ? 'pause' : 'play'} size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <View style={styles.iconContainer}>
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PlayListMini;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
    flex: 1,
    justifyContent: 'center',
  },
  songNameText: {
    color: '#ddd',
  },
  singerText: {
    color: '#fff',
  },
});
