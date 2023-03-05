import { NavigatorScreenParams } from '@react-navigation/native';

//navigation
export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabsParamList>;
};

export type BottomTabsParamList = {
  Home: undefined;
  LookAround: undefined;
  Storage: undefined;
};

//data
export type FastSelectSong = {
  title: string;
  artist: string;
  artwork: number;
  url: number;
};
