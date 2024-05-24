import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const apolloUri = Constants.expoConfig.extra.env;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      // console.log('Retrieved token:', accessToken); 
  
      const modifiedHeaders = {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
  
      // console.log('Authorization header:', modifiedHeaders.authorization); // Check header
      return { headers: modifiedHeaders };
  
    } catch (e) {
      console.error(e);
      return { headers };
    }
  });
  
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;