import { Repository } from '@features/repositories/models/repository.model';

export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: 1,
    name: 'awesome-repo',
    description: 'Test repo 1',
    stargazers_count: 1234,
    open_issues_count: 12,
    owner: {
      login: 'user1',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
  },
  {
    id: 2,
    name: 'another-repo',
    description: 'Test repo 2',
    stargazers_count: 2345,
    open_issues_count: 5,
    owner: {
      login: 'user2',
      avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
  },
];
