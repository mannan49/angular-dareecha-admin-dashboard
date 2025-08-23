import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'Notes', icon: 'icon-file-pdf-o', route: '/notes' },          
  { label: 'Chapters', icon: 'icon-folder-add', route: '/chapters' },                
  { label: 'Mcqs', icon: 'icon-edit', route: '/mcqs' },              
  { label: 'TextBooks', icon: 'icon-book', route: '/rfid-card' },         
  { label: 'Lectures', icon: 'icon-youtube1', route: '/auth/login' },
  { label: 'Settings', icon: 'icon-settings', route: '/profile' },               
  { label: 'Logout', icon: 'icon-log-out', route: '/auth/login' },
];
