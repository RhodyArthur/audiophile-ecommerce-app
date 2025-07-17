import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuardGuard } from './guards/auth-guard-guard';
import { checkoutResolver } from './resolver/checkout-resolver';

export const routes: Routes = [
    {path: '', component: Home},

    {
        path: 'login',
        loadComponent: () => import('../app/components/auth/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('../app/components/auth/signup/signup').then(m => m.Signup)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('../app/components/auth/forgot-password/forgot-password').then(m => m.ForgotPassword)
    },
    {
        path: 'password-reset',
        loadComponent: () => import('../app/components/auth/password-reset/password-reset').then(m => m.PasswordReset)
    },
    {
        path: 'product/:category',
        loadComponent: () => import('./pages/products/products').then(m => m.Products)
    },
    {
        path: 'product-details/:slug',
        loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails)
    },
    {
        path: 'cart',
        outlet: 'modal',
        loadComponent: () => import('./components/modals/cart/cart').then(m => m.Cart),
        canActivate: [authGuardGuard]
    },  
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
        canActivate: [authGuardGuard],
        resolve: {cartData: checkoutResolver}
    },
    {
        path: 'checkout-modal',
        outlet: 'modal',
        loadComponent: () => import('./components/modals/checkout-modal/checkout-modal').then(m => m.CheckoutModal),
        canActivate: [authGuardGuard],
        resolve: {cartData: checkoutResolver}
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuardGuard]
    },
    
    {path: '**', redirectTo: ''}
];
