import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductCard } from './related-product-card';

describe('RelatedProductCard', () => {
  let component: RelatedProductCard;
  let fixture: ComponentFixture<RelatedProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedProductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedProductCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
