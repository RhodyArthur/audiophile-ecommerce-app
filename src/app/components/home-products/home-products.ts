import { Component, inject, signal } from '@angular/core';
import { Speakerx9Card } from "./speakerx9-card/speakerx9-card";
import { Button } from "../../shared/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-products',
  imports: [Speakerx9Card, Button],
  templateUrl: './home-products.html',
  styleUrl: './home-products.sass'
})
export class HomeProducts {
  private router = inject(Router);
  speaker = signal<string>('zx7-speaker');
  earphones = signal<string>('yx1-earphones');
  
    viewSpeakerDetails() {
      this.router.navigate(['product-details', this.speaker()])
    }
  
    viewEarphoneDetails() {
      this.router.navigate(['product-details', this.earphones()])
    }
}
