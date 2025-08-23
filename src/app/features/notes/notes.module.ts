import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesContainerComponent } from './notes-container.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesCardComponent } from './components/notes-card/notes-card.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { NotesTableComponent } from './components/notes-table/notes-table.component';
import { NotesDetailComponent } from './components/notes-detail/notes-detail.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { PaginationActionsComponent } from '@shared/components/pagination-actions/pagination-actions.component';
import { DropdownFiltersComponent } from '@shared/components/dropdown-filters/dropdown-filters.component';

@NgModule({
  declarations: [
    NotesListComponent,
    NotesCardComponent,
    NotesFormComponent,
    NotesTableComponent,
    NotesDetailComponent,
    NotesContainerComponent,
    BooksContainerComponent,
  ],
  imports: [
    CommonModule,
    InputComponent,
    LoaderComponent,
    SelectComponent,
    ButtonComponent,
    DropdownComponent,
    SearchBarComponent,
    NotesRoutingModule,
    ReactiveFormsModule,
    DropdownFiltersComponent,
    PaginationActionsComponent,
  ],
})
export class NotesModule {}
