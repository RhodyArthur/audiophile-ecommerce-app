import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabaseService = inject(SupabaseService);

  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      console.error('Signup failed:', error.message);
      throw error
    };
    return data;
  }


}
