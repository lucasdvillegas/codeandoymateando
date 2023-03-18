import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursesComponent } from './pages/curses/curses.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  { path: '**', component:HomeComponent },
  { path: 'home', component:HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'curses', canActivate: [AuthGuard], component: CursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
