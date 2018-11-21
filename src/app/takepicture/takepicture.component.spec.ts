import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakepictureComponent } from './takepicture.component';

describe('TakepictureComponent', () => {
  let component: TakepictureComponent;
  let fixture: ComponentFixture<TakepictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakepictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
