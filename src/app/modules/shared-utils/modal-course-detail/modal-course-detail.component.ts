import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-course-detail',
  templateUrl: './modal-course-detail.component.html',
  styleUrls: ['./modal-course-detail.component.scss']
})
export class ModalCourseDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalCourseDetailComponent>,
    private router: Router
  ) {}

  closeDialog(){
    this.dialogRef.close();
  }

  redirectTo(path: string){
    this.router.navigate([path]);
    this.closeDialog();
  }
}
