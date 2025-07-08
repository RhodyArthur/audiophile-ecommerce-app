import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  imports: [],
  templateUrl: './quantity-button.html',
  styleUrl: './quantity-button.sass'
})
export class QuantityButton {
  quantity = input<number>();
  quantityChanged = output<number>();
  private localQuantity = signal<number>(1);

  constructor() {
    effect(() => {
    if (this.quantity()) {
      this.localQuantity.set(this.quantity()!);
    }
    })
  }
  
  decreaseQuantity(): void {
    this.localQuantity.update(q => {
      const newQuantity = Math.max(1, q - 1);
      this.quantityChanged.emit(newQuantity);
      return newQuantity;
    });
  }

  increaseQuantity(): void {
    this.localQuantity.update(q => {
      const newQuantity = q + 1
      this.quantityChanged.emit(newQuantity)
      return newQuantity
    })
  }

  
}
