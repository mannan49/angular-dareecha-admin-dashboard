import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { McqFormComponent } from './components/mcq-form/mcq-form.component';
import { McqsContainerComponent } from './components/mcqs-container/mcqs-container.component';
import { SingleChapterMcqsComponent } from './components/single-chapter-mcqs/single-chapter-mcqs.component';

const routes: Routes = [
  
  {
    path: String.Empty,
    component: McqsContainerComponent,
  },
  {
    path: 'form',
    component: McqFormComponent,
  },
  {
    path: 'form/:id',
    component: McqFormComponent,
  },
  {
    path: ':id',
    component: SingleChapterMcqsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McqsRoutingModule {}
