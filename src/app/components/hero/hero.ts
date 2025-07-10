import { Component, inject, signal } from '@angular/core';
import { Header } from "../header/header";
import { Button } from "../../shared/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.sass'
})
export class Hero {

  private router = inject(Router);
  slug = signal<string>('xx99-mark-two-headphones');

  viewDetails() {
    this.router.navigate(['product-details', this.slug()])
  }
}
