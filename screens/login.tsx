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
import {colors} from '../colors';

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
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          borderColor: colors.secondary2,
          minHeight: 300,
          minWidth: 300,
          borderRadius: 15,
          padding: 10,
          borderWidth: 2,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
            fontSize: 25,
            color: colors.secondary2,
          }}>
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
        <PasswordInput
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
          <View
            style={{
              backgroundColor: colors.secondary2,
              padding: 10,
              marginTop: 10,
            }}>
            <Text style={{color: colors.primary, textAlign: 'center'}}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: colors.secondary2,
            }}>
            New to app? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    borderColor: colors.secondary2,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});
