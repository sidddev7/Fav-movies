import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import SplashScreen from './screens/splash';
import {Home} from './Home';
import Login from './screens/login';
import Register from './screens/register';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {logOutUser} from './redux/slices/user';
import useReduxData from './hooks/redux';
import {TextInput} from 'react-native';
import {FormInput} from './commonComponents/textInput';
import {setSearch} from './redux/slices/movies';
import Favorites from './screens/movies/favorites';
import MovieDetails from './screens/movies/movieDetails';

export default function Navigator() {
  const {users} = useReduxData();
  const {loggedInUser} = users;
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        {!isEmpty(loggedInUser) ? (
          <>
            <Stack.Screen
              name="Details"
              options={props => ({
                title: props.route.params.movie.title,
              })}>
              {props => <MovieDetails {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
