import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import CategoryList from '../components/Home/CategoryList';
import HeaderBackground from '../components/Home/HeaderBackground';
import MusicListLarge from '../components/Home/MusicListLarge';
import MusicListMedium from '../components/Home/MusicListMedium';
import MusicListSmall from '../components/Home/MusicListSmall';
import useHomeScroll from '../hooks/useHomeScroll';
import { addTrack, setupPlayer } from '../util/playerservice';
import BottomTab from '../components/common/BottomTab';
import LogoHeader from '../components/common/LogoHeader';
import PlayList from '../components/common/PlayList';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { headerAnimation, headerBackgroundAnimation, onScroll, onScrollBeginDrag, onScrollEndDrag } = useHomeScroll();
  const playlistAnimation = useRef(new Animated.Value(0)).current;

  const onPressCategory = useCallback(
    (index: number) => {
      const data = selectedCategory === index ? null : index;
      setSelectedCategory(data);
    },
    [selectedCategory],
  );

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  console.log('isPlayerReady:', isPlayerReady);

  const setup = async () => {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <View style={styles.container}>
      {/* 로고 헤더 */}
      <HeaderBackground selectedCategory={selectedCategory} headerBackgroundAnimation={headerBackgroundAnimation} />
      <LogoHeader headerAnimation={headerAnimation} />

      {/* 카테고리 리스트 */}
      <CategoryList
        onPressCategory={onPressCategory}
        selectedCategory={selectedCategory}
        headerAnimation={headerAnimation}
      />

      <ScrollView
        scrollEventThrottle={1} // 스크롤 민감도, 얼마나 민감하게 스크롤을 캐치할 것인지 설정. (1~16)
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}>
        <View style={styles.musicListContainer}>
          {/* 빠른선곡 */}
          <MusicListSmall />

          {/* 다시듣기 */}
          <MusicListMedium />

          {/* 최신음악 */}
          <MusicListLarge />
        </View>
      </ScrollView>

      {/* 플레이리스트 */}
      <PlayList playlistAnimation={playlistAnimation} />

      {/* 바텀탭 */}
      <BottomTab playlistAnimation={playlistAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  musicListContainer: {
    marginBottom: 100,
  },
});

export default HomeScreen;
