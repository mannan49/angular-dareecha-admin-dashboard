import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutoResizeDirective } from '@shared/directives/auto-resize.directive';

import { McqsRoutingModule } from './mcqs-routing.module';
import { InputComponent } from '@shared/components/input/input.component';
import { RadioComponent } from '@shared/components/radio/radio.component';
import { McqFormComponent } from './components/mcq-form/mcq-form.component';
import { McqsOcrComponent } from './components/mcqs-ocr/mcqs-ocr.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";
import { McqsTableComponent } from './components/mcqs-table/mcqs-table.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { McqsContainerComponent } from './components/mcqs-container/mcqs-container.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { DropdownFiltersComponent } from '@shared/components/dropdown-filters/dropdown-filters.component';
import { SingleChapterMcqsComponent } from './components/single-chapter-mcqs/single-chapter-mcqs.component';
import { GeneratedMcqsTableComponent } from './components/generated-mcqs-table/generated-mcqs-table.component';
import { PaginationActionsComponent } from '@shared/components/pagination-actions/pagination-actions.component';

@NgModule({
  declarations: [
    McqsContainerComponent,
    McqFormComponent,
    McqsTableComponent,
    SingleChapterMcqsComponent,
    McqsOcrComponent,
    GeneratedMcqsTableComponent,
  ],
  imports: [
    CommonModule,
    InputComponent,
    RadioComponent,
    ButtonComponent,
    SelectComponent,
    LoaderComponent,
    SpinnerComponent,
    McqsRoutingModule,
    DropdownComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    AutoResizeDirective,
    MultiSelectComponent,
    DropdownFiltersComponent,
    PaginationActionsComponent,
],
})
export class McqsModule {}
