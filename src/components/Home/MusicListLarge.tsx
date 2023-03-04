import { faker } from '@faker-js/faker';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { RemoteImage } from '../ui/RemoteImage';

const { width } = Dimensions.get('window');

const MusicListLargeItem = () => {
  return (
    <View>
      <RemoteImage
        url={`https://picsum.photos/20${Math.floor(Math.random() * 10)}`}
        height={width / 2.5}
        width={width / 2.5}
      />

      <Text style={styles.itemText} numberOfLines={1}>
        {faker.music.songName()}
      </Text>
    </View>
  );
};

const MusicListLarge = () => {
  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Icon name="play-back-sharp" size={24} color="#999" />
          </View>

          <Text style={styles.newMusicText}>최신음악</Text>
        </View>

        <View style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreText}>더보기</Text>
        </View>
      </View>

      {/* Item */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}>
        {[...Array(10)].map((val, idx) => {
          return (
            <View key={`music-list-Large-item-${idx}`} style={styles.musicListItemContainer}>
              <MusicListLargeItem />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MusicListLarge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 100,
    marginRight: 10,
    padding: 3,
  },
  newMusicText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  seeMoreContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 12,
  },
  itemText: {
    color: '#fff',
    marginTop: 5,
    width: width / 2.5,
    fontSize: 13,
    height: 60,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  musicListItemContainer: {
    marginRight: 20,
  },
});
