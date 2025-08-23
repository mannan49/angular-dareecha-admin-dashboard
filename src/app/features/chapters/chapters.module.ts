import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ChaptersRoutingModule } from './chapters-routing.module';

import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { ChaptersFormComponent } from './components/chapters-form/chapters-form.component';
import { ChaptersTableComponent } from './components/chapters-table/chapters-table.component';
import { ChaptersContainerComponent } from './components/chapters-container/chapters-container.component';
import { DropdownFiltersComponent } from '@shared/components/dropdown-filters/dropdown-filters.component';
import { PaginationActionsComponent } from '@shared/components/pagination-actions/pagination-actions.component';


@NgModule({
  declarations: [
    ChaptersTableComponent,
    ChaptersFormComponent,
    ChaptersContainerComponent
  ],
  imports: [
    CommonModule,
    InputComponent,
    SelectComponent,
    LoaderComponent,
    ButtonComponent,
    DropdownComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    ChaptersRoutingModule,
    DropdownFiltersComponent,
    PaginationActionsComponent,
  ]
})
export class ChaptersModule { }
