import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAllocate } from './request-allocate';

describe('RequestAllocate', () => {
  let component: RequestAllocate;
  let fixture: ComponentFixture<RequestAllocate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAllocate],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAllocate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
