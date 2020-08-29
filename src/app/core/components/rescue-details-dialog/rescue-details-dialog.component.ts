import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UpdatedRescue, UpdateResponse } from '../../models/outstanding-case';

export interface DialogData {
    emergencyCaseId: number;
    emergencyNumber: number;
    recordForm: FormGroup;
}


interface CanExitChange {
    outcomeUpdateComplete: number;
    rescueDetailsUpdateComplete: number;
}

@Component({
    selector: 'rescue-details-dialog',
    templateUrl: './rescue-details-dialog.component.html',
    styleUrls: ['./rescue-details-dialog.component.scss'],
})
export class RescueDetailsDialogComponent implements OnInit {
    result: UpdateResponse;
    canExit: FormGroup;

  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<RescueDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  ngOnInit() {

    this.result = {
      success: 0,
      socketEndPoint: null
    }

    this.data.recordForm = this.fb.group({

      emergencyDetails: this.fb.group({
        emergencyCaseId: [this.data.emergencyCaseId],
        callDateTime: [''],
        updateTime: ['']
      }),
      callOutcome: this.fb.group({
        callOutcome: ['']
      })
    });

    this.canExit = this.fb.group({
      outcomeUpdateComplete: [0],
      rescueDetailsUpdateComplete: [0]
    });

    this.canExit.valueChanges.subscribe((values:CanExitChange) => {

      //TODO update this to handle any errors and display them to a toast.
      if(values.outcomeUpdateComplete != 0 && values.rescueDetailsUpdateComplete != 0){

        this.result.success = 1;

        this.dialogRef.close(this.result);
      }
    });

   }

  onCancel(): void {
    this.dialogRef.close(this.result);
  }

  onRescueDetailsResult(result:UpdateResponse){
    this.canExit.get("rescueDetailsUpdateComplete").setValue(result.success);
  }

  onOutcomeResult(result:UpdateResponse){
    this.canExit.get("outcomeUpdateComplete").setValue(result.success);
  }
}
