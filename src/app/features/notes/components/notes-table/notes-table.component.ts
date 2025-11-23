import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  @Input() isTextBookResource = false;
  @Output() deleteButtonClicked = new EventEmitter<string>();

  cloudFrontUrl = environment.cloudFrontUrl;

  constructor(private router: Router, private dialogService: DialogService) {}

  onEditButtonClick(noteId: string) {
    if (this.isTextBookResource) {
      this.router.navigate([`notes/form/${noteId}`], {
        queryParams: { type: 'textbook' },
      });
    } else {
      this.router.navigate([`notes/form/${noteId}`]);
    }
  }

  onPdfIconClick(url: string) {
    const newUrl = this.cloudFrontUrl + url;
    window.open(newUrl, '_blank');
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
