import { Component } from '@angular/core';
import { CheckoutForm } from "../../components/checkout-form/checkout-form";

@Component({
  selector: 'app-checkout',
  imports: [CheckoutForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass'
})
export class Checkout {

}
