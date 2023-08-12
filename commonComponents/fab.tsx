import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const FAB = props => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {props.icon}
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
