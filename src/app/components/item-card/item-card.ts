import { Component, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { Spinner } from "../../shared/spinner/spinner";
import { Button } from "../../shared/button/button";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item-card',
  imports: [Spinner, Button, CurrencyPipe],
  templateUrl: './item-card.html',
  styleUrl: './item-card.sass'
})
export class ItemCard {
 product = input<Product | null>();
 isLoading = signal<boolean>(false);
 errorMessage = signal<string>('');
}
