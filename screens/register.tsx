import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {
  CommonTextInput,
  FormInput,
  PasswordInput,
} from '../commonComponents/textInput';
import {saveUser, setLoggedInUser} from '../redux/slices/user';
import ReduxData from '../hooks/redux';
import useReduxData from '../hooks/redux';
import {userType} from '../typescript/types';
import {styles} from './login';
import {colors} from '../colors';

export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {users} = useReduxData();
  const {userList} = users;
  const dispatch = useDispatch();
  const handleRegister = (value: userType) => {
    console.log(userList, value);
    if (
      userList.find(
        item => item.email === value.email && item.userName === value.userName,
      )
    ) {
      return ToastAndroid.show('User already exists', 3);
    }
    dispatch(saveUser(value));
    // dispatch(setLoggedInUser(value));
    navigation.navigate('homeMovies');
    ToastAndroid.show('Sign up successful', 3);
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
            color: colors.secondary2,
            fontSize: 25,
          }}>
          Register
        </Text>
        <FormInput
          key="name"
          style={styles.input}
          placeholder="Enter your name"
          control={control}
          name="name"
          label="Name"
          errors={errors.name}
          rules={{
            required: 'Name is Required',
          }}
        />
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
        />
        <FormInput
          key="userName"
          style={styles.input}
          placeholder="Enter your User Name"
          control={control}
          name="userName"
          label="User Name"
          errors={errors.userName}
          rules={{
            required: 'User name is required',
          }}
        />

        <PasswordInput
          key="password"
          style={styles.input}
          placeholder="Enter your password"
          control={control}
          secure
          name="password"
          label="Password"
          errors={errors.password}
          rules={{required: 'Password is required'}}
        />
        <TouchableOpacity onPress={handleSubmit(handleRegister)}>
          <View
            style={{
              backgroundColor: colors.secondary2,
              padding: 10,
              marginTop: 10,
            }}>
            <Text style={{color: colors.primary, textAlign: 'center'}}>
              Register
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: colors.secondary2,
            }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
