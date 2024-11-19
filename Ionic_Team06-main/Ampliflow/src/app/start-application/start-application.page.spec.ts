import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartApplicationPage } from './start-application.page';

describe('StartApplicationPage', () => {
  let component: StartApplicationPage;
  let fixture: ComponentFixture<StartApplicationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StartApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
