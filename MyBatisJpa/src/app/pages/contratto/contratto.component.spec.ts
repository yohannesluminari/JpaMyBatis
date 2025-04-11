import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrattoComponent } from './contratto.component';

describe('ContrattoComponent', () => {
  let component: ContrattoComponent;
  let fixture: ComponentFixture<ContrattoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContrattoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
