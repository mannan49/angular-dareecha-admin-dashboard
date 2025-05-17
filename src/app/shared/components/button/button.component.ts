import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type = "button";
  @Input() className = String.Empty;

}
