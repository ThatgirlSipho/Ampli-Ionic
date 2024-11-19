import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewConsultantPage } from './view-consultant.page';

describe('ViewConsultantPage', () => {
  let component: ViewConsultantPage;
  let fixture: ComponentFixture<ViewConsultantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsultantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
