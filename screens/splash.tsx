/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Loader from '../commonComponents/loader';
import {useDispatch, useSelector} from 'react-redux';
import useAsyncStorage from '../hooks/useAsyncStorage';
import useReduxData from '../hooks/redux';
import {colors} from '../colors';

export default function SplashScreen({navigation}: any) {
  const {users} = useReduxData();
  const {loggedInUser} = users;
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
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
      }}>
      <View
        style={{
          borderColor: colors.secondary2,
          borderWidth: 2,
          flex: 1,
          width: '100%',
          borderRadius: 30,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.secondary2, fontSize: 16}}>
          App is Loading, please wait...
        </Text>
        <Loader key="splashScreenLoader" loading size={30} />
      </View>
    </View>
  );
}
