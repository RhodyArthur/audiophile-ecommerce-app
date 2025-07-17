import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private supabase = inject(SupabaseService);

  async getProfileInfo(userId: string): Promise<User[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from('profiles')
      .select('*')
      .eq('id', userId)

      if (error) {
        console.error('Error getting profile data:', error.message);
        throw error;
      }
      return data
  }
}
