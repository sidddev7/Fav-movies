import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

interface propTypes {
  loading: boolean;
}
export default function Loader(props: propTypes) {
  const {loading} = props;
  return <ActivityIndicator animating={loading} />;
}
