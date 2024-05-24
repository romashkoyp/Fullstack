import { Text, FlatList, View, StyleSheet  } from 'react-native';
import ReviewItem from './ReviewItem';
import useMe from '../../hooks/useMe';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, loading, error } = useMe(true);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const reviews = me?.reviews?.edges?.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => 
        <ReviewItem
          review={item}
          repositoryFullName={item.repository.fullName}
          repositoryId={item.repository.id}
        />
      }
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;