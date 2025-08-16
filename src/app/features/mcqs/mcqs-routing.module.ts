import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { McqsContainerComponent } from './components/mcqs-container/mcqs-container.component';
import { McqFormComponent } from './components/mcq-form/mcq-form.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: McqsContainerComponent
  },
  {
    path: "form/:id",
    component: McqFormComponent
  },
  {
    path: "form",
    component: McqFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class McqsRoutingModule { }
