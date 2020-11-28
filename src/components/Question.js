import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswer } from '../actions/questions'

import { ProgressBar } from 'react-bootstrap';

class Question extends Component {
    state = {
        selectedOption: "",
    }

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

        dispatch(handleQuestionAnswer({

            id: question.id,
            authUser,
            vote
        })

        )

    }

    render() {
        const {
            author, optionOne, optionTwo, name
        } = this.props.question;
        const { selectedOption } = this.state;
        console.log(this.props.answered);
        if (this.props.answered === true) {

            this.optionOneText = optionOne.text
            this.optionTwoText = optionTwo.text


            return (


                <div className="container resultSection">


                    <div>

                        {
                            Object.keys(this.props.users).map((key, index) => {
                                if (this.props.users[key].id === author) {
                                    return <div className="askedBy" key={key}>
                                        <h2>Asked By: {this.props.users[key].name}</h2>
                                        <img src={`${this.props.users[key].avatarURL}`} key={key} className="avatar" alt="avatar" />

                                    </div>
                                }
                                return;
                            })


                        }
                        <h2>{name}</h2>



                    </div>
                    <h1>Results</h1>
                    {selectedOption === "optionOne" ?
                        <span className="yourVote">Your Vote: </span>
                        :
                        ""
                    }
                    <label >{this.optionOneText} </label>
                    <ProgressBar className="optionOne" now={this.props.optionOne} label={`${this.props.optionOne}%`} /><br />


                    {selectedOption === "optionTwo" ?
                        <span className="yourVote">Your Vote: </span>
                        :
                        ""
                    }
                    <label >{this.optionTwoText} </label>
                    <ProgressBar className="optionTwo" now={this.props.optionTwo} label={`${this.props.optionTwo}%`} />

                </div>
            )
        }

        if (this.props.answered === false) {
            return (
                <div style={{ width: "60%", margin: "auto", marginTop: "30px" }}>
                    <div className='question'>
                        {
                            Object.keys(this.props.users).map((key) => {
                                if (this.props.users[key].id === author) {
                                    return (
                                        <div className="askedBy" key={key}>
                                            <h2>{this.props.users[key].name} asks:</h2>
                                            <img src={`${this.props.users[key].avatarURL}`} className="avatar" alt="avatar" />
                                        </div>
                                    )
                                }
                                return;
                            })

                        }
                        <div className="question-section">
                            <span><strong>Would you rather:</strong><br /> {optionOne.text}?
                            &nbsp;<input type="radio" name={this.props.id} value={'optionOne'} onChange={this.handleOptionChange}></input> <br /> {optionTwo.text}?
                            &nbsp;<input type="radio" name={this.props.id} value={'optionTwo'} onChange={this.handleOptionChange}></input></span>
                            <br />
                            <button type="submit" onClick={this.handleQuestionA}>Submit</button>
                        </div>
                    </div>
                </div>
            )

        }
    }

}


function mapStateToProps({ authUser, users, questions }, props) {

    const question = questions[props.match.params.id]
    let answered = false;
    const { id } = props.match.params;
    let optionOne = 0
    let optionTwo = 0
    let total = 0
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

export default connect(mapStateToProps)(Question)
