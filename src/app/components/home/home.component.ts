import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGlobeEurope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faGlobe: IconDefinition = faGlobeEurope
  maxScore: number | undefined
  quizInProgress: Quiz | undefined

  constructor(private quizService: QuizService, private router: Router) {
    this.quizService.getQuizzes().subscribe(quizzes => {
      if(quizzes.length > 0) {
        this.maxScore = Math.max(...quizzes.map(quiz => quiz.finalScore))
      }
      this.quizInProgress = quizzes.find(quiz => quiz.finalScore === null)
    })
  }

  newQuiz() {
    this.quizService.createQuiz().subscribe({
      next: quiz => {
        this.router.navigate(['quiz', quiz._id])
      },
      error: err => {
        
      }
    })
  }

  continue() {
    this.router.navigate(['quiz', this.quizInProgress?._id])
  }
}
