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
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      imports: [RepoModalComponent],
      providers: [
        { provide: RatingStore, useValue: mockRatingStore },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;

    // Use the real mock repo data
    Object.defineProperty(component, 'repo', { get: () => () => mockRepo });
    Object.defineProperty(component, 'modalId', {
      get: () => () => mockModalId,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RatingStore.set with correct parameters on rate()', () => {
    component.rate(5);
    expect(mockRatingStore.set).toHaveBeenCalledWith('1', 5);
  });

  it('should call RatingStore.get with correct parameters on rating()', () => {
    mockRatingStore.get.mockReturnValue(4);
    expect(component.rating()).toBe(4);
    expect(mockRatingStore.get).toHaveBeenCalledWith('1');
  });

  it('should default to 0 if rating is not found in RatingStore', () => {
    mockRatingStore.get.mockReturnValue(0);
    expect(component.rating()).toBe(0);
  });

  it('should show toast on dialog close after rating', (done) => {
    component.rate(3);
    const dialogMock = { open: false } as unknown as HTMLDialogElement;
    component.onToggle({ target: dialogMock } as unknown as Event);
    setTimeout(() => {
      expect(mockToast.success).toHaveBeenCalledWith(
        `You gave 3★ to the repository "${mockRepo.name}"`,
      );
      done();
    }, 110);
  });

  it('should not show toast if dialog closes and no rating was made', (done) => {
    const dialogMock = { open: false } as unknown as HTMLDialogElement;
    component.onToggle({ target: dialogMock } as unknown as Event);
    setTimeout(() => {
      expect(mockToast.success).not.toHaveBeenCalled();
      done();
    }, 110);
  });
});
