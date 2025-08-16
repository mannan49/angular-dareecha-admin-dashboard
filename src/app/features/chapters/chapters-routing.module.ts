import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChaptersFormComponent } from './components/chapters-form/chapters-form.component';
import { ChaptersTableComponent } from './components/chapters-table/chapters-table.component';
import { ChaptersContainerComponent } from './components/chapters-container/chapters-container.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: ChaptersContainerComponent
  },
  {
    path: "form/:id",
    component: ChaptersFormComponent
  },
  {
    path: "form",
    component: ChaptersFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaptersRoutingModule { }
