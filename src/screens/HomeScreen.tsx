import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import CategoryList from '../components/Home/CategoryList';
import HeaderBackground from '../components/Home/HeaderBackground';
import MusicListLarge from '../components/Home/MusicListLarge';
import MusicListMedium from '../components/Home/MusicListMedium';
import MusicListSmall from '../components/Home/MusicListSmall';
import { Header } from '../components/ui/Header/Header';
import { Icon } from '../components/ui/Icons';
import useHome from '../hooks/useHome';

const IconItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TouchableOpacity>
      <View style={styles.headerIcon}>
        <Icon name={name} color="#fff" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { headerAnimation, onScroll, onScrollBeginDrag, onScrollEndDrag } = useHome();

  const onPressCategory = useCallback(
    (index: number) => {
      const data = selectedCategory === index ? null : index;
      setSelectedCategory(data);
    },
    [selectedCategory],
  );

  return (
    <View style={styles.container}>
      <HeaderBackground selectedCategory={selectedCategory} />

      {/* 헤더 */}
      <Animated.View
        style={{
          marginTop: headerAnimation.interpolate({
            inputRange: [-40, 0, 40],
            outputRange: [0, 0, -45],
          }),
          opacity: headerAnimation.interpolate({
            inputRange: [-40, 0, 20],
            outputRange: [1, 1, 0],
          }),
        }}>
        <Header>
          <Image style={styles.headerImage} source={require('../assets/images/logo.png')} />
          <View style={styles.headerIconContainer}>
            <IconItem name="logo-rss" />
            <IconItem name="search" />

            <TouchableOpacity>
              <View style={styles.headerIcon}>
                <View style={styles.userIcon}>
                  <Icon name="person-outline" color="#fff" size={20} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Header>
      </Animated.View>

      {/* 카테고리 리스트 */}
      <CategoryList
        onPressCategory={onPressCategory}
        selectedCategory={selectedCategory}
        headerAnimation={headerAnimation}
      />

      {/* 뮤직 리스트 */}
      <ScrollView
        scrollEventThrottle={1} // 스크롤 민감도, 얼마나 민감하게 스크롤을 캐치할 것인지 설정. (1~16)
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}>
        <View style={styles.musicListContainer}>
          <MusicListSmall />

          <MusicListMedium />

          <MusicListLarge />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  headerImage: {
    height: 30,
    width: 90,
  },
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    marginHorizontal: 8,
  },
  userIcon: {
    height: 30,
    width: 30,
    backgroundColor: '#555',
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  musicListContainer: {
    marginBottom: 100,
  },
});
