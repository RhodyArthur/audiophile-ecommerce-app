import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.sass'
})
export class Button {
  type = input<'button' | 'submit' | 'reset'>('button')
  variant = input<'primary' | 'secondary' | 'accent' | 'primary-login'>('primary')
  disabled = input<boolean>(false)
  loading = input<boolean>(false)
  label = input<string>('See Product')
  id = input<number>()

  buttonClicked = output<number>()

  onButtonClicked() {
    this.buttonClicked.emit(this.id()!)
  }
}
