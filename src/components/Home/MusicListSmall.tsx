import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { playListData } from '../../data/playlistdata';
import { Icon } from '../ui/Icons';
import usePlayer from '../../hooks/usePlayer';
import { Track } from 'react-native-track-player';

const { width } = Dimensions.get('window');

const MusicListSmallItem: React.FC<{ item: Track }> = ({ item }) => {
  const { onPressAddTrack } = usePlayer();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onPressAddTrack(item);
      }}>
      <View style={styles.leftItemContainer}>
        <Image source={item.artwork as ImageSourcePropType} style={styles.image} />

        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitleText} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.itemSingerText} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </View>

      <View style={styles.itemIconContainer}>
        <Icon name="ellipsis-vertical-sharp" color="#fff" size={12} />
      </View>
    </TouchableOpacity>
  );
};

const MusicListSmall = () => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollStartRef = useRef(0);
  const pageRef = useRef(1);
  const numberOfColumns = 4; // 원하는 열의 수

  return (
    <View>
      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextTop}>이 노래로 뮤직 스테이션 시작하기</Text>
        <Text style={styles.titleTextBottom}>빠른 선곡</Text>
      </View>

      {/* 4x3 뮤직 리스트 */}
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
        {/**
         * numberOfColumns 변수로 행에 표시할 아이템 수를 정의함.
         * Array.from 메서드를 사용하여 행 수를 계산한다.
         * Math.ceil(playListData.length / numberOfColumns)으로 전체 아이템을 numberOfColumns로 나누고 올림하여 행 수를 계산한다.
         * idx * numberOfColumns 는 현재 행의 시작 인덱스
         * (idx + 1) * numberOfColumns 는 형재 행의 끝 인덱스
         **/}
        {Array.from({ length: Math.ceil(playListData.length / numberOfColumns) }).map((_, idx) => (
          <View style={{ width: width * 0.9 }} key={`music-list-small-item-container-${idx}`}>
            {playListData.slice(idx * numberOfColumns, (idx + 1) * numberOfColumns).map((v, i) => (
              <MusicListSmallItem key={`music-list-item-${idx}-${i}`} item={v} />
            ))}
          </View>
        ))}
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
  image: {
    height: 50,
    width: 50,
  },
});
