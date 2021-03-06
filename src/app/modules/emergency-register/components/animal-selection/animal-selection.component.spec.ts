import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AnimalSelectionComponent } from './animal-selection.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TagNumberDialog } from '../tag-number-dialog/tag-number-dialog.component';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnimalSelectionComponent', () => {
  let component: AnimalSelectionComponent;
  let fixture: ComponentFixture<AnimalSelectionComponent>;

  const mockDialogRef = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };

  const dialogData = {};

  let dialog: MatDialogRef<TagNumberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
      providers: [MatDialog, OVERLAY_PROVIDERS,
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogData },
        {
        provide: MatDialogRef,
        useValue: mockDialogRef
      }],
      declarations: [ AnimalSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(AnimalSelectionComponent);
    component = fixture.componentInstance;

    component.recordForm = fb.group({

      emergencyDetails: fb.group({
        emergencyCaseId: [1],
        updateTime: ['']
      }),
      callOutcome: fb.group({
        callOutcome: ['']
      })
    });

    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
