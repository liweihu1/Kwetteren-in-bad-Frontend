import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KweetOverviewCardComponent } from './kweet-overview-card.component';

describe('KweetOverviewCardComponent', () => {
  let component: KweetOverviewCardComponent;
  let fixture: ComponentFixture<KweetOverviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KweetOverviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KweetOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
