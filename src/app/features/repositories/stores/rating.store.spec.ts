import { RatingStore } from '@features/repositories/stores/rating.store';

describe('RatingStore', () => {
  let store: RatingStore;
  let localStorageMock: Record<string, string>;
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = window.localStorage; // Save original

    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key] ?? null,
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value;
        },
      },
      writable: true,
    });

    store = new RatingStore();
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
    jest.restoreAllMocks();
  });

  it('should initialize with empty ratings if nothing in localStorage', () => {
    expect(store.ratings()).toEqual({});
  });

  it('should set and get rating for a repo', () => {
    store.set('123', 5);
    expect(store.get('123')).toBe(5);
    expect(store.ratings()['123']).toBe(5);
    expect(window.localStorage.getItem('repo-ratings')).toBe(
      JSON.stringify({ '123': 5 }),
    );
  });

  it('should get default value if no rating exists', () => {
    expect(store.get('999')).toBe(0);
    expect(store.get('999', 3)).toBe(3);
  });

  it('should persist and reload ratings', () => {
    localStorageMock['repo-ratings'] = JSON.stringify({ '7': 2 });
    const anotherStore = new RatingStore();
    expect(anotherStore.get('7')).toBe(2);
  });

  it('should handle malformed JSON gracefully', () => {
    localStorageMock['repo-ratings'] = 'not-json';
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const brokenStore = new RatingStore();
    expect(errorSpy).toHaveBeenCalled();
    expect(brokenStore.ratings()).toEqual({});
    errorSpy.mockRestore();
  });
});
