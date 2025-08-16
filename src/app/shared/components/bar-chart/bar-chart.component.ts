import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['9th Class', '10th Class', '11th Class', '12th Class', 'MDCAT', 'ECAT', 'FUNGAT'],
    datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Physics',
      backgroundColor: '#690B22'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Chemistry',
      backgroundColor: '#E07A5F'
    },
    {
      data: [45, 38, 60, 90, 66, 35, 78],
      label: 'Biology',
      backgroundColor: '#F1E3D3'
    },
    {
      data: [55, 48, 70, 85, 76, 45, 88],
      label: 'Computer Science',
      backgroundColor: '#1B4D3E'
    }
  ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}
