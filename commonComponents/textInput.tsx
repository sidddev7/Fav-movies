// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  StyleSheet,
} from 'react-native';
import TextBox from 'react-native-password-eye';
import {colors} from '../colors';

interface formInput {
  label?: string;
  control: any;
  name: string;
  rules?: {required?: boolean | string; message?: string};
  errors?: any;
  errorMessage?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  secure?: boolean;
}

export const FormInput = ({
  label,
  control,
  name,
  rules = {required: false},
  errors,
  placeholder,
  style,
  secure = false,
}: formInput) => {
  return (
    <View>
      <Text style={{color: colors.secondary2}}>
        {label || 'No Label'}
        {rules.required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field}) => {
          return (
            <TextInput
              placeholderTextColor={colors.secondary2}
              secureTextEntry={secure}
              style={{...style, color: colors.secondary2}}
              placeholder={placeholder}
              multiline
              // w="100%"
              onChangeText={field.onChange}
              value={field.value}
            />
          );
        }}
      />
      {errors && (
        <Text style={{color: 'red', marginTop: -20}}>{errors.message}</Text>
      )}
    </View>
  );
};

export const PasswordInput = ({
  label,
  control,
  name,
  rules = {required: false},
  errors,
  placeholder,
  style,
  secure = false,
}: formInput) => {
  return (
    <View>
      <Text style={{color: colors.secondary2}}>
        {label || 'No Label'}
        {rules.required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field}) => {
          return (
            <TextBox
              inputStyle={{color: colors.secondary2}}
              eyeColor={colors.secondary2}
              secureTextEntry
              placeholderTextColor={colors.secondary2}
              containerStyles={style}
              placeholder={placeholder}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      {errors && (
        <Text style={{color: 'red', marginTop: -20}}>{errors.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
});

export default PasswordInput;
