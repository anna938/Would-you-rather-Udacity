import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'


class NewQuestion extends Component {

    state = {
        optionOne: ' ',
        optionTwo: ' ',
        toHome: false,

    }

    handleChangeOptionOne = (e) => {
        const text = e.target.value

        this.setState(() => ({
            optionOne: text
        }))
    }

    handleChangeOptionTwo = (e) => {
        const text = e.target.value

        this.setState(() => ({
            optionTwo: text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props

        // todo: Add Tweet to Store

        dispatch(handleAddQuestion({ optionOne, optionTwo, authedUser }))

        this.setState(() => ({
            optionOne,
            optionTwo,
            toHome: true,
        }))

    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (

            <div className="questions-wrapper">

                <h1 className='center newQuestion'> Create new Question</h1>
                <h2 class="newQATitle">Would You Rather:</h2>
                <form onSubmit={this.handleSubmit} className="newQAForm">
                    <label>Please Type Question One:</label><br />
                    <textarea
                        placeholder="Question One?"
                        value={optionOne}
                        onChange={this.handleChangeOptionOne}
                        className='textarea'
                        maxLength={280}
                    />
                    <br />
                    <label>Please Type Question Two:</label><br />
                    <textarea
                        placeholder="Question Two?"
                        value={optionTwo}
                        onChange={this.handleChangeOptionTwo}
                        className='textarea'
                        maxLength={280}
                    />
                    <br />

                    <button
                        className=''
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}>
                        Submit
          </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({ authedUser: state.authUser })
}

export default connect(mapStateToProps)(NewQuestion)