import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import API from '../../api';
import {setMovies} from '../../redux/slices/movies';
import {RootReducerState} from '../../typescript/types';
import useReduxData from '../../hooks/redux';
import {Movie} from './Movie';
import {Text} from 'react-native';

const {width} = Dimensions.get('window');
const numColumns = 2;
const itemWidth = width / numColumns;

interface miscTypes {
  listLoading: boolean;
}
interface variableTypes {
  page: number;
  pageSize: number;
}
export default function HomeMovies({navigation}) {
  const {users} = useReduxData();
  const {loggedInUser, likedMovies, wishListedMovies} = users;
  const [misc, setmisc] = useState<miscTypes>({listLoading: true});
  const [variables, setvariables] = useState<variableTypes>({
    page: 1,
    pageSize: 20,
  });
  const dispatch = useDispatch();
  const {movies} = useReduxData();
  const {moviesList, search} = movies;
  console.log(moviesList);
  console.log(moviesList);
  const fetchData = async () => {
    try {
      setmisc({...misc, listLoading: true});
      const res = await API.get('/movie/popular', {
        params: {page: variables.page},
      });
      console.log('Called', res.data);
      dispatch(
        setMovies({
          list: res.data.results,
          favoriteMovies: likedMovies,
          wishListed: wishListedMovies,
        }),
      );
      setmisc({...misc, listLoading: false});
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSearch = async () => {
    setmisc({...misc, listLoading: true});
    const res = await API.get('/search/movie', {params: {query: search}});
    dispatch(
      setMovies({
        list: res.data.results,
        favoriteMovies: likedMovies,
        wishListed: wishListedMovies,
      }),
    );
    setmisc({...misc, listLoading: false});
  };
  useEffect(() => {
    fetchData();
  }, [variables.page]);
  useEffect(() => {
    console.log(search);
    if (search !== '') {
      fetchSearch();
    } else {
      fetchData();
    }
  }, [search]);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={moviesList}
        numColumns={numColumns}
        onEndReachedThreshold={0.75}
        onEndReached={() =>
          setvariables({...variables, pageSize: variables.pageSize + 1})
        }
        onRefresh={() => fetchData()}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              No Movies Found
            </Text>
          </View>
        }
        refreshing={misc.listLoading}
        renderItem={props => (
          <Movie {...props} navigation={navigation} user={loggedInUser} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  posterImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  likeIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    elevation: 3, // Shadow on Android
    zIndex: 1,
  },
  WishListIconContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    elevation: 3, // Shadow on Android
    zIndex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
