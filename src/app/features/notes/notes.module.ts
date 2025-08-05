import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesContainerComponent } from './notes-container.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesCardComponent } from './components/notes-card/notes-card.component';
import { NotesDetailComponent } from './components/notes-detail/notes-detail.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { NotesFilterComponent } from './components/notes-filter/notes-filter.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from "@shared/components/loader/loader.component";


@NgModule({
  declarations: [
    NotesContainerComponent,
    NotesListComponent,
    NotesCardComponent,
    NotesDetailComponent,
    NotesFilterComponent
  ],
  imports: [
    CommonModule,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NotesRoutingModule,
    LoaderComponent
]
})
export class NotesModule { }
