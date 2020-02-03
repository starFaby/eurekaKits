import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: '', component: AdminlayoutComponent,
    children: [
      {path: '', loadChildren: './layouts/adminlayout/adminlayout.module#AdminlayoutModule'}
    ],
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
