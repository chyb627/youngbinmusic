import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../ui/Icons';
import { useRootNavigation } from '../../navigation/RootNavigation';

interface BottomTabProps {
  playlistAnimation?: Animated.Value;
}

const BOTTOM_HEIGHT = 50;
const { height } = Dimensions.get('window');
const BottomTab: React.FC<BottomTabProps> = ({ playlistAnimation }) => {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{
        marginBottom: playlistAnimation?.interpolate({
          inputRange: [0, height / 2, height],
          outputRange: [0, -(BOTTOM_HEIGHT + insets.bottom), -(BOTTOM_HEIGHT + insets.bottom)],
        }),
      }}>
      <View style={[styles.container, { marginBottom: insets.bottom }]}>
        <BottomItem name="home" title="홈" screen="Home" />
        <BottomItem name="compass" title="둘러보기" screen="LookAround" />
        <BottomItem name="musical-notes" title="보관함" screen="Storage" />
      </View>
    </Animated.View>
  );
};

interface BottomItemProps {
  name: string;
  title: string;
  screen: 'Home' | 'LookAround' | 'Storage' | 'PlayList';
}

const BottomItem: React.FC<BottomItemProps> = ({ name, title, screen }) => {
  const navigation = useRootNavigation();
  return (
    <TouchableOpacity
      style={styles.bottomItemContainer}
      onPress={() => {
        navigation.navigate(screen);
      }}>
      <View style={styles.iconContainer}>
        <Icon name={name} color="#fff" size={24} />
      </View>

      <Text style={styles.bottomItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: BOTTOM_HEIGHT,
  },
  bottomItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 4,
  },
  bottomItemText: {
    color: '#fff',
    fontSize: 10,
  },
});

export default BottomTab;
