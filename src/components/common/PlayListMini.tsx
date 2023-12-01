import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, {
  Event,
  PlaybackState,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useRootNavigation } from '../../navigation/RootNavigation';
import { Icon } from '../ui/Icons';
import { LocalImage } from '../ui/LocalImage';

const { width } = Dimensions.get('window');

const PlayListMini = () => {
  const [track, setTrack] = useState<Track | null>();
  const navigation = useRootNavigation();
  console.log('track', track);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    console.log('event::', event);
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  const playBackState = usePlaybackState();

  // Next Button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // Previous Button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: PlaybackState | { state?: undefined }) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (!playback.state || playback.state === State.Paused || playback.state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
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
