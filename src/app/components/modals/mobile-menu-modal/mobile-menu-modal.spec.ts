import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuModal } from './mobile-menu-modal';

describe('MobileMenuModal', () => {
  let component: MobileMenuModal;
  let fixture: ComponentFixture<MobileMenuModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileMenuModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
