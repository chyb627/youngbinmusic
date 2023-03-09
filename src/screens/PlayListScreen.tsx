import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/ui/Header/Header';
import { Icon } from '../components/ui/Icons';
import { useRootNavigation } from '../navigation/RootNavigation';

const PlayListScreen = () => {
  const navigation = useRootNavigation();

  return (
    <View style={styles.container}>
      <Header>
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-down" color="#fff" size={24} />
        </TouchableOpacity>
      </Header>

      <Text>PlayListScreen</Text>
    </View>
  );
};

export default PlayListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  headerContainer: {
    flex: 1,
  },
});
