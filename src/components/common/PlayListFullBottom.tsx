import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlayListFullBottomProps {
  playlistAnimation: Animated.Value;
}

const { height, width } = Dimensions.get('window');
const PlayListFullBottom: React.FC<PlayListFullBottomProps> = ({ playlistAnimation }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: playlistAnimation.interpolate({
            inputRange: [height / 2, height],
            outputRange: [0, 140],
          }),
          opacity: playlistAnimation.interpolate({
            inputRange: [height / 2, height],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>다음트랙</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>가사</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>관련항목</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    bottom: 0,
    backgroundColor: '#444',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 50,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PlayListFullBottom;
