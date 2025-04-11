import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContrattoComponent } from './pages/contratto/contratto.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contratto', component: ContrattoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
