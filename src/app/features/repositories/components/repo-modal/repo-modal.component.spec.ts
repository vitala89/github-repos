import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoModalComponent } from './repo-modal.component';

describe('RepoModalComponent', () => {
  let fixture: ComponentFixture<RepoModalComponent>;
  let component: RepoModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
