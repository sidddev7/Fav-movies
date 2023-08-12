import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeMovies from './screens/movies/home';
import Favorites from './screens/movies/favorites';
import useReduxData, {useDispatcher} from './hooks/redux';
import {setSearch} from './redux/slices/movies';
import {logOutUser} from './redux/slices/user';
import WishList from './screens/movies/wishList';

export const Home = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const {users} = useReduxData();
  const dispatch = useDispatcher();
  const {loggedInUser} = users;

  const Header = props => {
    const [isSearch, setisSearch] = useState({visible: false, text: ''});
    useEffect(() => {
      const debounceTimer = setTimeout(() => {
        // Perform the search or API call here using the latest searchTerm
        if (isSearch.text !== '') {
          dispatch(setSearch(isSearch.text));
        }
      }, 500); // Adjust the debounce time as needed

      return () => {
        clearTimeout(debounceTimer);
      };
    }, [isSearch.text]);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginLeft: -10,
          paddingVertical: 10,
          paddingRight: 5,
        }}>
        {!isSearch.visible ? (
          <>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {!isEmpty(loggedInUser)
                ? `Hello @${loggedInUser.userName} `
                : 'Hello'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 60,
                justifyContent: 'space-between',
              }}>
              {!isEmpty(loggedInUser) ? (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(logOutUser());
                  }}>
                  <Icon name="logout" style={{fontSize: 20}} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}>
                  {/* <Icon name="login" style={{fontSize: 16}} /> */}
                  <Text>Login</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => setisSearch({visible: true, text: ''})}>
                <Icon name="search1" style={{fontSize: 20}} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Search Movies"
              style={{
                width: '90%',
                borderColor: 'grey',
                borderStyle: 'solid',
                borderBottomWidth: 2,
              }}
              value={isSearch.text}
              onChangeText={text => setisSearch({...isSearch, text: text})}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setisSearch({visible: false, text: ''});
                dispatch(setSearch(''));
              }}>
              <Icon name="closecircle" style={{fontSize: 20}} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={{flex: 1, padding: 5}}>
      <Tab.Navigator>
        <Tab.Screen
          name="homeMovies"
          options={props => ({
            headerTitle: titleProps => <Header {...props} {...titleProps} />,
          })}>
          {props => <HomeMovies {...props} />}
        </Tab.Screen>
        {!isEmpty(loggedInUser) && (
          <>
            <Tab.Screen name="Favorites" options={{headerShown: true}}>
              {props => <Favorites {...props} />}
            </Tab.Screen>
            <Tab.Screen name="WishList" options={{headerShown: true}}>
              {props => <WishList {...props} />}
            </Tab.Screen>
          </>
        )}
        {/* <Tab.Screen></Tab.Screen> */}
      </Tab.Navigator>
    </View>
  );
};
