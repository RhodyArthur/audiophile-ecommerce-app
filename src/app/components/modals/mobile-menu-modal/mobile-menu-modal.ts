import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-mobile-menu-modal',
  imports: [],
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

  navigateAndCloseProfile(route: string) {
    this.close.emit();
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
