import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MenuItemsConstants } from 'src/app/constants/menu-items.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIconModule],
  styleUrl : './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen = false;
  menuItems = MenuItemsConstants;

  constructor(private router: Router, private authService: AuthService, private toast: HotToastService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout(); 
    this.toast.success("Logging Out");
    this.router.navigate(['/auth/login']);
  }
  
}
