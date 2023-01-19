import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { faGlobeEurope, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  faGlobe: IconDefinition = faGlobeEurope
  loginForm = this.formBuilder.group({
    email: '', 
    pseudo: '',
    password: '',
    confirmPassword: ''
  })
  errors:  string = ''

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private quizService: QuizService) {}

  canValide() {
    return !(
      this.loginForm.value.email && this.loginForm.value.email.length > 0 && 
      this.loginForm.value.pseudo && this.loginForm.value.pseudo.length > 0 && 
      this.loginForm.value.password && this.loginForm.value.password.length > 0 &&
      this.loginForm.value.confirmPassword && this.loginForm.value.confirmPassword.length > 0)
  }

  onSubmit() {
    const email = this.loginForm.value.email
    const pseudo = this.loginForm.value.pseudo
    const password = this.loginForm.value.password
    const confirmPassword = this.loginForm.value.confirmPassword
    if(email && pseudo && password && confirmPassword) {
      this.quizService.register(email, pseudo, password, confirmPassword).subscribe({
        next: () => {
          this.router.navigate(['login'])
        },
        error: (error) => {
          if(error?.error?.message) {
            this.errors = error.error.message
          }
        }
      })
    }
  }
}
