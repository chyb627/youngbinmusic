import { useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const useHome = () => {
  const scrollStartRef = useRef(0);
  const showHeaderRef = useRef(true); // Header가 보이는지의 bool값
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const headerBackgroundAnimation = useRef(new Animated.Value(0)).current;

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    scrollStartRef.current = y;
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - scrollStartRef.current;

    // 위로 올라가는 헤더
    if (dy > 0 && showHeaderRef.current) {
      Animated.spring(headerAnimation, {
        toValue: 100,
        useNativeDriver: false,
      }).start();
      showHeaderRef.current = false;
    }

    // 아래로 내려가는 헤더
    if (dy < 0 && !showHeaderRef.current) {
      Animated.spring(headerAnimation, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      showHeaderRef.current = true;
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log(e.nativeEvent); // 스크롤이 일어나면 네이티브 이벤트의 값을 받아올 수 있다.
    // console.log(e.nativeEvent.contentOffset.y); // 아래는 양수 위는 음수로 찍힌다.
    const y = e.nativeEvent.contentOffset.y;

    // console.log(y - scrollStartRef.current); // 클릭을 한 후 얼마나 스크롤이 되었는지 체킹한다.
    const dy = y - scrollStartRef.current;

    // 위로 올라가는 헤더
    if (dy > 0 && showHeaderRef.current) {
      headerAnimation.setValue(dy);
    }

    // 아래로 내려가는 헤더
    if (dy > -40 && dy < 0 && !showHeaderRef.current) {
      headerAnimation.setValue(dy + 100);
    }

    // 헤더 백그라운드 애니메이션
    headerBackgroundAnimation.setValue(y);
  };

  return { headerAnimation, headerBackgroundAnimation, onScrollBeginDrag, onScrollEndDrag, onScroll };
};

export default useHome;
