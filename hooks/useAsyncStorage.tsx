/* eslint-disable no-catch-shadow */
import React, {useEffect, useState} from 'react';
// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setData(value);
        }
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [key]);

  return {data, isLoading, error};
};

export default useAsyncStorage;
