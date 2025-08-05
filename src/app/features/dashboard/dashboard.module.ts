import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DashboardComponent } from './dashboard.component';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@NgModule({
  declarations: [ DashboardComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule, ButtonComponent, LoaderComponent],
})
export class DashboardModule {}
