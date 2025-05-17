import { MenuItem } from '@models/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'Companies', icon: 'business', route: '/companies' },
  { label: 'Tickets', icon: 'confirmation_number', route: '/bookings' },
  { label: 'RFID Card', icon: 'credit_card', route: '/rfid-card' },
  { label: 'GPS Tracking', icon: 'location_on', route: '/map' },
  { label: 'My Profile', icon: 'account_circle', route: '/profile' },
];
