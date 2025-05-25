import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role || null;
    } catch {
      return null;
    }
  }
  
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
