import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    try {
      const response = await mutate({ variables: { deleteReviewId } });
      
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data) {
        throw new Error('Unable to delete review');
      }

      return { deleteReview: true, result: response }; 
    } catch (e) {
      console.error(e); 
      throw e;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;