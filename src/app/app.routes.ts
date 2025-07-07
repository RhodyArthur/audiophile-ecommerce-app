import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

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
        path: 'product-details/:id',
        loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails),
    },
  
    
    {path: '**', redirectTo: ''}
];
