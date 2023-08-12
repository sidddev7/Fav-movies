/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: {},
  userList: [], // id, password, email,
  likedMovies: [], // userId, movieIds []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    saveUser(state, action) {
      console.log('payload', action.payload);
      const obj = {...action.payload, id: state.userList.length + 1};
      state.userList.push(obj);
    },
    logOutUser(state) {
      state.loggedInUser = {};
    },
  },
});

export const {setLoggedInUser, saveUser, logOutUser} = userSlice.actions;

export default userSlice.reducer;
