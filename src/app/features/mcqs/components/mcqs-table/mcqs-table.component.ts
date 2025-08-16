import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Mcq } from '@models/entities/mcq.model';
import { Dialog } from '@models/shared/dialog.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-mcqs-table',
  standalone: false,
  templateUrl: './mcqs-table.component.html',
  styleUrl: './mcqs-table.component.css'
})
export class McqsTableComponent {

  @Input() pagedMcqs : PagedResponse<Mcq>;
  @Output() deleteButtonClicked =  new EventEmitter<string>();

  constructor(private router: Router, private dialogService : DialogService) {}

  onEditButtonClick(mcqId: string){
    this.router.navigate([`mcqs/form/${mcqId}`]);
  }

  isCorrectOption(mcq: Mcq, option: McqOption): boolean {
    return mcq?.correctOption?.refId === option?.mcqId || mcq?.correctOption?.text === option?.text;
  }

  onDeleteMcqButtonClick(mcqId: string) {
      const dialogText: Dialog = {
        title: 'Delete MCQ',
        message: 'Are you sure you want to delete this MCQ?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmButtonClass: 'bg-secondary'
      };
  
      this.dialogService.confirm(dialogText).subscribe((confirmed: boolean) => {
        if(confirmed){
          this.deleteButtonClicked.emit(mcqId);
        }
      });
    }

}
