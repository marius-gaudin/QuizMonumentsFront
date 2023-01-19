import { Monument } from "./monument";
import { Time } from "./time";

export interface Question {
    _id: string
    quiz: string
    monument: Monument
    number: number
    userAnswerLatitude: number
    userAnswerLongitude: number
    timeStart: Date
    timeEnd: Date
    score: number
    distance: {
        value: number
        unit: string
    }
    time: Time
    totalScore: number
}