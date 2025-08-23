import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesContainerComponent } from './notes-container.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';

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
  },
  {
    path: "books",
    component: BooksContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
