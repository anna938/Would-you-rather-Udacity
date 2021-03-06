import { saveQuestionAnswer } from '../utils/api'
//import {save_question_answer_user} from './users'
//import {AddQuestionUser} from './users'

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'
export const RECEIVED_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion(question) {

    return {
        type: ADD_QUESTION,
        question
    }
}




export function receiveQuestions(questions) {
    return {
        type: RECEIVED_QUESTIONS,
        questions,
    }
}

export function save_question_answer({ authUser, id, vote, questionCopy }) {
    console.log('Test:', id, authUser, vote)

    return {
        type: SAVE_QUESTION_ANSWER,

        authUser,
        id,
        vote
    }

}

export function handleQuestionAnswer(info) {
    console.log("info:", info)


    return (dispatch) => {
        dispatch(save_question_answer(info))

        return (saveQuestionAnswer({
            authedUser: info.authUser, qid: info.id, answer: info.vote
        })).catch((e) => {
            console.log("error in handleQuestionAnswer:", e)
            dispatch(save_question_answer(info))
            alert('there was an error answering the question, try again')
        })
    }
}