import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Dialog } from '@models/shared/dialog.model';
import { Chapter } from '@models/entities/chapter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-chapters-table',
  standalone: false,
  templateUrl: './chapters-table.component.html',
  styleUrl: './chapters-table.component.css',
})
export class ChaptersTableComponent {
  @Input() pagedChapters: PagedResponse<Chapter>;
  @Output() deleteButtonClicked = new EventEmitter<string>();

  constructor(private router: Router, private dialogService: DialogService) {}

  onEditButtonClick(chapterId: string) {
    this.router.navigate([`chapters/form/${chapterId}`]);
  }

  onDeleteButtonClick(chapterId: string) {
    const dialogText: Dialog = {
      title: 'Delete Chapter',
      message: 'Are you sure you want to delete this chapter?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonClass: 'bg-secondary'
    };

    this.dialogService.confirm(dialogText).subscribe((confirmed: boolean) => {
      if(confirmed){
        this.deleteButtonClicked.emit(chapterId);
      }
    });
  }
}
