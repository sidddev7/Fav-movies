// @ts-nocheck
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose your preferred icon library

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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                secureTextEntry
                style={{...style, backgroundColor: 'blue', width: '80%'}}
                placeholder={placeholder}
                multiline
                onChangeText={field.onChange}
                value={field.value}
              />
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="gray"
              />
            </View>
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
