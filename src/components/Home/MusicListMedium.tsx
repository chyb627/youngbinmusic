import { faker } from '@faker-js/faker';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { RemoteImage } from '../ui/RemoteImage';

const { width } = Dimensions.get('window');

const MusicListMedium = () => {
  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.listenAgainText}>다시듣기</Text>

        <View style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreText}>더보기</Text>
        </View>
      </View>

      {/* Item */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}>
        {[...Array(7)].map((val, idx) => {
          return (
            <View key={`music-list-medium-item-${idx}`} style={styles.musicListItemContainer}>
              <MusicListMediumItem />
              <MusicListMediumItem />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const MusicListMediumItem = () => {
  return (
    <View>
      <RemoteImage
        url={`https://picsum.photos/20${Math.floor(Math.random() * 10)}`}
        height={width / 4}
        width={width / 4}
      />

      <View style={styles.itemIconContainer}>
        <Icon name="play" size={28} color="#fff" />
      </View>

      <Text style={styles.itemText} numberOfLines={1}>
        {faker.music.songName()}
      </Text>
    </View>
  );
};

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
  listenAgainText: {
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
    width: width / 4,
    fontSize: 13,
    height: 60,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  musicListItemContainer: {
    marginRight: 20,
  },
  itemIconContainer: {
    width: width / 4,
    height: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default MusicListMedium;
