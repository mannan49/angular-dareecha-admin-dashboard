import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DashboardComponent } from './dashboard.component';
import { BusPreviewCardComponent } from '../../shared/components/bus-preview-card/bus-preview-card.component';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@NgModule({
  declarations: [BookingFormComponent, DashboardComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule, ButtonComponent, BusPreviewCardComponent, LoaderComponent],
})
export class DashboardModule {}
