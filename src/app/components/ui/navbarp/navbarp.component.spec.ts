import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarpComponent } from './navbarp.component';

describe('NavbarpComponent', () => {
  let component: NavbarpComponent;
  let fixture: ComponentFixture<NavbarpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
