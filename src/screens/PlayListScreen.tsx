import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/ui/Icons';
import { LocalImage } from '../components/ui/LocalImage';
import { Typography } from '../components/ui/Typography';
import { useRootNavigation } from '../navigation/RootNavigation';

const IconItem: React.FC<{ name: string; size?: number }> = ({ name, size = 20 }) => {
  return (
    <TouchableOpacity>
      <View style={styles.headerIcon}>
        <Icon name={name} color="#fff" size={size} />
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const PlayListScreen = () => {
  const navigation = useRootNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-down" color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.headerToggleContainer}>
          <View style={styles.singButton}>
            <Typography fontSize={14} color="#fff">
              노래
            </Typography>
          </View>

          <View style={styles.videoButton}>
            <Typography fontSize={14} color="#fff">
              동영상
            </Typography>
          </View>
        </View>

        <View style={styles.headerIconContainer}>
          <IconItem name="logo-rss" />
          <IconItem name="ellipsis-vertical" />
        </View>
      </View>

      {/* Large Image */}
      <View style={styles.imageContainer}>
        <LocalImage localAsset={require('../assets/images/gone.png')} width={width * 0.8} height={width * 0.8} />
      </View>

      {/* Contents */}
      <View style={styles.contentsContainer}>
        {/* Left Icon */}
        <IconItem name="thumbs-down-outline" />

        {/* 타이틀 및 제목 */}
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            Gone
          </Text>
          <Text numberOfLines={1} style={styles.singerText}>
            Leellamarz 및 TOIL
          </Text>
        </View>

        {/* Right Icon */}
        <IconItem name="thumbs-up-outline" />
      </View>

      {/* 타임라인 */}
      <View style={styles.timeLineContainer}>
        <View style={styles.timeLineBar} />
        <View style={styles.timeLineCircle} />

        <View style={styles.timeTextContainer}>
          <Text style={styles.timeTextStart}>0:00</Text>
          <Text style={styles.timeTextEnd}>3:45</Text>
        </View>
      </View>

      {/* Middle Play Stop Button */}
      <View style={styles.middleButtonContainer}>
        <IconItem size={24} name="ios-shuffle" />
        <IconItem size={24} name="play-skip-back-sharp" />

        <View style={styles.playIconContainer}>
          <IconItem size={28} name="play" />
        </View>

        <IconItem size={24} name="play-skip-forward-sharp" />
        <IconItem size={24} name="repeat" />
      </View>

      {/* Bottom */}
      <View style={styles.BottomContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Typography fontSize={14} color="#fff">
            다음 트랙
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Typography fontSize={14} color="#fff">
            가사
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Typography fontSize={14} color="#fff">
            관련 항목
          </Typography>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width * 0.05,
  },
  headerToggleContainer: {
    backgroundColor: '#333',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
  },
  singButton: {
    backgroundColor: '#ffffff90',
    height: 30,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 100,
  },
  videoButton: {
    paddingHorizontal: 12,
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginTop: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentsContainer: {
    marginTop: width * 0.1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  singerText: {
    marginTop: 4,
    color: '#fff',
    fontWeight: '200',
  },
  timeLineContainer: {
    marginTop: width * 0.1,
    paddingHorizontal: 30,
  },
  timeLineBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff80',
  },
  timeLineCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    marginTop: -6,
    borderRadius: 10,
  },
  timeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeTextStart: {
    color: '#fff',
  },
  timeTextEnd: {
    color: '#fff',
  },
  middleButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  playIconContainer: {
    backgroundColor: '#ffffff50',
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderRadius: 100,
  },
  BottomContainer: {
    position: 'absolute',
    width,
    height: 80,
    borderWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#555',
  },
  headerIcon: {
    marginHorizontal: 8,
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
