import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TikcetsListComponent } from './tikcets-list.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: TikcetsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
