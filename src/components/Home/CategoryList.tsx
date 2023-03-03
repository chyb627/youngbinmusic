import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CategoryList: React.FC<{
  onPressCategory: (index: number) => void;
  selectedCategory: number | null;
}> = ({ onPressCategory, selectedCategory }) => {
  const category = ['휴식', '에너지 충전', '집중', '운동', '출퇴근/등하교'];

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 20,
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
