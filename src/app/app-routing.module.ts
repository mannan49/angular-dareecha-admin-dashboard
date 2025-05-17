import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('@features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      // {
      //   path: 'auth',
      //   loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule),
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('@features/settings/settings.module').then(m => m.SettingsModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
