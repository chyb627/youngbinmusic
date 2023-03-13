import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState } from 'react-native-track-player';
import { songs } from '../../data/music';
import { useRootNavigation } from '../../navigation/RootNavigation';
import { Icon } from '../ui/Icons';
import { LocalImage } from '../ui/LocalImage';

const { width } = Dimensions.get('window');

const PlayListMini = () => {
  const playbackState = usePlaybackState();
  const navigation = useRootNavigation();

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
      {/* image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          navigation.navigate('PlayList');
        }}>
        <LocalImage localAsset={require('../../assets/images/gone.png')} style={styles.image} />
      </TouchableOpacity>

      {/* text, icon */}
      <View style={styles.contentsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlayList');
          }}
          style={styles.textContainer}>
          <Text style={styles.songNameText} numberOfLines={1}>
            GONE
          </Text>
          <Text style={styles.singerText} numberOfLines={1}>
            Leellamarz
          </Text>
        </TouchableOpacity>

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
    </View>
  );
};

export default PlayListMini;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    height: width * 0.15,
  },
  imageContainer: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 1,
  },
  songNameText: {
    color: '#ddd',
  },
  singerText: {
    color: '#fff',
  },
});
