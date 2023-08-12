import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootReducerState} from '../typescript/types';
export default function useReduxData() {
  const {movies, users} = useSelector((state: RootReducerState) => state);
  return {movies, users};
}

export const useDispatcher = () => {
  const dispatch = useDispatch();
  return dispatch;
};
