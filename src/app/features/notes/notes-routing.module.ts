import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesContainerComponent } from './notes-container.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: NotesContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
