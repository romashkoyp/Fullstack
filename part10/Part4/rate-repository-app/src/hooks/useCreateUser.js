import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    try {
      const user = { username, password };
      const response = await mutate({ variables: { user } });
      
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data) {
        throw new Error('Unable to create user');
      }
      
      const userId = response.data.createUser.id;
      // console.log('response:', userId);

      return { userId, result: response };
    } catch (e) {
      console.error(e); 
      throw e;
    }
  };

  return [createUser, result];
};

export default useCreateUser;