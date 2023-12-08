import { useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const useHomeScroll = () => {
  const scrollStartRef = useRef(0); // 스크롤 시작 시의 위치를 기록하는 변수
  const showHeaderRef = useRef(true); // 현재 헤더가 보이는지 여부를 나타내는 불리언 값
  const headerAnimation = useRef(new Animated.Value(0)).current; // 헤더의 애니메이션을 위한 Animated 값
  const headerBackgroundAnimation = useRef(new Animated.Value(0)).current; // 헤더 배경의 애니메이션을 위한 Animated 값

  // onScrollBeginDrag 이벤트는 사용자가 스크롤을 시작할 때 호출된다.
  // 스크롤 시작 시의 위치를 scrollStartRef에 기록한다.
  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    scrollStartRef.current = y;
  };

  // onScrollEndDrag 이벤트는 사용자가 스크롤을 끝낼 때 호출된다.
  // 사용자의 스크롤 방향에 따라 헤더의 애니메이션을 조절한다.
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;

    // 여기서 dy는 사용자가 스크롤한 방향과 거리에 따라 다른 애니메이션 효과를 주기 위해 사용된다.
    // 만약 dy가 양수이고 헤더가 현재 보이고 있다면, 이는 사용자가 아래로 스크롤하고 있는 경우이므로 헤더를 숨기는 애니메이션을 시작한다.
    // 반대로, dy가 음수이고 헤더가 현재 숨겨져 있다면, 사용자가 위로 스크롤하고 있는 경우이므로 헤더를 표시하는 애니메이션을 시작한다.
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

  // onScroll 이벤트는 스크롤이 발생할 때 호출된다.
  // 이벤트 핸들러 함수는 스크롤 위치와 관련된 정보를 인자로 받는다.
  // 스크롤 위치에 따라 헤더의 애니메이션을 업데이트 한다.
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log(e.nativeEvent); // 스크롤이 일어나면 네이티브 이벤트의 값을 받아올 수 있다.
    // console.log(e.nativeEvent.contentOffset.y); // 스크롤 y값. 아래는 양수 위는 음수로 찍힌다.
    const y = e.nativeEvent.contentOffset.y;

    // console.log(y - scrollStartRef.current); // 클릭을 한 후 얼마나 스크롤이 되었는지 체킹한다.
    // 사용자가 스크롤을 시작한 위치에서 현재 스크롤 위치까지의 수직 방향 거리를 나타낸다.
    // "dy"는 "delta y"의 약자로, 수직 방향의 변화량을 나타낸다.
    // 사용자가 스크롤하는 동안의 수직 방향의 이동 거리를 계산하기 위해 사용된다.
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

export default useHomeScroll;
