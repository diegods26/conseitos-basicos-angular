import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  cancel() : void {
    this.dialogRef.close(false);
  }

  confirm() : void {
    this.dialogRef.close(true);
  }

}
