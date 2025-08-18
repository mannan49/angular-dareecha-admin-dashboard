import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ValidateControlDirective } from '@shared/directives/validate-control.directive';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [ValidateControlDirective, ErrorMessageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() type = 'text';
  @Input() classes = 'font-medium';
  @Input() label = String.Empty;
  @Input() placeholder = String.Empty;
  @Input() controlName = String.Empty;

  control: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.control = this.controlContainer.control?.get(this.controlName) as FormControl;
  }
}
