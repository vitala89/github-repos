import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoListComponent } from './repo-list.component';
import { GithubApiService } from '@features/repositories/services';
import { of, throwError } from 'rxjs';
import { MOCK_REPOSITORIES } from '@mocks/mock-repositories';
import { setupMockIntersectionObserver } from '@mocks/mock-intersection-observer';
import { ToastService } from '@core/services/toast.service';

setupMockIntersectionObserver();

describe('RepoListComponent', () => {
  let fixture: ComponentFixture<RepoListComponent>;
  let component: RepoListComponent;
  let githubServiceMock: jest.Mocked<GithubApiService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(async () => {
    githubServiceMock = {
      getRepositories: jest.fn().mockReturnValue(of({ items: [] })),
    } as unknown as jest.Mocked<GithubApiService>;

    toastServiceMock = {
      error: jest.fn(),
      success: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      imports: [RepoListComponent],
      providers: [
        { provide: GithubApiService, useValue: githubServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
    jest.clearAllMocks();
  });

  it('should create', () => {
    githubServiceMock.getRepositories.mockReturnValue(
      of({ items: MOCK_REPOSITORIES }),
    );
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should load repositories on loadRepos', () => {
    githubServiceMock.getRepositories.mockReturnValue(
      of({ items: MOCK_REPOSITORIES }),
    );

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    githubServiceMock.getRepositories.mockClear();
    component.loadRepos();

    expect(githubServiceMock.getRepositories).toHaveBeenCalledWith(1);
    expect(component.repositories().length).toBe(MOCK_REPOSITORIES.length);
    expect(component.page()).toBe(2);
    expect(component.loading()).toBe(false);
  });

  it('should not load when already loading', () => {
    githubServiceMock.getRepositories.mockReturnValue(of({ items: [] }));
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    githubServiceMock.getRepositories.mockClear();
    component.loading.set(true);
    component.loadRepos();

    expect(githubServiceMock.getRepositories).not.toHaveBeenCalled();
  });

  it('should handle error from GithubApiService', () => {
    const error = new Error('API Error');
    githubServiceMock.getRepositories.mockReturnValue(throwError(() => error));

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(toastServiceMock.error).toHaveBeenCalledWith(
      'Failed to load repositories. Please try again later.',
    );
    expect(component.loading()).toBe(false);
  });
});
