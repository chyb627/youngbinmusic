import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PlayListScreen from '../screens/PlayListScreen';
import HomeScreen from '../screens/HomeScreen';
import LookAroundScreen from '../screens/LookAroundScreen';
import StorageScreen from '../screens/StorageScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Stack.Screen name="LookAround" component={LookAroundScreen} options={{ title: '홈' }} />
      <Stack.Screen name="Storage" component={StorageScreen} options={{ title: '홈' }} />
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
