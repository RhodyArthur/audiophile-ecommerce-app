import { Component, inject, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-speakerx9-card',
  imports: [Button],
  templateUrl: './speakerx9-card.html',
  styleUrl: './speakerx9-card.sass'
})
export class Speakerx9Card {
  private router = inject(Router);
  slug = signal<string>('zx9-speaker');

  viewDetails() {
    this.router.navigate(['product-details', this.slug()])
  }
}
