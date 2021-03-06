import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material-module';

import { ThumbnailSliderComponent } from '../thumbnail-slider/thumbnail-slider.component'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
    declarations: [
        ThumbnailSliderComponent,

    ],
    imports: [
        CommonModule,
        MaterialModule,
        NgxGalleryModule
    ],
    exports: [
        ThumbnailSliderComponent
    ],
})
export class ThumbnailSliderModule {}