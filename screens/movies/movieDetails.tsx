import isEmpty from 'lodash/isEmpty';
import {default as React} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './home';
import {moviesType} from '../../typescript/types';
import useReduxData, {useDispatcher} from '../../hooks/redux';
import {addMovie, removeMovie} from '../../redux/slices/user';
import {addFavorite, removeFavorite} from '../../redux/slices/movies';

export default function MovieDetails(props) {
  const movie = props.route.params.movie;
  const dispatch = useDispatcher();
  const {users} = useReduxData();
  const {loggedInUser} = users;
  const handleAdd = (item: moviesType) => {
    try {
      dispatch(addMovie(item));
      dispatch(addFavorite(item.id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = (item: moviesType) => {
    try {
      dispatch(removeMovie(item));
      dispatch(removeFavorite(item));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={stylesMovies.itemContainer}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.posterImage}
        resizeMode="contain"
        onError={error => console.log('Image failed to load', error.type)}
      />
      {!isEmpty(loggedInUser) && (
        <View style={styles.likeIconContainer}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              movie.isFavorite ? handleRemove(movie) : handleAdd(movie);
            }}>
            <Icon
              name="heart"
              size={24}
              color={movie.isFavorite ? 'red' : 'grey'}
            />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.itemText}>{movie.title}</Text>
      <Text>{movie.overview.slice(0, 30)}...</Text>
    </View>
  );
}

const stylesMovies = StyleSheet.create({
  itemContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
});
