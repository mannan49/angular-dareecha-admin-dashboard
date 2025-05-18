import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';

import { TikcetsListComponent } from './tikcets-list.component';
import { TikcetCardComponent } from './tikcet-card/tikcet-card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

import { ExtractSeatNumberPipe } from '@shared/pipes/extract-seat-number.pipe';

@NgModule({
  declarations: [
    TikcetCardComponent,
    TikcetsListComponent
  ],
  imports: [
    CommonModule,
    LoaderComponent,
    ButtonComponent,
    TicketRoutingModule,
    ExtractSeatNumberPipe,
  ]
})
export class TicketModule { }
