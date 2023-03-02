import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo } from '../actions/user';
import { AppDispatch, RootState } from '../store';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchRepoData } = useSelector((state: RootState) => state.user);
  console.log(searchRepoData);

  useEffect(() => {
    dispatch(searchRepo());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <Text className="underline">Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
