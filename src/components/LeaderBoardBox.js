import React, { Component } from "react"
import { connect } from "react-redux"

class LeaderboardBox extends Component {

    render() {

        return (
            <div className="leader-wrapper">

                <div className="leader-section">

                    <div className="leader">
                        <h2>{this.props.name} asks:</h2>
                        <img src={`${this.props.avatar}`} className="avatar" />
                    </div>
                    <div className="score-section">
                        <strong>Total questions asked: </strong>{this.props.question}
                        <br />
                        <strong>Total answered:</strong> {this.props.answer}
                        <br />
                        <strong>Score:</strong> {this.props.total}
                    </div>


                </div>


            </div>
        )
    }


}

function mapStateToProps({ users }, props) {
    //let aUsers = users[props.user]
    return (users)
}
export default connect(mapStateToProps)(LeaderboardBox)