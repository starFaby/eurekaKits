import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatExpansionModule, MatSidenavModule, MatListModule,
  MatIconModule, MatToolbarModule, MatFormFieldModule, MatRadioModule,
  MatSelectModule, MatInputModule, MatGridListModule, MatCardModule,
  MatTableModule, MatPaginatorModule, MatDialogModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

const MaterialComponents = [
  MatButtonModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  LayoutModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
