import { NavigatorScreenParams } from '@react-navigation/native';

//navigation
export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabsParamList>;
  PlayList: undefined;
};

export type BottomTabsParamList = {
  Home: undefined;
  LookAround: undefined;
  Storage: undefined;
};
