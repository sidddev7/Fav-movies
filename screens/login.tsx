import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {
  CommonTextInput,
  FormInput,
  PasswordInput,
} from '../commonComponents/textInput';
import {setLoggedInUser} from '../redux/slices/user';
import useReduxData from '../hooks/redux';
import {userType} from '../typescript/types';

export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {users} = useReduxData();
  const {userList, loggedInUser} = users;
  console.log('loggedInUser', loggedInUser);
  const dispatch = useDispatch();
  const handleLogin = (value: userType) => {
    const user = userList.find(item => item.email === value.email);
    if (user) {
      if (user.password === value.password) {
        dispatch(setLoggedInUser(user));
      } else {
        ToastAndroid.show('Password is incorrect', 3);
      }
    } else {
      ToastAndroid.show('User not found', 3);
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          minHeight: 300,
          minWidth: 300,
          borderRadius: 15,
          padding: 10,
        }}>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 20}}>
          Login
        </Text>
        <FormInput
          key="email"
          style={styles.input}
          placeholder="Enter your email"
          control={control}
          name="email"
          label="Email"
          errors={errors.email}
          rules={{
            required: 'Email is Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          errorMessage={'Please enter your email'}
        />
        <FormInput
          key="password"
          style={styles.input}
          placeholder="Enter your password"
          control={control}
          name="password"
          label="Password"
          errors={errors.password}
          rules={{required: 'Please enter a password'}}
          errorMessage={'Please enter your password'}
        />
        <TouchableOpacity onPress={handleSubmit(handleLogin)}>
          <View style={{backgroundColor: 'blue', padding: 10, marginTop: 10}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{textAlign: 'center', marginTop: 20}}>
            New to app? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});