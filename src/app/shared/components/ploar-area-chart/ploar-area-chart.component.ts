import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-ploar-area-chart',
  imports: [BaseChartDirective],
  templateUrl: './ploar-area-chart.component.html',
  styleUrl: './ploar-area-chart.component.css',
})
export class PloarAreaChartComponent {
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [{ data: [300, 500, 100, 40, 120] }];
  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: false,
  };
}
