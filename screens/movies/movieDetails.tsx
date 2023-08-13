import isEmpty from 'lodash/isEmpty';
import {default as React} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {styles} from './home';
import {moviesType} from '../../typescript/types';
import useReduxData, {useDispatcher} from '../../hooks/redux';
import {
  addMovie,
  addToList,
  removeFromList,
  removeMovie,
} from '../../redux/slices/user';
import {
  addFavorite,
  addWishList,
  getMovieById,
  removeFavorite,
  removeWishList,
} from '../../redux/slices/movies';
import {useSelector} from 'react-redux';
import {colors} from '../../colors';

export default function MovieDetails(props) {
  const movieId = props.route.params.movieId;
  const movie = useSelector(state =>
    state.movies.moviesList.find(movie => movie.id === movieId),
  );
  console.log('movie, movieId', movie, movieId);
  const dispatch = useDispatcher();
  const {users} = useReduxData();
  const {loggedInUser} = users;
  const handleAdd = (item: moviesType, type: 'favorite' | 'wishlist') => {
    try {
      dispatch(addToList({item: item, type: type, user: loggedInUser}));
      if (type === 'favorite') {
        dispatch(addFavorite(item.id));
      } else {
        dispatch(addWishList(item.id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = (item: moviesType, type: 'favorite' | 'wishlist') => {
    try {
      dispatch(
        removeFromList({movieId: item.id, type: type, userId: loggedInUser.id}),
      );
      if (type === 'favorite') {
        dispatch(removeFavorite(item));
      } else {
        dispatch(removeWishList(item));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView contentContainerStyle={stylesMovies.itemContainer}>
      <View style={{flex: 1, width: '100%', padding: 30}}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={stylesMovies.posterImage}
          resizeMode="cover"
          onError={error => console.log('Image failed to load', error.type)}
        />
      </View>
      {!isEmpty(loggedInUser) && (
        <View style={styles.likeIconContainer}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              movie.isFavorite
                ? handleRemove(movie, 'favorite')
                : handleAdd(movie, 'favorite');
            }}>
            <Icon
              name="heart"
              size={24}
              color={movie.isFavorite ? 'red' : 'grey'}
            />
          </TouchableOpacity>
        </View>
      )}
      {!isEmpty(loggedInUser) && (
        <View style={styles.WishListIconContainer}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              movie.isWishListed
                ? handleRemove(movie, 'wishlist')
                : handleAdd(movie, 'wishlist');
            }}>
            <EntypoIcon
              name="back-in-time"
              size={24}
              color={movie?.isWishListed ? 'red' : 'grey'}
            />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.itemText}>{movie.title}</Text>
      <Text style={{color: 'white'}}>{movie.overview}</Text>
    </ScrollView>
  );
}

const stylesMovies = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.secondary2,
    backgroundColor: colors.primary,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    marginBottom: 8,
  },
});
