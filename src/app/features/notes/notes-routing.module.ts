import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesContainerComponent } from './notes-container.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: NotesContainerComponent,
  },
  {
    path: "form/:id",
    component: NotesFormComponent,
  },
  {
    path: "form",
    component: NotesFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
