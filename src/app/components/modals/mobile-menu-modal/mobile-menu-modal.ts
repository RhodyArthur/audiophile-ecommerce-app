import { Component, inject, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu-modal',
  imports: [],
  templateUrl: './mobile-menu-modal.html',
  styleUrl: './mobile-menu-modal.sass'
})
export class MobileMenuModal {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
