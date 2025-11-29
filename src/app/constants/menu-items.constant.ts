import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'Notes', icon: 'icon-file-pdf-o', route: '/notes', exact: true },          
  { label: 'Chapters', icon: 'icon-folder-add', route: '/chapters', exact: false },                
  { label: 'Mcqs', icon: 'icon-edit', route: '/mcqs', exact: false },              
  { label: 'Text Books', icon: 'icon-book', route: '/notes/books', exact: true },         
  { label: 'Lectures', icon: 'icon-youtube1', route: '/auth/login', exact: false },
  { label: 'Settings', icon: 'icon-settings', route: '/profile', exact: false },               
  { label: 'Logout', icon: 'icon-log-out', route: '/auth/login', exact: false },
];
