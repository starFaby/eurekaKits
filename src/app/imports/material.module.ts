import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatSidenavModule, MatListModule,
         MatIconModule, MatToolbarModule } from '@angular/material';
const MaterialComponents = [
  MatButtonModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
