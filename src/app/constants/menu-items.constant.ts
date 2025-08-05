import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'PDF Notes', icon: 'picture_as_pdf', route: '/notes' },           // document icon
  { label: 'Quick Quiz', icon: 'assignment_turned_in', route: '/companies' },                 // quiz icon
  { label: '9th Lectures', icon: 'school', route: '/tickets' },               // lectures/school icon
  { label: '10th Lectures', icon: 'school', route: '/rfid-card' },            // same as above
  { label: '1st Year Lectures', icon: 'school', route: '/rfid-card' },        // same
  { label: 'TextBooks', icon: 'menu_book', route: '/map' },                   // book icon
  { label: 'Literature Books', icon: 'auto_stories', route: '/map' },            // same as above
  { label: 'Settings', icon: 'settings', route: '/profile' },                 // settings gear
  { label: 'Logout', icon: 'logout', route: '/auth/login' },                  // logout icon (same)
];
