import { faker } from '@faker-js/faker';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../ui/Icons';

const PlayListMini = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.songNameText} numberOfLines={1}>
          {faker.music.songName()}
        </Text>
        <Text style={styles.singerText} numberOfLines={1}>
          {faker.music.genre()}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.iconContainer}>
            <Icon name="play" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.iconContainer}>
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayListMini;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  songNameText: {
    color: '#ddd',
  },
  singerText: {
    color: '#fff',
  },
});
