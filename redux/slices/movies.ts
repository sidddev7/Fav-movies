/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  moviesList: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action) {
      state.moviesList = action.payload;
    },
  },
});

export const {setMovies} = movieSlice.actions;

export default movieSlice.reducer;
