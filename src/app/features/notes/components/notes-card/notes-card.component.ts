import { Component, Input } from '@angular/core';
import { Note } from '@models/entities/note.model';

@Component({
  selector: 'app-notes-card',
  standalone: false,
  templateUrl: './notes-card.component.html',
  styleUrl: './notes-card.component.css'
})
export class NotesCardComponent {
  @Input() note : Note;

  onDownlaodButtonClick(){
    window.open(this.note?.file?.url, '_blank');
  }
}
