import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  imports: [],
  templateUrl: './quantity-button.html',
  styleUrl: './quantity-button.sass'
})
export class QuantityButton {
  quantity = signal<number>(1);
  quantityChanged = output<number>();
  
  decreaseQuantity(): void {
    this.quantity.update(q => {
      const newQuantity = Math.max(1, q - 1);
      this.quantityChanged.emit(newQuantity);
      return newQuantity;
    });
  }

  increaseQuantity(): void {
    this.quantity.update(q => {
      const newQuantity = q + 1
      this.quantityChanged.emit(newQuantity)
      return newQuantity
    })
  }

  
}
