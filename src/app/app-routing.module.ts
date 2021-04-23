import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './templates/home/home.component';
import { LayoutControlComponent } from './layout-control/layout-control.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  //{ path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: '', pathMatch: 'full', component: LayoutControlComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
