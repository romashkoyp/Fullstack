import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/Repositories/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = getAllByTestId('repositoryItem');
      
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      // screen.debug();
      const { getByText: getByTextFirstRepo } = within(firstRepositoryItem);
      const { getByText: getByTextSecondRepo } = within(secondRepositoryItem);

      // First repository item
      expect(getByTextFirstRepo('Full name: jaredpalmer/formik')).toBeDefined();
      expect(getByTextFirstRepo('Build forms in React, without the tears')).toBeDefined();
      expect(getByTextFirstRepo('TypeScript')).toBeDefined();
      expect(getByTextFirstRepo('1.6k')).toBeDefined();
      expect(getByTextFirstRepo('21.9k')).toBeDefined();
      expect(getByTextFirstRepo('88')).toBeDefined();
      expect(getByTextFirstRepo('3')).toBeDefined();

      // Second repository item
      expect(getByTextSecondRepo('Full name: async-library/react-async')).toBeDefined();
      expect(getByTextSecondRepo('Flexible promise-based React data loader')).toBeDefined();
      expect(getByTextSecondRepo('JavaScript')).toBeDefined();
      expect(getByTextSecondRepo('69')).toBeDefined();
      expect(getByTextSecondRepo('1.8k')).toBeDefined();
      expect(getByTextSecondRepo('72')).toBeDefined();
      expect(getByTextSecondRepo('3')).toBeDefined();
    });
  });
});