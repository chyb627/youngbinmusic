import { faker } from '@faker-js/faker';
import React, { useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../ui/Icons';
import { RemoteImage } from '../ui/RemoteImage';

const { width } = Dimensions.get('window');

const MusicListSmallItem = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftItemContainer}>
        <RemoteImage url={`https://picsum.photos/5${Math.floor(Math.random() * 10)}`} height={50} width={50} />

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
  const scrollRef = useRef<ScrollView>(null);
  const scrollStartRef = useRef(0);
  const pageRef = useRef(1);

  return (
    <View>
      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextTop}>이 노래로 뮤직 스테이션 시작하기</Text>
        <Text style={styles.titleTextBottom}>빠른 선곡</Text>
      </View>

      <ScrollView
        horizontal
        ref={scrollRef}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScrollBeginDrag={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          scrollStartRef.current = x;
          // console.log(x);
        }}
        onScrollEndDrag={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const dx = x - scrollStartRef.current;
          // console.log(dx);

          // 오른쪽 페이지로 붙는 애니메이션
          if (width / 4 < dx && pageRef.current !== 3) {
            // console.log('다음 페이지로 넘어가게');
            scrollRef.current?.scrollTo({
              x: width * 0.9 * pageRef.current,
              animated: true,
            });
            pageRef.current = pageRef.current + 1;
          }
          if (dx > 0 && dx < width / 4) {
            // console.log('머물기');
            scrollRef.current?.scrollTo({
              x: width * 0.9 * (pageRef.current - 1),
              animated: true,
            });
          }

          // 왼쪽 페이지로 넘어가는 애니메이션
          if (dx < -width / 4 && pageRef.current !== 1) {
            scrollRef.current?.scrollTo({
              x: width * 0.9 * (pageRef.current - 2),
              animated: true,
            });
            pageRef.current = pageRef.current - 1;
          }

          if (-width / 4 < dx && dx < 0) {
            scrollRef.current?.scrollTo({
              x: width * 0.9 * (pageRef.current - 1),
              animated: true,
            });
          }
        }}>
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
