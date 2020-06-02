import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatExpansionModule, MatSidenavModule, MatListModule,
  MatIconModule, MatToolbarModule, MatFormFieldModule, MatRadioModule,
  MatSelectModule, MatInputModule, MatGridListModule, MatCardModule,
  MatTableModule, MatPaginatorModule, MatDialogModule, MatTabsModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule,
  MatBadgeModule, MatTooltipModule, MatMenuModule
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
  MatAutocompleteModule,
  MatBadgeModule,
  MatTooltipModule,
  MatMenuModule
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
