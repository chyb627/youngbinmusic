import { faker } from '@faker-js/faker';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { RemoteImage } from '../ui/RemoteImage';

const { width } = Dimensions.get('window');

const MusicListSmallItem = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftItemContainer}>
        <RemoteImage url="https://picsum.photos/50" height={50} width={50} />

        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitleText} numberOfLines={1}>
            {faker.music.songName()}
          </Text>
          <Text style={styles.itemSingerText} numberOfLines={1}>
            {faker.music.genre()}
          </Text>
        </View>
      </View>

      <View style={styles.itemIconContainer}>
        <Icon name="ellipsis-vertical-sharp" color="#fff" size={12} />
      </View>
    </View>
  );
};

const MusicListSmall = () => {
  return (
    <View>
      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextTop}>이 노래로 뮤직 스테이션 시작하기</Text>
        <Text style={styles.titleTextBottom}>빠른 선곡</Text>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.contentContainerStyle}>
        {[...Array(3)].map((val, idx) => {
          return (
            <View style={{ width: width * 0.9 }} key={`music-list-small-item-container-${idx}`}>
              {[...Array(4)].map((_, i) => {
                return <MusicListSmallItem key={`music-list-small-item-${i}`} />;
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MusicListSmall;

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleTextTop: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '200',
  },
  titleTextBottom: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  leftItemContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  itemTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  itemTitleText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 6,
  },
  itemSingerText: {
    color: '#fff',
  },
  itemIconContainer: {
    padding: 10,
    flexShrink: 1,
  },
});
