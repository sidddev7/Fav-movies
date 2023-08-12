import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import SplashScreen from './screens/splash';
import {Home} from './Home';
import Login from './screens/login';
import Register from './screens/register';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {logOutUser} from './redux/slices/user';

export default function Navigator() {
  const {loggedInUser} = useSelector(state => state.users);
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const Header = props => {
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
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {!isEmpty(loggedInUser)
            ? `Hello @${loggedInUser.userName} `
            : 'Hello'}
        </Text>
        {!isEmpty(loggedInUser) ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(logOutUser());
            }}>
            <Icon name="logout" style={{fontSize: 16}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Icon name="login" style={{fontSize: 16}} />
          </TouchableOpacity>
        )}
      </View>
    );
  };
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
          options={props => ({
            headerTitle: titleProps => <Header {...props} {...titleProps} />,
          })}
          component={Home}
        />
        {!isEmpty(loggedInUser) ? (
          <></>
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
