import { ChartOptions } from 'chart.js';
import { Component, Input } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Select } from '@models/shared/select.model';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  private _data: Select[] = [];
  @Input()
  set data(value: Select[]) {
    this._data = value;
    this.updateChartData();
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartLabels: string[] = [];
  pieChartDatasets = [
    {
      data: [] as number[],
    },
  ];
  pieChartLegend = true;
  pieChartPlugins = [];

  private updateChartData() {
    if (!this._data || this._data.length === 0) return;
    this.pieChartLabels = this._data.map(x => x?.Display);
    this.pieChartDatasets[0].data = this._data.map(x => Number(x?.Value));
  }
}
