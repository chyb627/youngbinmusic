import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, FlatList, SafeAreaView } from 'react-native';

interface CategoryListProps {
  onPressCategory: (index: number) => void;
  selectedCategory: number | null;
  headerAnimation: Animated.Value;
}

const CategoryList: React.FC<CategoryListProps> = ({ onPressCategory, selectedCategory, headerAnimation }) => {
  const category = ['휴식', '에너지 충전', '집중', '운동', '출퇴근/등하교'];

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          styles.container,
          {
            borderBottomWidth: headerAnimation.interpolate({
              inputRange: [0, 40],
              outputRange: [0, 0.5],
            }),
          },
        ]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(_, index) => `category-header-${index}`}
          data={category}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPressCategory(index);
                }}>
                <View style={selectedCategory === index ? pressedCategoryStyles.itemContainer : styles.itemContainer}>
                  <Text style={selectedCategory === index ? pressedCategoryStyles.itemText : styles.itemText}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 20,
    paddingBottom: 5,
    borderBottomColor: '#444',
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffffff30',
    backgroundColor: '#ffffff20',
    marginHorizontal: 4,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  itemText: {
    color: '#fff',
  },
});

const pressedCategoryStyles = {
  itemContainer: [styles.itemContainer, { backgroundColor: '#fff' }],
  itemText: [styles.itemText, { color: '#111' }],
};
