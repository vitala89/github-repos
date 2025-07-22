import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoModalComponent } from './repo-modal.component';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { Repository } from '@features/repositories';

describe('RepoModalComponent', () => {
  let fixture: ComponentFixture<RepoModalComponent>;
  let component: RepoModalComponent;
  let mockRatingStore: jest.Mocked<RatingStore>;

  beforeEach(async () => {
    mockRatingStore = {
      set: jest.fn(),
      get: jest.fn().mockReturnValue(0),
    } as unknown as jest.Mocked<RatingStore>;

    await TestBed.configureTestingModule({
      imports: [RepoModalComponent],
      providers: [{ provide: RatingStore, useValue: mockRatingStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;

    const mockRepo = { id: 1 } as Repository;
    Object.defineProperty(component, 'repo', {
      get: () => () => mockRepo,
    });

    Object.defineProperty(component, 'modalId', {
      get: () => () => 'test-modal-id',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RatingStore.set with correct parameters on rate()', () => {
    const stars = 5;
    component.rate(stars);
    expect(mockRatingStore.set).toHaveBeenCalledWith('1', stars);
  });

  it('should call RatingStore.get with correct parameters on rating()', () => {
    const mockRepo = { id: 1 } as Repository;
    Object.defineProperty(component, 'repo', {
      get: () => () => mockRepo,
    });
    mockRatingStore.get.mockReturnValue(4);

    const rating = component.rating();
    expect(mockRatingStore.get).toHaveBeenCalledWith('1');
    expect(rating).toBe(4);
  });

  it('should default to 0 if rating is not found in RatingStore', () => {
    mockRatingStore.get.mockReturnValue(0);
    const rating = component.rating();
    expect(rating).toBe(0);
  });
});
