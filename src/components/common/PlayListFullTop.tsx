import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlayListFullTopProps {
  playlistAnimation: Animated.Value;
}

const { height, width } = Dimensions.get('window');
const PlayListFullTop: React.FC<PlayListFullTopProps> = ({ playlistAnimation }) => {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          marginTop: playlistAnimation.interpolate({
            inputRange: [0, height],
            outputRange: [0, insets.top],
          }),
          height: playlistAnimation.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: ['0%', '0%', '10%'],
          }),
          opacity: playlistAnimation?.interpolate({
            inputRange: [height / 2, height],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <Animated.View
        style={[
          styles.itemContainer,
          {
            width: playlistAnimation.interpolate({
              inputRange: [0, height / 2.5, height],
              outputRange: [0, 0, width],
            }),
          },
        ]}>
        <IconItem name="chevron-down" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.buttonTextContainer, styles.activeButton]}>
            <Text style={styles.buttonText}>노래</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>동영상</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentsContainer}>
          <IconItem name="logo-rss" />
          <IconItem name="ellipsis-vertical" />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const IconItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TouchableOpacity style={styles.headerIcon}>
      <Icon name={name} color="#fff" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -(width * 0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentsContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    height: 30,
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonTextContainer: {
    backgroundColor: '#111',
    height: 30,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#ffffff90',
    fontSize: 12,
  },
  activeButton: {
    backgroundColor: '#333',
  },
});

export default PlayListFullTop;
