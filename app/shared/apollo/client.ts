import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { env } from '~/shared/config/env';

const httpLink = new HttpLink({
  uri: env.graphqlApiUrl,
  useGETForQueries: true,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

