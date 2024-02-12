import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SuccessRegistrationComponent } from './pages/success-registration/success-registration.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BusinessListComponent } from './components/business-list/business-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, children: [
    { path: "", redirectTo:"business-list", pathMatch: "full" },
    { path: "business-list", component:  BusinessListComponent },
    { path: "user-detail", component: UserDetailComponent }
  ]  },
  { path: 'success-registration', component: SuccessRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
