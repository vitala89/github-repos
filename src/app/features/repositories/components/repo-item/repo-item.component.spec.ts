import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoItemComponent } from './repo-item.component';
import { RepoModalComponent } from '@features/repositories/components/repo-modal/repo-modal.component';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { ToastService } from '@core/services/toast.service';
import { MOCK_REPOSITORIES } from '@mocks/mock-repositories';

describe('RepoItemComponent', () => {
  let fixture: ComponentFixture<RepoItemComponent>;
  let component: RepoItemComponent;
  let mockRatingStore: jest.Mocked<RatingStore>;
  const mockRepo = MOCK_REPOSITORIES[0];

  beforeEach(async () => {
    mockRatingStore = {
      get: jest.fn().mockReturnValue(0),
      set: jest.fn(),
      ratings: { update: jest.fn() },
    } as unknown as jest.Mocked<RatingStore>;

    await TestBed.configureTestingModule({
      imports: [RepoItemComponent, RepoModalComponent],
      providers: [
        { provide: RatingStore, useValue: mockRatingStore },
        { provide: ToastService, useValue: { success: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;

    Object.defineProperty(component, 'repo', {
      get: () => () => ({ ...mockRepo }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct rating from RatingStore', () => {
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    mockRatingStore.get.mockImplementation((id) =>
      id === String(mockRepo.id) ? 4 : 0,
    );

    Object.defineProperty(component, 'repo', {
      get: () => () => ({ ...mockRepo }),
    });
    fixture.detectChanges();

    expect(component.rating()).toBe(4);
    expect(mockRatingStore.get).toHaveBeenCalledWith(String(mockRepo.id));
  });

  it('should default to 0 if rating not found in RatingStore', () => {
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;

    mockRatingStore.get.mockReturnValue(0);

    Object.defineProperty(component, 'repo', {
      get: () => () => ({ ...mockRepo }),
    });
    fixture.detectChanges();

    expect(component.rating()).toBe(0);
  });

  it('should update rating if repo input changes', () => {
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;

    const newRepo = { ...mockRepo, id: 77 };
    mockRatingStore.get.mockImplementation((id) => (id === '77' ? 7 : 0));

    Object.defineProperty(component, 'repo', { get: () => () => newRepo });
    fixture.detectChanges();

    expect(component.rating()).toBe(7);
    expect(mockRatingStore.get).toHaveBeenCalledWith('77');
  });
});
