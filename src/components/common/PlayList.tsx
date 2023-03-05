import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RemoteImage } from '../ui/RemoteImage';
// import PlayListFull from './PlayListFull';
import PlayListMini from './PlayListMini';

const PlayList = () => {
  return (
    <View style={styles.container}>
      {/* <PlayListFull /> */}
      <RemoteImage url="https://picsum.photos/50" height={50} width={50} />
      <PlayListMini />
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 10,
  },
});
