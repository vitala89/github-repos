import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoItemComponent } from './repo-item.component';

describe('RepoItemComponent', () => {
  let fixture: ComponentFixture<RepoItemComponent>;
  let component: RepoItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
