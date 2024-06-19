import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizeAccesComponent } from './unauthorize-acces.component';

describe('UnauthorizeAccesComponent', () => {
  let component: UnauthorizeAccesComponent;
  let fixture: ComponentFixture<UnauthorizeAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizeAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizeAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
