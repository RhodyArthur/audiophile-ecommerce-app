import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  imports: [],
  templateUrl: './quantity-button.html',
  styleUrl: './quantity-button.sass'
})
export class QuantityButton {
  quantity = signal<number>(1);

  decreaseQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  increaseQuantity(): void {
    this.quantity.update(q => q + 1)
  }
}
