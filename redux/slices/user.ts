/* eslint-disable no-param-reassign */
import {ToastAndroid} from 'react-native';
import {createSlice} from '@reduxjs/toolkit';
import {moviesType, userType, users} from '../../typescript/types';

const initialState: users = {
  loggedInUser: {},
  userList: [], // id, password, email,
  likedMovies: [], // userId, movieIds []
  wishListedMovies: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser(state, action: {payload: userType}) {
      state.loggedInUser = action.payload;
    },
    saveUser(state, action: {payload: userType}) {
      const obj = {...action.payload, id: state.userList.length + 1};
      state.userList.push(obj);
    },
    logOutUser(state) {
      state.loggedInUser = {};
    },
    addMovie(state, action: {payload: moviesType}) {
      const obj = state.likedMovies.find(m => m.id === action.payload.id);
      if (obj) {
        return;
      }
      state.likedMovies.push({...action.payload, isFavorite: true});
    },
    addWishListMovie(state, action: {payload: moviesType}) {
      const obj = state.wishListedMovies.find(m => m.id === action.payload.id);
      if (obj) {
        return;
      }
      state.wishListedMovies.push({...action.payload, isWishListed: true});
    },
    removeMovie(state, action: {payload: moviesType}) {
      state.likedMovies = state.likedMovies.filter(
        item => item.id !== action.payload.id,
      );
    },
    removeWishlistMovie(state, action: {payload: moviesType}) {
      state.wishListedMovies = state.wishListedMovies.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
});

export const {
  setLoggedInUser,
  saveUser,
  logOutUser,
  addMovie,
  removeMovie,
  removeWishlistMovie,
  addWishListMovie,
} = userSlice.actions;

export default userSlice.reducer;
