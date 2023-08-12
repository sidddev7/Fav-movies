import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import API from '../../api';

export default function HomeMovies() {
  const fetchData = async () => {
    const res = await API.get('/search');
    console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>HomeMovies</Text>
    </View>
  );
}
