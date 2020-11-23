import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleChangeAuth } from '../actions/shared'

class Login extends Component {

    handleOptionChange = (e) => {
        const { dispatch } = this.props
        dispatch(handleChangeAuth(
            e.target.value
        ))
    }

    render() {
        return (
            <div class="loginWrapper">
                <div class="login">
                    <h1>  Welcome to the Would you Rather App </h1>
                    <p> Please Sign In To Continue</p>
                    <select onChange={this.handleOptionChange} >
                        <option>--Please Select a user--</option>
                        {Object.keys(this.props.users).map((keyName, i) => (
                            <option
                                key={this.props.users[keyName].id}
                                value={this.props.users[keyName].id}
                                style={{ backgroundImage: `url(${this.props.users[keyName].avatarURL})` }}>

                                {this.props.users[keyName].name}

                            </option>
                        ))}


                    </select>

                </div>
            </div>
        )
    }

}

function mapStateToProps({ users }) {

    return ({ users })

}

export default connect(mapStateToProps)(Login)