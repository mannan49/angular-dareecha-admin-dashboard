import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'Notes', icon: 'icon-cloud_upload', route: '/notes' },          
  { label: 'Chapters', icon: 'icon-folder-add', route: '/chapters' },                
  { label: 'Mcqs', icon: 'icon-edit', route: '/mcqs' },              
  { label: 'TextBooks', icon: 'icon-drive_folder_upload', route: '/rfid-card' },         
  { label: 'Settings', icon: 'icon-settings', route: '/profile' },               
  { label: 'Logout', icon: 'logout', route: '/auth/login' },
];
