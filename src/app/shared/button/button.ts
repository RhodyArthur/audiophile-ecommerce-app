import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.sass'
})
export class Button {
  type = input<'button' | 'submit' | 'reset'>('button')
  variant = input<'primary' | 'secondary' | 'accent'>('primary')
  disabled = input<boolean>(false)
  loading = input<boolean>(false)
  label = input<string>('See Product')
}
