import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RemoteImage } from '../ui/RemoteImage';

const HeaderBackground: React.FC<{ selectedCategory: number | null }> = ({ selectedCategory }) => {
  return (
    <View style={styles.container}>
      {selectedCategory === null ? (
        <LinearGradient
          start={{ x: 0.7, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.3, 0.6, 1]}
          colors={['#ffa10050', '#28bf4b20', '#11111190', '#111111']}
          style={styles.linearGradient}
        />
      ) : (
        <>
          <RemoteImage url={`https://picsum.photos/30${selectedCategory}`} height={300} />
          <LinearGradient
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 1]}
            colors={['#11111100', '#111111']}
            style={styles.imageLinearGradient}
          />
        </>
      )}
    </View>
  );
};

export default HeaderBackground;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 350,
    width: '100%',
    // backgroundColor: '#222',
  },
  linearGradient: {
    height: 350,
    opacity: 0.3,
  },
  imageLinearGradient: {
    position: 'absolute',
    height: 350,
    width: '100%',
  },
});
