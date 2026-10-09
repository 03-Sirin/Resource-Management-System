import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AssetForm } from './asset-form';

describe('AssetForm', () => {
  let component: AssetForm;
  let fixture: ComponentFixture<AssetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
