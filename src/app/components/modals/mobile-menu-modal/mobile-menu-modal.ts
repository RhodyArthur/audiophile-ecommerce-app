import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-mobile-menu-modal',
  imports: [RouterLink],
  templateUrl: './mobile-menu-modal.html',
  styleUrl: './mobile-menu-modal.sass'
})
export class MobileMenuModal {
  private router = inject(Router);
  protected authService = inject(AuthService);
  close = output<void>();

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }


  closeModal() {
    this.close.emit();
  }

  navigateAndClose(category: string) {
    this.close.emit();
    this.router.navigate(['product', category]);
  }

  navigateAndCloseProfile() {
    this.close.emit();
    this.router.navigate(['profile']);
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
