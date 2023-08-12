// @ts-nocheck
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleProp, Text, TextInput, TextStyle, View} from 'react-native';

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
      <Text>
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
              secureTextEntry={secure}
              style={style}
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
