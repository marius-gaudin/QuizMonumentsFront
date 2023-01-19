import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { faGlobeEurope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faGlobe: IconDefinition = faGlobeEurope
  loginForm = this.formBuilder.group({
    login: '', 
    password: ''
  })
  errors:  string = ''

  constructor(
    private jwtTokenService: JwtTokenService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private quizService: QuizService) {}

  canValide() {
    return !(
      this.loginForm.value.login && this.loginForm.value.login.length > 0 && 
      this.loginForm.value.password && this.loginForm.value.password?.length > 0
    )
  }

  onSubmit() {
    const login = this.loginForm.value.login
    const password = this.loginForm.value.password
    if(login && password) {
      this.quizService.login(login, password).subscribe({
        next: (result: any) => {
          if(result?.token) {
            this.errors = ''
            this.jwtTokenService.setToken(result.token)
            this.router.navigate([''])
          } else {
            this.errors = 'Erreur serveur'
          }

        },
        error: (error) => {
          console.log(error)
          if(error?.error?.message) {
            this.errors = error.error.message
          }
        }
      })
    }
  }
}
