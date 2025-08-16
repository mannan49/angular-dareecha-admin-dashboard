import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'Add Notes', icon: 'icon-cloud_upload', route: '/notes' },          
  { label: 'Add Chapters', icon: 'icon-folder-add', route: '/chapters' },                
  { label: 'Add Mcqs', icon: 'icon-edit', route: '/mcqs' },              
  { label: 'Add Books', icon: 'icon-drive_folder_upload', route: '/rfid-card' },         
  { label: 'Settings', icon: 'icon-settings', route: '/profile' },               
  { label: 'Logout', icon: 'logout', route: '/auth/login' },
];
