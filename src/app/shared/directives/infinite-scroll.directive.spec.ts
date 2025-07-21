import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
  template: '<div appInfiniteScroll (scrolled)="onScrolled()"></div>',
  standalone: true,
  imports: [InfiniteScrollDirective],
})
class TestComponent {
  onScrolled = jest.fn();
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: HTMLElement;
  let directive: InfiniteScrollDirective;
  let mockObserver: jest.Mocked<IntersectionObserver>;

  beforeEach(async () => {
    mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
      root: null,
      rootMargin: '',
      thresholds: [1],
      takeRecords: jest.fn(),
    } as jest.Mocked<IntersectionObserver>;

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation(() => mockObserver);

    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.nativeElement.querySelector(
      '[appInfiniteScroll]',
    );
    directive = fixture.debugElement.children[0].injector.get(
      InfiniteScrollDirective,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should have scrolled output', () => {
    expect(directive.scrolled).toBeDefined();
  });

  it('should create observer on init', () => {
    fixture.detectChanges();
    expect(IntersectionObserver).toHaveBeenCalled();
    expect(mockObserver.observe).toHaveBeenCalledWith(directiveElement);
  });

  it('should emit scrolled when intersecting', () => {
    fixture.detectChanges();
    const emitSpy = jest.spyOn(directive.scrolled, 'emit');
    const observerCallback = (IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    observerCallback([{ isIntersecting: true }]);

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit when not intersecting', () => {
    fixture.detectChanges();
    const emitSpy = jest.spyOn(directive.scrolled, 'emit');

    const observerCallback = (IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    observerCallback([{ isIntersecting: false }]);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should disconnect observer on destroy', () => {
    fixture.detectChanges();
    expect(mockObserver.observe).toHaveBeenCalled();

    fixture.destroy();
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('should handle destroy without observer initialization', () => {
    expect(() => fixture.destroy()).not.toThrow();
  });
});
