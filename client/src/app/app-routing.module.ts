import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlatesComponent} from './components/flates/flates.component'
import { RegestrationComponent } from './components/regestration/regestration.component';
import { FlatDetailsComponent } from './components/flates/flat-details/flat-details.component';

const routes: Routes = [
  {path: 'register',
  component: RegestrationComponent},
  {path: 'flats',
  component: FlatesComponent},
  {path: 'flats/:id',
  component: FlatDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
