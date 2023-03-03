import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CategoryList from '../components/Home/CategoryList';
import HeaderBackground from '../components/Home/HeaderBackground';
import MusicListMedium from '../components/Home/MusicListMedium';
import MusicListSmall from '../components/Home/MusicListSmall';
import { Header } from '../components/ui/Header/Header';
import { Icon } from '../components/ui/Icons';

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

      <CategoryList onPressCategory={onPressCategory} selectedCategory={selectedCategory} />

      <ScrollView style={styles.musicListContainer}>
        <MusicListSmall />

        <MusicListMedium />
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
  musicListContainer: {},
});
