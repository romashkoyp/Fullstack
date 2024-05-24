import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const variables = { includeReviews };
  const { data, loading, error } = useQuery(ME, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return (
    { me: data ? data.me : null, loading, error }
  )
};

export default useMe;