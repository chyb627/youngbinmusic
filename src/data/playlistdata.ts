import { Track } from 'react-native-track-player';

export type FastSelectSongProps = {
  id: number;
  title: string;
  artist: string;
  artwork: number;
  url: number;
};

export const playListData: Track[] = [
  {
    id: 1,
    title: 'GONE',
    artist: 'Leellamarz',
    artwork: require('../assets/images/gone.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 2,
    title: 'Paint Laurent',
    artist: '김뮤지엄',
    artwork: require('../assets/images/paint_laurent.png'),
    url: require('../assets/mp3/paintlaurent.mp3'),
  },
  {
    id: 3,
    title: 'Catch(feat. Hwa Sa)',
    artist: 'Epick High',
    artwork: require('../assets/images/catch.png'),
    url: require('../assets/mp3/catch.mp3'),
  },
  {
    id: 4,
    title: '아름다워',
    artist: 'CHANGMO',
    artwork: require('../assets/images/beautiful.png'),
    url: require('../assets/mp3/beautiful.mp3'),
  },
  {
    id: 5,
    title: 'HERO(feat.미란이)',
    artist: '김뮤지엄',
    artwork: require('../assets/images/hero.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 6,
    title: "Can't Control Myself",
    artist: '태연 (TAEYEON)',
    artwork: require('../assets/images/cantcontrolmyself.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 7,
    title: '다시 걸을 때(feat. Heize, BIG Naughty)',
    artist: 'TOIL',
    artwork: require('../assets/images/rewalk.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 8,
    title: 'Throw it Away',
    artist: '김뮤지엄',
    artwork: require('../assets/images/throwitaway.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 9,
    title: '엉덩이가 큰 그녀(feat. The Quiett)',
    artist: '릴러말즈 (Leellamarz) 및 TOIL',
    artwork: require('../assets/images/bigAssGirl.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 10,
    title: 'OUT OF MY SIGHT',
    artist: 'Leellamarz',
    artwork: require('../assets/images/outofmysight.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 11,
    title: '사랑,사랑',
    artist: 'Kid Wine',
    artwork: require('../assets/images/lovelove.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
  {
    id: 12,
    title: 'Pray On Sunday(feat.윤현선,네이브,디핵)',
    artist: '파테코',
    artwork: require('../assets/images/prayonsunday.png'),
    url: require('../assets/mp3/gone.mp3'),
  },
];
