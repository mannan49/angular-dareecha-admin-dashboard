import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MenuItemsConstants } from 'src/app/constants/menu-items.constant';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen = false;
  menuItems = MenuItemsConstants;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
