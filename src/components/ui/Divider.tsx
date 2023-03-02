import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Divider: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 0.5,
    marginHorizontal: 24,
    borderColor: 'gray',
  },
});
