import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ClassSubjectMcq } from '@models/response/class-subject-mcq.model';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @Input() data: ClassSubjectMcq[] = [];
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  // barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['9th Class', '10th Class', '11th Class', '12th Class', 'MDCAT', 'ECAT', 'FUNGAT'],
  //   datasets: [
  //   {
  //     data: [65, 59, 80, 81, 56, 55, 40],
  //     label: 'Physics',
  //     backgroundColor: '#690B22'
  //   },
  //   {
  //     data: [28, 48, 40, 19, 86, 27, 90],
  //     label: 'Chemistry',
  //     backgroundColor: '#E07A5F'
  //   },
  //   {
  //     data: [45, 38, 60, 90, 66, 35, 78],
  //     label: 'Biology',
  //     backgroundColor: '#F1E3D3'
  //   },
  //   {
  //     data: [55, 48, 70, 85, 76, 45, 88],
  //     label: 'Computer Science',
  //     backgroundColor: '#1B4D3E'
  //   }
  // ]
  // };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateChartData();
    }
  }

  updateChartData() {
    if (!this.data || this.data.length === 0) return;

    const allClasses = Array.from(
      new Set(this.data.flatMap(subject => subject.ClassCounts.map(c => c.Display)))
    ).sort();

    this.barChartData.labels = allClasses;

    this.barChartData.datasets = this.data.map((subject, index) => {
      const colors = ['#690B22', '#E07A5F', '#F1E3D3', '#1B4D3E', '#4B0082', '#FF8C00', '#008080'];
      const backgroundColor = colors[index % colors.length];
      const data = allClasses.map(cls => {
        const found = subject.ClassCounts.find(c => c.Display === cls);
        return found ? Number(found.Value) : 0;
      });

      return {
        label: subject.Subject,
        data,
        backgroundColor,
      };
    });
  }
}
