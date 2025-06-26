import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Footer } from './components/footer/footer';
import { Login } from './components/auth/login/login';

export const routes: Routes = [
    {path: '', component: Home},

    {
        path: 'login',
        loadComponent: () => import('../app/components/auth/login/login').then(m => m.Login)
    },
    {path: '**', component: Footer}
];
