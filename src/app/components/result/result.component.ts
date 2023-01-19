import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  quiz: Quiz | undefined

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.quizService.getQuizById(id).subscribe({
        next:(quiz: Quiz) => {
          this.quiz = quiz
          if(this.quiz.finalScore === null) this.router.navigate([''])
        },
        error:() => {
          this.router.navigate([''])
        }
      })
    })
  }
}
