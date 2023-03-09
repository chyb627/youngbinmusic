import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomTabScreen from './BottomTabScreen';
import { RootStackParamList } from '../types/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PlayListScreen from '../screens/PlayListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabScreen} />
      <Stack.Screen
        name="PlayList"
        component={PlayListScreen}
        options={{
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() =>
  useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();

export const useRootRoute = <RouteName extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, RouteName>>();
