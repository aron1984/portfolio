import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorjectsComponent } from './porjects.component';

describe('PorjectsComponent', () => {
  let component: PorjectsComponent;
  let fixture: ComponentFixture<PorjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
