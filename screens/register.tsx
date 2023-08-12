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
import {saveUser} from '../redux/slices/user';

export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {userList} = useSelector(state => state.users);
  console.log(userList);
  const dispatch = useDispatch();
  const handleRegister = value => {
    dispatch(saveUser(value));
    navigation.navigate('Home');
    ToastAndroid.show('Sign up successful', 3);
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
          Register
        </Text>
        <FormInput
          key="name"
          style={{backgroundColor: 'grey', marginBottom: 20}}
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
          style={{backgroundColor: 'grey', marginBottom: 20}}
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
          style={{backgroundColor: 'grey', marginBottom: 20}}
          placeholder="Enter your User Name"
          control={control}
          name="userName"
          label="User Name"
          errors={errors.userName}
          rules={{
            required: 'User name is required',
          }}
        />

        <FormInput
          key="password"
          style={{backgroundColor: 'grey', marginBottom: 20}}
          placeholder="Enter your password"
          control={control}
          secure
          name="password"
          label="Password"
          errors={errors.password}
          rules={{required: 'Password is required'}}
        />
        <TouchableOpacity onPress={handleSubmit(handleRegister)}>
          <View style={{backgroundColor: 'blue', padding: 10, marginTop: 10}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
