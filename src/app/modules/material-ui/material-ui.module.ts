import { NgModule } from '@angular/core';
//import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

const modules = [
  //CdkTableModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatSliderModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatExpansionModule,
  MatCheckboxModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}