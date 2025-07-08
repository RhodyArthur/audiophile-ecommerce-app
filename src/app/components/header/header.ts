import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.sass'
})
export class Header {
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  constructor() {
    effect(() =>{
      this.getUserId()
      this.cartService.fetchCartCount(this.getUserId())
    })
  }

  getUserId(): string {
    return this.authService.currentUser()?.id!
  }

  openCart() {
    this.router.navigate(
    [{ outlets: { modal: ['cart'] } }],
      { relativeTo: this.route }
  );

  }
}
