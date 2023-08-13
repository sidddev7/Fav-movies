import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useReduxData from '../hooks/redux';
import {colors} from '../colors';

export default function UserDetails() {
  const {
    users: {loggedInUser},
  } = useReduxData();
  console.log(loggedInUser);
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
      }}>
      <View
        style={{
          padding: 10,
          minHeight: 300,
          minWidth: 300,
          borderWidth: 2,
          justifyContent: 'center',
          borderStartColor: 'solid',
          borderColor: colors.secondary2,
          borderRadius: 30,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Name : {loggedInUser.name}</Text>
        <Text style={styles.text}>Email: {loggedInUser.email}</Text>
        <Text style={styles.text}>User Name: {loggedInUser.userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {fontSize: 20, fontWeight: 'bold', color: colors.secondary2},
});
