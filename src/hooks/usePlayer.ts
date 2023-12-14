import { useState } from 'react';
import TrackPlayer, {
  Event,
  PlaybackState,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const usePlayer = () => {
  const [track, setTrack] = useState<Track | null>();
  console.log('track', track);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  // 현재상태, state = undefined / none / loading / buffering / ready / playing / paused
  const playBackState = usePlaybackState();

  // 다음 노래
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // 이전 노래
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // 재생, 일시정지
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

  // 음원 담기
  const onPressAddTrack = async (item: Track) => {
    console.log('onPressAddTrack', item);
    await TrackPlayer.skip(item.id - 1);
    await TrackPlayer.play();
  };

  return { track, playBackState, skipToNext, skipToPrevious, togglePlayback, onPressAddTrack };
};

export default usePlayer;
