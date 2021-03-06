import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CensusPageRoutingModule } from './census-page-routing.module';
import { CensusPageComponent } from './census-page.component';

@NgModule({
  declarations: [CensusPageComponent],
  imports: [
    CommonModule,
    CensusPageRoutingModule
  ]
})
export class CensusPageModule { }
