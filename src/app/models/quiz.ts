import { Question } from "./question";
import { Time } from "./time";

export interface Quiz {
    _id: string
    user: {
        pseudo: string
    }
    finalScore: number
    createdAt: Date
    updatedAt: Date
    time: Time
    questions: Question[]
}