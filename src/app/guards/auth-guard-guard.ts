import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase-service';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  const session = await supabaseService.getClient().auth.getSession();
  const user = session.data.session?.user;
  
  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
