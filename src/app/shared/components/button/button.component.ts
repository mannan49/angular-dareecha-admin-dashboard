import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type = 'button';
  @Input() className = String.Empty;
  @Input() label = String.Empty;
  @Output() onClick = new EventEmitter<void>();

  onButtonClick() {
    if (!this.loading && !this.disabled) {
      this.onClick.emit();
    }
  }
}
