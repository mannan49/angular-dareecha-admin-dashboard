import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@shared/guard/auth.guard';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'mcqs',
        loadChildren: () => import('@features/mcqs/mcqs.module').then(m => m.McqsModule),
      },
      {
        path: 'chapters',
        loadChildren: () => import('@features/chapters/chapters.module').then(m => m.ChaptersModule),
      },
      {
        path: 'notes',
        loadChildren: () => import('@features/notes/notes.module').then(m => m.NotesModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    data: { guestOnly: true },
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
