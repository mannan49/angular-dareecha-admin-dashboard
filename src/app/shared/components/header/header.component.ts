import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@shared/services/auth.service';
import { MenuItemsConstants } from 'src/app/constants/menu-items.constant';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIconModule],
  styleUrl : './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen = false;
  menuItems = MenuItemsConstants;

  constructor(private router: Router, private authService: AuthService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }
  
}
