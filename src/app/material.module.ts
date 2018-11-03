import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialModule { }
