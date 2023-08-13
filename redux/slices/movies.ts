/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import {moviesType, myMovies} from '../../typescript/types';

const initialState: {moviesList: moviesType[]; search: string} = {
  moviesList: [],
  search: '',
};
function addFavoritesandWishList(array1, array2, userId) {
  const resultArray = array1.map(obj1 => {
    const matchingObj2 = array2.find(
      obj2 => obj2.userId === userId && obj2.id === obj1.id,
    );
    return matchingObj2 ? matchingObj2 : obj1;
  });

  return resultArray;
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
          myMovies: myMovies[];
          isAppend: boolean;
          userId?: number;
        };
      },
    ) {
      const {list, myMovies, userId = null, isAppend} = action.payload;
      console.log('list, myMovies', list, myMovies, userId);

      if (myMovies.length > 0 && userId) {
        const updatedArray = addFavoritesandWishList(list, myMovies, userId);
        console.log('updatedArray', updatedArray);
        if (isAppend) {
          state.moviesList = [...state.moviesList, ...updatedArray];
        } else {
          state.moviesList = updatedArray;
        }
      } else {
        if (isAppend) {
          state.moviesList = [
            ...state.moviesList,
            ...list.map(item => ({
              ...item,
              isFavorite: false,
              isWishListed: false,
            })),
          ];
        } else {
          state.moviesList = list.map(item => ({
            ...item,
            isFavorite: false,
            isWishListed: false,
          }));
        }
      }
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    addFavorite(state, action) {
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

export const getMovieById = (state, key) =>
  state.movies.moviesList.find(movie => movie.id === key);
export default movieSlice.reducer;
