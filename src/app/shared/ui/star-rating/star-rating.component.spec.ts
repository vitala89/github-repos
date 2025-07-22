import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';
import { LucideAngularModule } from 'lucide-angular';

describe('StarRatingComponent', () => {
  let fixture: ComponentFixture<StarRatingComponent>;
  let component: StarRatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingComponent, LucideAngularModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the new value when rate is called with a different value', () => {
    const spy = jest.spyOn(component.rated, 'emit');
    fixture.componentRef.setInput('value', 2);
    fixture.detectChanges();

    component.rate(4);
    expect(spy).toHaveBeenCalledWith(4);
    expect(component.hoverValue()).toBe(0);
  });

  it('should emit 0 and reset hoverValue when rate is called with the same value', () => {
    const spy = jest.spyOn(component.rated, 'emit');
    fixture.componentRef.setInput('value', 3);
    fixture.detectChanges();

    component.hoverValue.set(2);
    component.rate(3);

    expect(spy).toHaveBeenCalledWith(0);
    expect(component.hoverValue()).toBe(0);
  });

  it('should not emit when readonly is true', () => {
    const spy = jest.spyOn(component.rated, 'emit');
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    component.rate(5);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update hoverValue on star hover', () => {
    fixture.componentRef.setInput('readonly', false);
    fixture.detectChanges();

    component.onStarHover(2);
    expect(component.hoverValue()).toBe(2);
  });

  it('should not update hoverValue on hover if readonly is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    component.onStarHover(4);
    expect(component.hoverValue()).toBe(0);
  });

  it('should reset hoverValue on mouse leave', () => {
    component.hoverValue.set(3);
    fixture.componentRef.setInput('readonly', false);
    fixture.detectChanges();

    component.onStarsLeave();
    expect(component.hoverValue()).toBe(0);
  });

  it('should not reset hoverValue on leave if readonly is true', () => {
    component.hoverValue.set(4);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    component.onStarsLeave();
    expect(component.hoverValue()).toBe(4);
  });

  it('getStarValue should return hoverValue if > 0', () => {
    fixture.componentRef.setInput('value', 2);
    fixture.detectChanges();

    component.hoverValue.set(4);
    expect(component.getStarValue()).toBe(4);
  });

  it('getStarValue should return value if hoverValue is 0', () => {
    fixture.componentRef.setInput('value', 5);
    fixture.detectChanges();

    component.hoverValue.set(0);
    expect(component.getStarValue()).toBe(5);
  });
});
