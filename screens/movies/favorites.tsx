import {View, Text, FlatList} from 'react-native';
import React from 'react';
import useReduxData from '../../hooks/redux';
import {Link} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Movie} from './Movie';
import FAB from '../../commonComponents/fab';

export default function Favorites({navigation}) {
  const {users} = useReduxData();
  const {likedMovies, loggedInUser} = users;
  console.log(likedMovies);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={likedMovies}
        numColumns={2}
        onEndReachedThreshold={0.75}
        // onEndReached={() =>
        //   setvariables({...variables, pageSize: variables.pageSize + 1})
        // }
        // onRefresh={() => fetchData()}
        // refreshing={misc.listLoading}
        renderItem={props => (
          <Movie {...props} user={loggedInUser} navigation={navigation} />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              No Favorites registered
            </Text>
          </View>
        }
        keyExtractor={item => item.id}
      />
      <FAB
        icon={<Icon name="plus" color="white" />}
        onPress={() => navigation.navigate('homeMovies')}
      />
    </View>
  );
}
