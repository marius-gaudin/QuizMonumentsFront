import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  url: string = isDevMode() ? 'http://localhost:5002/api/v1/' : 'https://quiz-monuments-api.vercel.app/api/v1/';

  constructor(private _http: HttpClient) { }

  login(login: string, password: string) {
    return this._http.post(`${this.url}users/login`, {login, password})
  }

  register(email:string, pseudo: string, password: string, confirmPassword: string) {
    return this._http.post(`${this.url}users/register`, {email, pseudo, password, 'confirm_password': confirmPassword})
  }

  createQuiz(): Observable<Quiz> {
    return this._http.post<Quiz>(`${this.url}quizzes/new`, { })
  }

  getQuestion(quizId: string, questionId: string): Observable<Question> {
    return this._http.get<Question>(`${this.url}quizzes/${quizId}/question/${questionId}`)
  }

  setAnswer(quizId: string, questionId: string, latitude: number, longitude: number): Observable<Question> {
    return this._http.put<Question>(`${this.url}quizzes/${quizId}/question/${questionId}`, {latitude, longitude})
  }

  getQuizById(quizId: string): Observable<Quiz> {
    return this._http.get<Quiz>(`${this.url}quizzes/${quizId}`)
  }

  getQuizzes(): Observable<Quiz[]> {
    return this._http.get<Quiz[]>(`${this.url}quizzes`)
  }

}
