import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Marker } from 'src/app/models/marker';
import { Time } from 'src/app/models/time';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @ViewChild('map') map: google.maps.Map | undefined
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false
  };

  quiz: Quiz | undefined
  timer: Time | undefined
  timerInterval: any
  number: number = 0

  marker: Marker | undefined
  markerResult: Marker | undefined

  polylineOptions: google.maps.PolylineOptions = {
    path: [],
    strokeOpacity: 1.0,
    strokeWeight: 2
  };

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.quizService.getQuizById(id).subscribe({
        next:(quiz: Quiz) => {
          this.quiz = quiz
          this.initQuestion()
        },
        error:() => {
          this.router.navigate([''])
        }
      })
    })
  }

  initQuestion() {
    if(!this.quiz) return
    const indexQust = this.quiz.questions.findIndex(question => question.timeStart && !question.timeEnd)
    if(indexQust >= 0) {
      this.number = indexQust
      this.getQuestion(true)
    }
    else {
      const questionsDone = this.quiz.questions.filter(question => question.score !== null)
      if(questionsDone.length > 0) {
        this.number = (questionsDone.length-1)
        this.getQuestion(false)
      } else {
        this.setNextQuestion()
      }
    }
  }

  setNextQuestion() {
    if(!this.quiz) return
    this.number = this.quiz.questions.findIndex(question => question.score === null)
    if(this.number >= 0) {
      this.marker = undefined
      this.markerResult = undefined
      this.getQuestion(true)
    } else {
      this.router.navigate([`quiz/${this.quiz._id}/result`])
    }
  }

  getQuestion(setTimer: boolean) {
    if(!this.quiz) return
    this.quizService.getQuestion(this.quiz._id, this.quiz.questions[this.number]._id).subscribe((question: Question) => {
      if(this.quiz) {
        this.quiz.questions[this.number] = question
        if(setTimer) {
          this.setTimer(question.time)
        } else {
          this.markerResult = {
            lat: question.monument.latitude,
            lng: question.monument.longitude
          }
          this.marker = {
            lat: question.userAnswerLatitude,
            lng: question.userAnswerLongitude
          }
          this.timer = question.time
          this.fitBounds()
        }

      }
    })
  }

  fitBounds() {      
    if(this.marker && this.markerResult && this.map) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(this.marker)
      bounds.extend(this.markerResult)
      this.map.fitBounds(bounds)
    }
  }

  setTimer(initial: Time | undefined) {
    this.timer = initial
    this.timerInterval = setInterval(()=> { 
      if(typeof this.timer?.seconds === 'number' && typeof this.timer?.minutes === 'number') {
        this.timer.seconds++
        if(this.timer.seconds === 60) {
          this.timer.seconds = 0
          this.timer.minutes++
        }
      }
    }, 1000)
  }

  setPoint(event: any) {
    if(this.markerResult) return
    this.marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
  }

  setAnswer() {
    if(!this.quiz || !this.marker) return
    this.quizService.setAnswer(this.quiz._id, this.quiz?.questions[this.number]._id, this.marker.lat, this.marker.lng).subscribe((question: Question) => {
      if(this.quiz) {
        clearInterval(this.timerInterval)
        this.timer = question.time
        this.quiz.questions[this.number] = question
        this.markerResult = {
          lat: question.monument.latitude,
          lng: question.monument.longitude
        }
        this.fitBounds()
      }
    })
  }
}
