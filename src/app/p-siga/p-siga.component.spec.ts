import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSigaComponent } from './p-siga.component';

describe('PSigaComponent', () => {
  let component: PSigaComponent;
  let fixture: ComponentFixture<PSigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PSigaComponent]
    });
    fixture = TestBed.createComponent(PSigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
