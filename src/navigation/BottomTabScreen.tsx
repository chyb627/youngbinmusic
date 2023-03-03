import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList } from '../types/types';
import { TabIcon } from '../components/ui/TabIcon';
import HomeScreen from '../screens/HomeScreen';
import LookAroundScreen from '../screens/LookAroundScreen';
import StorageScreen from '../screens/StorageScreen';
import { TypeIconName } from '../components/ui/Icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const getIconName = (): TypeIconName => {
            if (route.name === 'Home') {
              return 'home-outline';
            }
            if (route.name === 'LookAround') {
              return 'compass-outline';
            }
            return 'musical-notes-outline';
          };
          const routeIconName = getIconName();
          return <TabIcon iconName={routeIconName} iconColor={color} />;
        },
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: 'yellow',
      })}>
      <BottomTab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <BottomTab.Screen name="LookAround" component={LookAroundScreen} options={{ title: '둘러보기' }} />
      <BottomTab.Screen name="Storage" component={StorageScreen} options={{ title: '보관함' }} />
    </BottomTab.Navigator>
  );
};

export default BottomTabScreen;

export const useBotomTabNavigation = <RouteName extends keyof BottomTabsParamList>() =>
  useNavigation<BottomTabNavigationProp<BottomTabsParamList, RouteName>>();

export const useBottomTabRoute = <RouteName extends keyof BottomTabsParamList>() =>
  useRoute<RouteProp<BottomTabsParamList, RouteName>>();
