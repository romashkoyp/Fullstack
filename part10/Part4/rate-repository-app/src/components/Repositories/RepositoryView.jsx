import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import Item from './RepositoryItem';
import ReviewItem from '../Reviews/ReviewItem';
import useRepository from '../../hooks/useRepository';
import useReviews from '../../hooks/useReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { data: repoData, loading: repoLoading, error: repoError } = useRepository(id);
  const { data: reviewData, loading: reviewLoading, error: reviewError, fetchMore } = useReviews(id);

  if (repoLoading || reviewLoading) {
    return <Text>Loading...</Text>;
  }

  if (repoError || reviewError) {
    return <Text>RepoError or ReviewError</Text>;
  }
  const repository = repoData?.repository;

  if (!repository) {
    return <Text>No repository data available</Text>;
  }

  const reviews = reviewData?.repository?.reviews?.edges?.map(edge => edge.node);
  // console.log(reviews);
  console.log(reviewData?.repository?.reviews?.edges?.map(edge => edge.node))

  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url,
  } = repository;

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <Item
          fullName={fullName}
          description={description}
          language={language}
          stargazersCount={stargazersCount}
          forksCount={forksCount}
          reviewCount={reviewCount}
          ratingAverage={ratingAverage}
          ownerAvatarUrl={ownerAvatarUrl}
          url={url}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;
