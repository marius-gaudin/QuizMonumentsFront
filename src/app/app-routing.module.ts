import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './auth/authorize.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionComponent } from './components/question/question.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthorizeGuard] },
  { path: 'quiz/:id', component: QuestionComponent, canActivate: [AuthorizeGuard] },
  { path: 'quiz/:id/result', component: ResultComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AppRoutingModule { }
