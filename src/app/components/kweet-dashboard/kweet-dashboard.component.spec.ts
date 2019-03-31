import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KweetDashboardComponent } from './kweet-dashboard.component';

describe('KweetDashboardComponent', () => {
  let component: KweetDashboardComponent;
  let fixture: ComponentFixture<KweetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KweetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KweetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
