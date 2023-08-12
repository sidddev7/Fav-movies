/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Loader from '../commonComponents/loader';
import {useDispatch, useSelector} from 'react-redux';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function SplashScreen({navigation}: any) {
  const {loggedInUser} = useSelector(state => state.users);
  async function prepare() {
    try {
      loggedInUser
        ? navigation?.reset({index: 0, routes: [{name: 'Home'}]})
        : navigation?.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    prepare();
  }, []);
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text>Loading...</Text>
      <Loader key="splashScreenLoader" loading />
    </View>
  );
}
