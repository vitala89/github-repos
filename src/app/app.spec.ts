import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@core/themes/theme.service';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let mockThemeService: any;

  beforeEach(async () => {
    mockThemeService = {
      theme: () => 'light',
      toggle: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet, CommonModule],
      providers: [{ provide: ThemeService, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the App component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ThemeService and its theme signal', () => {
    expect(typeof component.theme.theme).toBe('function');
    expect(component.theme.theme()).toBe('light');
  });
});
