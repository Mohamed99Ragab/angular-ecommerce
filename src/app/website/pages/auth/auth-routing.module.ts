import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { GuestGuard } from 'src/app/guards/guest.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[GuestGuard]},
  {path:'register',component:RegisterComponent,canActivate:[GuestGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
