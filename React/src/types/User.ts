import { Feedback } from "../components/FeedbackSection"
import { Question } from "../components/QuestionsList"

export type UserType = {
    id?: number,
    userName: string,
    email: string,
    password: string,
    roleId?: number,
    points?: number,
    sendQuestion?: boolean,
    sendFeedback?: boolean,
    questions?:Question[]
}

export type LoginUserType = {
   
    email: string,
    password: string,
}
export type RegisterUserType = {

    name: string,
    email: string,
    password: string,
    roleId: number,
    sendQuestion?: boolean,
    sendFeedback?: boolean,
}
export type UserState={
    user: UserType|null,
    loading: boolean,
    error: string | null
}
export type QuestionState={
    questions: Question[],
    loading: boolean,
    error: string | null
}
export type FeedbackState={
    feedbacks: Feedback,
    loading: boolean,
    error: string | null
}
