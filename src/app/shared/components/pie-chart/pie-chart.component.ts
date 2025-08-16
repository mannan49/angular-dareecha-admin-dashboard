import { ChartOptions } from 'chart.js';
import { Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = ['9th Class', '10th Class' , '11th Class', '12th Class'];
  public pieChartDatasets = [
    {
      data: [300, 500, 100, 200],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
}
