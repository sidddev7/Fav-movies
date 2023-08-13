import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  addFavorite,
  addWishList,
  removeFavorite,
  removeWishList,
} from '../../redux/slices/movies';
import {moviesType, userType} from '../../typescript/types';
import {useDispatcher} from '../../hooks/redux';
import {styles} from './home';
import {addToList, removeFromList} from '../../redux/slices/user';

export const Movie = (props: {
  navigation: any;
  item: moviesType;
  user: userType;
}) => {
  const dispatch = useDispatcher();
  const handleAdd = (item: moviesType, type: 'favorite' | 'wishlist') => {
    try {
      dispatch(addToList({item: item, type: type, user: props.user}));
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
        removeFromList({movieId: item.id, type: type, userId: props.user.id}),
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
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          movieId: props.item.id,
          movie: props.item,
        })
      }>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
          }}
          style={styles.posterImage}
          resizeMode="cover"
          onError={error => console.log('Image failed to load', error.type)}
        />
        {!isEmpty(props.user) && (
          <>
            <View style={styles.likeIconContainer}>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  props.item.isFavorite
                    ? handleRemove(props.item, 'favorite')
                    : handleAdd(props.item, 'favorite');
                }}>
                <Icon
                  name="heart"
                  size={24}
                  color={props.item.isFavorite ? 'red' : 'grey'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.WishListIconContainer}>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  props.item.isWishListed
                    ? handleRemove(props.item, 'wishlist')
                    : handleAdd(props.item, 'wishlist');
                }}>
                <EntypoIcon
                  name="back-in-time"
                  size={24}
                  color={props.item.isWishListed ? 'red' : 'grey'}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        <Text style={styles.itemText}>{props.item.title}</Text>
        <Text style={{color: 'white'}}>
          {props.item.overview.slice(0, 30)}...
        </Text>
      </View>
    </TouchableOpacity>
  );
};
