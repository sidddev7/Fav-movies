import {
  View,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {CSSProperties} from 'react';

interface propTypes {
  loading: boolean;
  size: number;
}
export default function Loader(props: propTypes) {
  const {loading} = props;
  return <ActivityIndicator size={props.size || 20} animating={loading} />;
}
