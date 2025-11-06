'use client';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin-al-asr.centers.pk/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  };
});

// Fixed: Proper error handler
const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Enhanced cache configuration with normalization
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: relayStylePagination(['where']),
      },
    },
    Post: {
      keyFields: ['id', 'slug'],
    },
    Category: {
      keyFields: ['id', 'slug'],
    },
  },
});

let globalApolloClient: ApolloClient<any> | null = null;

function createApolloClient() {
  // Fixed: Remove generic type parameter
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: cache,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = globalApolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;
  
  if (!globalApolloClient) globalApolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  return initializeApollo(initialState);
}

export const apolloClient = createApolloClient();