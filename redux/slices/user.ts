/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import {
  movies,
  moviesType,
  myMovies,
  userType,
  users,
} from '../../typescript/types';

const initialState: users = {
  loggedInUser: {},
  userList: [], // id, password, email,
  myMovies: [],
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
      state.loggedInUser = obj;
    },
    logOutUser(state) {
      state.loggedInUser = {};
    },
    addToList(
      state,
      action: {
        payload: {
          item: moviesType;
          user: userType;
          type: 'favorite' | 'wishlist';
        };
      },
    ) {
      const {item, user, type} = action.payload;
      const temp = [...state.myMovies];
      let obj: moviesType & {userId: number} = {};
      let index = state.myMovies.findIndex(
        movie => movie.id === item.id && movie.userId === user.id,
      );
      console.log(index);
      if (index !== -1) {
        // already exist for the logged in user
        let movie = {...state.myMovies[index]};
        if (type === 'favorite') {
          movie = {...movie, isFavorite: true};
        } else if (type === 'wishlist') {
          movie = {...movie, isWishListed: true};
        }
        state.myMovies[index] = movie;
      } else {
        if (type === 'favorite') {
          obj = {...item, userId: user.id, isFavorite: true};
        } else if (type === 'wishlist') {
          obj = {...item, userId: user.id, isWishListed: true};
        }
        temp.push(obj);
        state.myMovies = [...temp];
      }
    },
    removeFromList(
      state,
      action: {
        payload: {
          movieId: number;
          userId: number;
          type: 'favorite' | 'wishlist';
        };
      },
    ) {
      const {movieId, type, userId} = action.payload;
      const index = state.myMovies.findIndex(
        movie => movie.id === movieId && movie.userId === userId,
      );
      if (index !== -1) {
        let obj = state.myMovies[index];
        if (type === 'favorite') {
          obj.isFavorite = false;
        } else if (type === 'wishlist') {
          obj.isWishListed = false;
        }
        state.myMovies[index] = obj;
      }
    },
  },
});

export const {
  setLoggedInUser,
  saveUser,
  logOutUser,
  addToList,
  removeFromList,
} = userSlice.actions;

export default userSlice.reducer;
