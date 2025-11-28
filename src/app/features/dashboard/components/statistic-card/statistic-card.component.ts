import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  standalone: false,
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.css'
})
export class StatisticCardComponent {
  @Input() number = 0;
  @Input() label = String.Empty;
}
