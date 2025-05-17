import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { faArrowRight, faBus } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Bus } from '@models/bus.model';

@Component({
  selector: 'app-bus-preview-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './bus-preview-card.component.html',
  styleUrl: './bus-preview-card.component.css',
})
export class BusPreviewCardComponent {
  @Input() bus: Bus;
  constructor(library: FaIconLibrary) {
    library.addIcons(faBus, faArrowRight);
  }
}
