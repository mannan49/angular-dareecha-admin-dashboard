import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { Dialog } from '@models/shared/dialog.model';

import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })

export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirm(data: Dialog): Observable<boolean> {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data,
      disableClose: true,
    });
    return ref.afterClosed();
  }
}
