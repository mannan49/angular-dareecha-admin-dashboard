import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ValidateControlDirective } from '@shared/directives/validate-control.directive';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidateControlDirective, ErrorMessageComponent],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioComponent {
  @Input() label = String.Empty;
  @Input() controlName = String.Empty;
  @Input() options: any[] = [];
  @Input() valueField = 'Value';
  @Input() displayField = 'Display';

  @Output() selectionChanged = new EventEmitter<any>();

  control: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.control = this.controlContainer.control?.get(this.controlName) as FormControl;
    this.control?.valueChanges.subscribe(value => {
      this.selectionChanged.emit(value);
    });
  }
}
