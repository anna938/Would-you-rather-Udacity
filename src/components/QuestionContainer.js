import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

class QuestionContainer extends Component {

    handleQuestionA = (e) => {
        e.preventDefault()

        const { id } = this.props
        this.props.history.push(`/question/${id}`)
    }

    render() {
        const { users, question } = this.props;

        return (

            <div className='question'>
                {
                    Object.keys(users).map((key) => {
                        if (users[key].id === question.author) {
                            return (
                                <div className="askedBy" key={key}>
                                    <h2>{users[key].name} asks:</h2>
                                    <img src={`${users[key].avatarURL}`} className="avatar" alt="avatar" />
                                </div>
                            )
                        }
                        return;
                    })

                }
                <div className="question-section">
                    <span><strong>Would you rather:</strong><br /> {question.optionOne.text}...</span>
                    <br />
                    <button type="submit" onClick={this.handleQuestionA}> View Question  </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authUser, users, questions }, { id }) {

    const question = questions[id]
    //console.log(users);

    return ({ authUser, users, question, id })
}

export default withRouter(connect(mapStateToProps)(QuestionContainer))
