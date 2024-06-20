import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantPartComponent } from './gerant-part.component';

describe('GerantPartComponent', () => {
  let component: GerantPartComponent;
  let fixture: ComponentFixture<GerantPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerantPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
