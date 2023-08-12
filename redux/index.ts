import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './slices/user';
import movies from './slices/movies';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['movies'],
};
const rootReducers = combineReducers({
  users: user,
  movies: movies,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
