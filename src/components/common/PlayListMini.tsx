import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState } from 'react-native-track-player';
import { songs } from '../../data/music';
import { Icon } from '../ui/Icons';

const PlayListMini = () => {
  const playbackState = usePlaybackState();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
      });
    } catch (e) {}
    await TrackPlayer.add(songs);
  };

  const togglePlayback = async (state: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (state === State.Paused || state === State.Ready) {
        console.log('play');
        await TrackPlayer.play();
      } else {
        console.log('pause');
        await TrackPlayer.pause();
      }
    }
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.songNameText} numberOfLines={1}>
          {faker.music.songName()}
        </Text>
        <Text style={styles.singerText} numberOfLines={1}>
          {faker.music.genre()}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={async () => {
            togglePlayback(playbackState);
          }}>
          <View style={styles.iconContainer}>
            <Icon name={playbackState === State.Playing ? 'pause' : 'play'} size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.iconContainer}>
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayListMini;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
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
  },
  songNameText: {
    color: '#ddd',
  },
  singerText: {
    color: '#fff',
  },
});
