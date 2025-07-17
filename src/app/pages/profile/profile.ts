import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ProfileService } from '../../services/profile-service';
import { User } from '../../models/user';
import { HotToastService } from '@ngxpert/hot-toast';
import { Spinner } from "../../shared/spinner/spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [Spinner],
  templateUrl: './profile.html',
  styleUrl: './profile.sass'
})
export class Profile {

  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private toast = inject(HotToastService);
  private router = inject(Router);
  currentUserId = signal<string>('');
  userEmail = signal<string>('');
  userData = signal<User | null>(null);
  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.getUserId();
      this.getProfile()
    })
  }

  async getProfile() {
    this.isLoading.set(true);
    try {
      let data = await this.profileService.getProfileInfo(this.currentUserId());
      this.userData.set(data[0]);
    }
    catch(err: any) {
      this.toast.error(err.message);
      console.error(err)
    }
    finally {
      this.isLoading.set(false);
    }
    
  }

  async logout() {
    await this.authService.logOut();
    this.router.navigate(['/'])
  }

  getUserId() {    
    this.currentUserId.set(this.authService.currentUser()?.id!)
    this.userEmail.set(this.authService.currentUser()?.email!)
  }
}
