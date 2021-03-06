import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  patientId: number;
  tagNumber: string;
}

@Component({
  selector: 'patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditDialog implements OnInit {
  
  patientId:number;
  @Input() patientStatusForm;

  constructor(
    public dialogRef: MatDialogRef<PatientEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  ngOnInit() {
    this.patientId = this.data.patientId;
   }

  onCancel(): void {
    this.dialogRef.close();
  }

}
