import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PieChartComponent } from '@shared/components/pie-chart/pie-chart.component';
import { BarChartComponent } from '@shared/components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from '@shared/components/doughnut-chart/doughnut-chart.component';
import { PloarAreaChartComponent } from '@shared/components/ploar-area-chart/ploar-area-chart.component';
import { RadarChartComponent } from '@shared/components/radar-chart/radar-chart.component';
import { BubbleChartComponent } from '@shared/components/bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from '@shared/components/scatter-chart/scatter-chart.component';
import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';

@NgModule({
  declarations: [DashboardComponent, StatisticCardComponent],
  imports: [
    CommonModule,
    LoaderComponent,
    ButtonComponent,
    PieChartComponent,
    BarChartComponent,
    BaseChartDirective,
    ReactiveFormsModule,
    LineChartComponent,
    RadarChartComponent,
    ScatterChartComponent,
    BubbleChartComponent,
    DashboardRoutingModule,
    DoughnutChartComponent,
    PloarAreaChartComponent,
  ],
})
export class DashboardModule {}
