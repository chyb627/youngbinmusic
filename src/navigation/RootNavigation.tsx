import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabScreen from './BottomTabScreen';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
