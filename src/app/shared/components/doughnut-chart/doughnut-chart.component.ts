import { Component, Input } from '@angular/core';
import { Select } from '@models/shared/select.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css',
})
export class DoughnutChartComponent {

  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [] as number[], label: 'MCQs' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  private _data: Select[] = [];
  @Input()
  set data(value: Select[]) {
    this._data = value;
    this.updateChartData();
  }


  private updateChartData() {
    if (!this._data || this._data.length === 0) return;
    this.doughnutChartLabels = this._data.map(x => x?.Display);
    this.doughnutChartDatasets[0].data = this._data.map(x => Number(x?.Value));
  }
}
