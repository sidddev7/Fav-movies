/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import {moviesType} from '../../typescript/types';

const initialState: {moviesList: moviesType[]; search: string} = {
  moviesList: [],
  search: '',
};
function markFavorites(
  list: moviesType[],
  favoriteMovies: moviesType[],
  wishListed: moviesType[],
) {
  const updatedList = list.map(item => {
    const temp = {...item};
    if (favoriteMovies.some(favItem => favItem.id === temp.id)) {
      return {
        ...temp,
        isFavorite: true,
      };
    }
    if (
      wishListed &&
      wishListed.some(wishedMovies => wishedMovies.id === temp.id)
    ) {
      console.log('wishListed', wishListed[0].id, temp.id); // Debugging line
      return {...temp, isWishListed: true};
    }
    return {...temp};
  });

  return updatedList;
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(
      state,
      action: {
        payload: {
          list: moviesType[];
          favoriteMovies: moviesType[];
          wishListed: moviesType[];
        };
      },
    ) {
      const {list, favoriteMovies, wishListed} = action.payload;
      if (favoriteMovies.length > 0 || wishListed.length > 0) {
        const updatedList = markFavorites(list, favoriteMovies, wishListed);
        state.moviesList = updatedList;
      } else {
        state.moviesList = list;
      }
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    addFavorite(state, action) {
      console.log(action.payload);
      const movieIndex = state.moviesList.findIndex(
        (movie: moviesType) => movie.id === action.payload,
      );
      if (movieIndex !== -1) {
        state.moviesList[movieIndex] = {
          ...state.moviesList[movieIndex],
          isFavorite: true,
        };
      }
    },
    addWishList(state, action) {
      console.log(action.payload);
      const movieIndex = state.moviesList.findIndex(
        (movie: moviesType) => movie.id === action.payload,
      );
      if (movieIndex !== -1) {
        state.moviesList[movieIndex] = {
          ...state.moviesList[movieIndex],
          isWishListed: true,
        };
      }
    },
    removeFavorite(state, action: {payload: moviesType}) {
      const movieIndex = state.moviesList.findIndex(
        (movie: moviesType) => movie.id === action.payload.id,
      );
      if (movieIndex !== -1) {
        state.moviesList[movieIndex] = {
          ...state.moviesList[movieIndex],
          isFavorite: false,
        };
      }
    },
    removeWishList(state, action: {payload: moviesType}) {
      const movieIndex = state.moviesList.findIndex(
        (movie: moviesType) => movie.id === action.payload.id,
      );
      if (movieIndex !== -1) {
        state.moviesList[movieIndex] = {
          ...state.moviesList[movieIndex],
          isWishListed: false,
        };
      }
    },
  },
});

export const {
  setMovies,
  setSearch,
  addFavorite,
  removeFavorite,
  removeWishList,
  addWishList,
} = movieSlice.actions;

export default movieSlice.reducer;
