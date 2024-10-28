import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  canActivate(): boolean {
    const token = this.storageService.getSessionStorage('token');
    const userSession = this.storageService.getSessionStorage('userSession');
    
    if (!token || !userSession) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}