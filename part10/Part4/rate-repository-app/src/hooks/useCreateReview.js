import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const review = { ownerName, repositoryName, rating, text };
      const response = await mutate({ variables: { review } });
      
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data) {
        throw new Error('Unable to create review');
      }
      
      const repositoryId = response.data.createReview.repositoryId;
      // console.log('repositoryId:', repositoryId)

      return { repositoryId, result: response };
    } catch (e) {
      console.error(e); 
      throw e;
    }
  };

  return [createReview, result];
};

export default useCreateReview;