import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { McqsRoutingModule } from './mcqs-routing.module';
import { InputComponent } from '@shared/components/input/input.component';
import { RadioComponent } from '@shared/components/radio/radio.component';
import { McqFormComponent } from './components/mcq-form/mcq-form.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { McqsContainerComponent } from './components/mcqs-container/mcqs-container.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { PaginationActionsComponent } from '@shared/components/pagination-actions/pagination-actions.component';
import { McqsTableComponent } from './components/mcqs-table/mcqs-table.component';

@NgModule({
  declarations: [
    McqsContainerComponent,
    McqFormComponent,
    McqsTableComponent,
  ],
  imports: [
    CommonModule,
    InputComponent,
    RadioComponent,
    ButtonComponent,
    SelectComponent,
    LoaderComponent,
    McqsRoutingModule,
    DropdownComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    MultiSelectComponent,
    PaginationActionsComponent,
  ]
})
export class McqsModule { }
