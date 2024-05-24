import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
  const { data, loading, error } = useQuery(ME);

  return (
    { me: data ? data.me : null, loading, error }
  )
};

export default useMe;