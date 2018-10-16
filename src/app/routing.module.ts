import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Ea1Component } from './ea1/ea1.component';
import { Ea2Component } from './ea2/ea2.component';

const routes: Routes = [
  { path: 'ea1', component: Ea1Component },
  { path: 'ea2', component: Ea2Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
