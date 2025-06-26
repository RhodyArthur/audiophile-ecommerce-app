import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Footer } from './components/footer/footer';

export const routes: Routes = [
    {path: '', component: Home},
    {path: '**', component: Footer}
];
