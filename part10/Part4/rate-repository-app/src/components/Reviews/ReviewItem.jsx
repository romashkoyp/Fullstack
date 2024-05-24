import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useApolloClient } from '@apollo/client'; 
import { useNavigate } from 'react-router-native';
import Text from '../Common/Text';
import { format } from 'date-fns';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  secondLevelContainer: {
    flexDirection: 'column',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: 'blue',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
  },
  textContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 5,
  },
  buttonBlueContainer: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '48%',
  },
  buttonRedContainer: {
    backgroundColor: '#d73a4a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '48%',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

const ReviewItem = ({ review, repositoryFullName, repositoryId }) => {
  const { text, rating, createdAt, user } = review;
  // console.log(user);
  const navigate = useNavigate();
  const client = useApolloClient();
  const [deleteReview] = useDeleteReview();

  const fullName = repositoryFullName;
  // console.log(fullName);
  // console.log(repositoryId);

  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');
  const displayName = fullName || user?.username || 'No Name Available';

  const handlePress = () => {
    navigate(`/repository/${repositoryId}`);
  };

  const handlePressDelete = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { deleteReview: success } = await deleteReview(review.id); 
        
              if (success) {
                client.cache.evict({ id: `Review:${review.id}` }); // clean cache
                client.cache.gc(); // clean any unused data
              } else {
                console.error("Failed to delete review");
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      ]
    )
  };

  return (
    <View style={styles.secondLevelContainer}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" color="primary">
            {rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight='bold' fontSize='subheading'>{displayName}</Text>
          <Text fontSize='subheading' color="secondary">{formattedDate}</Text>
          <View style={styles.textContainer}>
            <Text>{text}</Text>
          </View>
        </View>
      </View>
      {!user?.username ? (
        <View style={styles.buttonGroupContainer}>
          <Pressable onPress={handlePress} style={styles.buttonBlueContainer}>
            <Text color="bar">View repository</Text> 
          </Pressable>          
          <Pressable onPress={handlePressDelete} style={styles.buttonRedContainer}>
            <Text color="bar">Delete review</Text>
          </Pressable>
        </View>
      ) : (null)}
    </View>
  );
};

export default ReviewItem;