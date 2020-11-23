import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { handleQuestionAnswer } from '../actions/questions'
//import {save_question_answer_user} from '../actions/users'
//import {AddQuestionUser} from '../actions/users'
import { handleAnswerQuestionUser } from '../actions/shared'
import BarChart from 'react-bar-chart';
import CanvasJSReact from '../chart/canvasjs.react';
import { ProgressBar, Button, container } from 'react-bootstrap';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Result extends Component {
    //constructor(props) {
    //    super(props);



    state = {
        selectedOption: "",
    }

    //  let BarChart = ReactD3.BarChart;
    //var BarChart = require('react-d3-components').BarChart;

    //this.state = { author, id, optionOne, optionTwo, timestamp, redirect: false, users: props.users }

    //this.state = {optionOneText: this.state.OptionOne.text}
    //}
    //  console.log("is state answered?", this.props.answered)


    handleOptionChange = (e) => {

        this.setState({
            selectedOption: e.target.value
        }
        )
    }

    handleQuestionA = (e) => {
        e.preventDefault()

        const { dispatch, authUser, question } = this.props

        const vote = this.state.selectedOption;
        console.log(vote);
        const { id } = this.props;
        //<Redirect to={{
        //    pathname: `/result/${id}`
        //}
        //} />
        //const { id } = this.props
        dispatch(handleAnswerQuestionUser({

            id: question.id,
            authUser,
            vote
        }));
        //this.props.history.push(`/result/${id}`)
        <Redirect to={{ pathname: `/result/:${id}`, state: { id } }} />






        //dispatch(handleQuestionAnswer({

        //    id: question.id,
        //    authUser,
        //    vote
        //})

        //)

        //this.setState({ redirect: true })
    }

    render() {
        const {
            author, id, optionOne, optionTwo, timestamp, name
        } = this.props.question;
        const { selectedOption } = this.state;
        //  const { Quesion } = this.props
        //let optionOneText =  this.state.OptionOne.text
        console.log(this.props.answered);

        //if (this.state.redirect === true) {

        //    return (
        //        <Redirect to={{ pathname: '/' }} />
        //    )
        //}

        //if (this.props.answered === false) {
        return (
            <div className='question'>
                {/*<form onSubmit={this.handleQuestionA}>*/}
                <span>Question: {optionOne.text}?
                        <input type="radio" name={this.props.id} value={'optionOne'} onChange={this.handleOptionChange}></input> or {optionTwo.text}?
                        <input type="radio" name={this.props.id} value={'optionTwo'} onChange={this.handleOptionChange}></input></span>
                <br />

                <button type="submit" onClick={this.handleQuestionA}>Submit</button>
                <br />

                <br />
                <br />
                {/*</form>*/}

            </div>
        )

        //}
    }

}


function mapStateToProps({ authUser, users, questions }, props) {

    const question = questions[props.match.params.id]
    let answered = false;
    const { id } = props.match.params;
    let optionOne = 0
    let optionTwo = 0
    let total = 0
    let optionOnePercent = 0
    let optionTwoPercent = 0
    console.log(question.optionOne);
    if (question.optionOne.votes.includes(authUser) || question.optionTwo.votes.includes(authUser)) {
        optionOne = question.optionOne.votes.length
        optionTwo = question.optionTwo.votes.length
        answered = true;
        total = optionOne + optionTwo
        optionOne = Math.round((optionOne / total) * 100)
        optionTwo = Math.round((optionTwo / total) * 100)
    }

    return ({ authUser, question, id, answered, optionOne, optionTwo, users })
}

export default connect(mapStateToProps)(Result)