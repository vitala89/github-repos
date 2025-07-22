import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoModalComponent } from './repo-modal.component';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { ToastService } from '@core/services/toast.service';
import { MOCK_REPOSITORIES } from '@mocks/mock-repositories';

describe('RepoModalComponent', () => {
  let fixture: ComponentFixture<RepoModalComponent>;
  let component: RepoModalComponent;
  let mockRatingStore: jest.Mocked<RatingStore>;
  let mockToast: jest.Mocked<ToastService>;

  const mockRepo = MOCK_REPOSITORIES[0];
  const mockModalId = 'test-modal-id';

  beforeEach(async () => {
    mockRatingStore = {
      set: jest.fn(),
      get: jest.fn().mockReturnValue(0),
    } as unknown as jest.Mocked<RatingStore>;

    mockToast = {
      success: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      imports: [RepoModalComponent],
      providers: [
        { provide: RatingStore, useValue: mockRatingStore },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    setupComponent();
  });

  const setupComponent = () => {
    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'repo', { get: () => () => mockRepo });
    Object.defineProperty(component, 'modalId', {
      get: () => () => mockModalId,
    });
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pending stars when setPendingStars is called', () => {
    component.setPendingStars(5);
    expect(component.pendingStars()).toBe(5);
  });

  it('should display pending stars when available', () => {
    component.setPendingStars(4);

    mockRatingStore.get.mockReturnValue(0);

    expect(component.displayStars()).toBe(4);
  });

  it('should fall back to current rating when no pending stars', () => {
    component.pendingStars.set(undefined);
    mockRatingStore.get.mockReturnValue(3);
    setupComponent();

    expect(component.displayStars()).toBe(3);
  });

  it('should get current rating from store', () => {
    mockRatingStore.get.mockReturnValue(4);
    setupComponent();

    expect(component.currentRating()).toBe(4);
    expect(mockRatingStore.get).toHaveBeenCalledWith('1');
  });

  it('should show success toast on dialog close with new rating', (done) => {
    mockRatingStore.get.mockReturnValue(0);

    component.setPendingStars(3);

    const dialogMock = { open: false } as unknown as HTMLDialogElement;
    component.onToggle({ target: dialogMock } as unknown as Event);

    setTimeout(() => {
      expect(mockToast.success).toHaveBeenCalledWith(
        `You gave 3★ to the repository "${mockRepo.name}"`,
      );

      expect(mockRatingStore.set).toHaveBeenCalledWith('1', 3);

      expect(component.pendingStars()).toBeUndefined();

      done();
    }, 110);
  });

  it('should not show toast if dialog closes and no pending stars', (done) => {
    component.pendingStars.set(undefined);

    const dialogMock = { open: false } as unknown as HTMLDialogElement;
    component.onToggle({ target: dialogMock } as unknown as Event);

    setTimeout(() => {
      expect(mockToast.success).not.toHaveBeenCalled();
      expect(mockRatingStore.set).not.toHaveBeenCalled();
      done();
    }, 110);
  });

  it('should show warning toast when removing a rating', (done) => {
    mockRatingStore.get.mockReturnValue(3);

    setupComponent();

    component.setPendingStars(0);

    const dialogMock = { open: false } as unknown as HTMLDialogElement;
    component.onToggle({ target: dialogMock } as unknown as Event);

    setTimeout(() => {
      expect(mockToast.warning).toHaveBeenCalledWith(
        `You cancelled your vote for "${mockRepo.name}".`,
      );

      expect(mockRatingStore.set).toHaveBeenCalledWith('1', 0);

      done();
    }, 110);
  });

  it('should manually set pendingStars to undefined', (done) => {
    component.pendingStars.set(3);
    component.pendingStars.set(undefined);
    setTimeout(() => {
      expect(component.pendingStars()).toBeUndefined();
      done();
    }, 10);
  });
});
