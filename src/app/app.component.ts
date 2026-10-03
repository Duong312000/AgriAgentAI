import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  template: `
    <div class="web-container">
      <div class="app-content">
        <router-outlet></router-outlet>
        <app-bottom-nav *ngIf="shouldShowBottomNav()"></app-bottom-nav>
      </div>
    </div>
  `
})
export class AppComponent {
  private router = inject(Router);

  shouldShowBottomNav(): boolean {
    const url = this.router.url;
    const hideOn = [
      '/splash', '/register', '/login', '/forgot-password', '/enter-otp', 
      '/confirm-otp', '/reset-password-success', '/checkout', '/payment-success', 
      '/payment-failed', '/confirm-delete-account', '/order-tracking',
      '/order-confirm-list', '/order-returns', '/order-completed', '/order-cancelled', '/my-vouchers'
    ];
    return !hideOn.some(path => url.startsWith(path));
  }
}
