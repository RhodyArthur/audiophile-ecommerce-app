import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabaseService = inject(SupabaseService);

  currentUser = signal<Partial <User> | null>(null);

  constructor() {
    this.supabaseService.getClient()
    .auth.getUser().then(({ data, error }) => {
      if (!error) {
        this.currentUser.set(data.user);
      }
    });

    this.supabaseService.getClient()
    .auth.onAuthStateChange((event, session) => {
      this.currentUser.set(session?.user ?? null);
    });
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }

  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        },
        emailRedirectTo: 'https://audiophile-ecommerce-app-self.vercel.app/login'
      }
    });

    if (error) {
      console.error('Signup failed:', error.message);
      throw error
    };
    return data;
  }


  async logIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async logOut() {
    const { error } = await this.supabaseService
    .getClient()
    .auth
    .signOut()

    if (error) throw error;
  }

  async sendPasswordResetEmail(email: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .auth
    .resetPasswordForEmail(
      email,
      {
        redirectTo: 'https://audiophile-ecommerce-app-self.vercel.app/password-reset'
      }
    )

    if (error) {
      console.error('Password Reset failed:', error.message);
      throw error
    };
    return data;
  }

  async passwordReset(password: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .auth.updateUser({
      password: password
    })

    if (error) {
      console.error('Password Reset failed:', error.message);
      throw error
    };
    return data;
  }
}
