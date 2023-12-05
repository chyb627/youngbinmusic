import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../ui/Icons';
import { useRootNavigation } from '../../navigation/RootNavigation';

const BottomTab = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      <BottomItem name="home" title="홈" screen="Home" />
      <BottomItem name="compass" title="둘러보기" screen="LookAround" />
      <BottomItem name="musical-notes" title="보관함" screen="Storage" />
    </View>
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
      <Icon name={name} color="#fff" size={24} />
      <Text style={styles.bottomItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  bottomItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomItemText: {
    color: '#fff',
    fontSize: 10,
  },
});

export default BottomTab;
