import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';

import { Note } from '@models/entities/note.model';
import { Dialog } from '@models/shared/dialog.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-notes-table',
  standalone: false,
  templateUrl: './notes-table.component.html',
  styleUrl: './notes-table.component.css',
})
export class NotesTableComponent {
  @Input() pagedNotes: PagedResponse<Note>;
  @Output() deleteButtonClicked = new EventEmitter<string>();

  constructor(private router: Router, private dialogService: DialogService) {}

  onEditButtonClick(noteId: string) {
    this.router.navigate([`notes/form/${noteId}`]);
  }

  onPdfIconClick(url: string) {
    window.open(url, '_blank');
  }

  onDeleteButtonClick(chapterId: string) {
    const dialogText: Dialog = {
      title: 'Delete Resource',
      message: 'Are you sure you want to delete this resource?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonClass: 'bg-secondary',
    };

    this.dialogService.confirm(dialogText).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteButtonClicked.emit(chapterId);
      }
    });
  }
}
