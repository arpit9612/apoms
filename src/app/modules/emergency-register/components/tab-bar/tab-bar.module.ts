import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarComponent } from './tab-bar.component';
import { EmergencyRecordModule } from '../emergency-record/emergency-record.module';
import { RecordSearchModule } from 'src/app/core/components/record-search/record-search.module';
import { RescueDetailsModule } from 'src/app/core/components/rescue-details/rescue-details.module';
import { MaterialModule } from 'src/app/material-module';
import { EmergencyDetailsModule } from 'src/app/core/components/emergency-details/emergency-details.module';


@NgModule({
    declarations: [
        TabBarComponent,

    ],
    imports: [
        CommonModule,
        EmergencyRecordModule,
        RecordSearchModule,
        RescueDetailsModule,
        EmergencyDetailsModule,
        MaterialModule
    ],
    exports: [
        TabBarComponent
    ],
})
export class TabBarModule {}