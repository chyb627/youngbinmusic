import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabsParamList>;
};

export type BottomTabsParamList = {
  Home: undefined;
  LookAround: undefined;
  Storage: undefined;
};
