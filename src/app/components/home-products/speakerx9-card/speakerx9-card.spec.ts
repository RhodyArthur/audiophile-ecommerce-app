import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speakerx9Card } from './speakerx9-card';

describe('Speakerx9Card', () => {
  let component: Speakerx9Card;
  let fixture: ComponentFixture<Speakerx9Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Speakerx9Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Speakerx9Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
