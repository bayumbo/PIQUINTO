import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEvaComponent } from './p-eva.component';

describe('PEvaComponent', () => {
  let component: PEvaComponent;
  let fixture: ComponentFixture<PEvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PEvaComponent]
    });
    fixture = TestBed.createComponent(PEvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
