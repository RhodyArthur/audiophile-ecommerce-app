import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { MobileMenuModal } from "../modals/mobile-menu-modal/mobile-menu-modal";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MobileMenuModal],
  templateUrl: './header.html',
  styleUrl: './header.sass'
})
export class Header {
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isModalOpen = signal<boolean>(false);
  isMenuOpen = signal(false);

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
    if (!this.isModalOpen()) {
      this.router.navigate(
      [{ outlets: { modal: ['cart'] } }],
      { relativeTo: this.route });
      this.isModalOpen.set(true);
    }
    else {
      this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent });
      this.isModalOpen.set(false);
    }

  }

  toggleModal() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeModal() {
    this.isMenuOpen.set(false);
  }
}
