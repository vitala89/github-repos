import {
  Directive,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  scrolled: OutputEmitterRef<void> = output();
  private observer!: IntersectionObserver;
  private el: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) this.scrolled.emit();
      },
      { root: null, threshold: 0.1, rootMargin: '100px' },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
