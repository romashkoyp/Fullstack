import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  //console.log('useRepository hook called');
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  // console.log('useRepository data:', data);

  return (
    { data, error, loading }
  );
};

export default useRepository;