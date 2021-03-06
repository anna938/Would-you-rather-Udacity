import { getInitialData, saveQuesions } from '../utils/api'
import { receiveUsers, AddQuestionUser, save_question_answer_user } from './users'
import { receiveQuestions, addQuestion } from '../actions/questions'
//import { setAuthUser } from '../actions/authorizedUser'
import { setAuthUser } from './authUser'

const AUTH_ID = null

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthUser(AUTH_ID))
            })
    }
}

export function handleChangeAuth(authUserID) {
    return (dispatch) => {
        dispatch(setAuthUser(authUserID))
    }
}


export function handleAddQuestion(question) {
    return (dispatch, getState) => {
        const authedUser = question.authedUser
        //const timeStamp= Date.now()
        //console.log(timeStamp)
        return saveQuesions({
            optionOneText: question.optionOne, optionTwoText: question.optionTwo, author: authedUser,
        }).then(question => {

            dispatch(addQuestion(question))
            dispatch(AddQuestionUser(question))

        })
    }
}

export function handleAnswerQuestionUser({ authUser, id, vote }) {

    return (dispatch) => {

        console.log("made it to handleAddQuestionUser", authUser, id, vote)
        dispatch(save_question_answer_user({ authUser, id, vote }))
    }
}