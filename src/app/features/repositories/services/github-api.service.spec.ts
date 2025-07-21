import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { GithubApiService } from './github-api.service';
import { MOCK_REPOSITORIES } from '@mocks/mock-repositories';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpClientMock: jest.Mocked<Pick<HttpClient, 'get'>>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as jest.Mocked<Pick<HttpClient, 'get'>>;

    TestBed.configureTestingModule({
      providers: [
        GithubApiService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(GithubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with correct URL and return mock repositories', (done) => {
    httpClientMock.get.mockReturnValue(of({ items: MOCK_REPOSITORIES }));

    const today = new Date();
    today.setDate(today.getDate() - 30);
    const created = today.toISOString().split('T')[0];
    const page = 2;
    const expectedUrl = `https://api.github.com/search/repositories?q=created:>${created}&sort=stars&order=desc&page=${page}`;

    service.getRepositories(page).subscribe({
      next: (result) => {
        expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        expect(result.items).toEqual(MOCK_REPOSITORIES);
        done();
      },
    });
  });

  it('should use default page=1 if not provided', (done) => {
    httpClientMock.get.mockReturnValue(of({ items: MOCK_REPOSITORIES }));

    const today = new Date();
    today.setDate(today.getDate() - 30);
    const created = today.toISOString().split('T')[0];
    const expectedUrl = `https://api.github.com/search/repositories?q=created:>${created}&sort=stars&order=desc&page=1`;

    service.getRepositories().subscribe({
      next: (result) => {
        expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        expect(result.items).toEqual(MOCK_REPOSITORIES);
        done();
      },
    });
  });

  it('should emit error if HttpClient.get throws', (done) => {
    const errorResponse = new Error('Network error');
    httpClientMock.get.mockReturnValueOnce(throwError(() => errorResponse));

    service.getRepositories().subscribe({
      next: () => done.fail('Expected error, got success'),
      error: (err) => {
        expect(err).toBe(errorResponse);
        done();
      },
    });
  });
});
