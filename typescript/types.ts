export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

export type userType = {
  id: number;
  email: string;
  password: string;
  userName: string;
  name: string;
};
export type moviesType = {
  id: number;
  adult: boolean;
  original_title: string;
  overview: string;
  title: string;
  poster_path: string;
  isFavorite: boolean;
  isWishListed: boolean;
};
export type moviesListMetaData = {
  page: number;
  total_pages: number;
  total_results: number;
};
export type myMovies = moviesType & {userId: number};
export type users = {
  loggedInUser: userType | {};
  userList: userType[];
  myMovies: myMovies[];
};
export type movies = {
  moviesList: moviesListMetaData & {
    results: moviesType[];
  };
  search: string;
};
export type RootReducerState = {
  movies: movies;
  users: users;
};
