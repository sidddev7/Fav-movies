import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeMovies from './screens/movies/home';
import Favorites from './screens/movies/favorites';

export const Home = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const {loggedInUser} = useSelector(state => state.users);
  return (
    <View style={{flex: 1, padding: 5}}>
      <Tab.Navigator>
        <Tab.Screen name="homeMovies">{props => <HomeMovies />}</Tab.Screen>
        {!isEmpty(loggedInUser) && (
          <Tab.Screen name="Favorites">{props => <Favorites />}</Tab.Screen>
        )}
        {/* <Tab.Screen></Tab.Screen> */}
      </Tab.Navigator>
    </View>
  );
};
