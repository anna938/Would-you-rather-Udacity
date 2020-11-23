import React, { Component } from 'react'
import { connect } from 'react-redux'

import QuestionContainer from './QuestionContainer'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component {

    render() {

        return (
            <div className="questions-wrapper" >

                <Tabs>
                    <TabList>
                        <Tab>Unanswered Questions</Tab>
                        <Tab>Answered Questions</Tab>
                    </TabList>
                    <TabPanel>
                        <ul className='dashboard-list'>
                            {
                                this.props.unanswered.map((id) => (
                                    <li key={id}>
                                        <QuestionContainer id={id} />
                                    </li>
                                ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='dashboard-list'>
                            {
                                this.props.answered.map((id) => (
                                    <li key={id}>
                                        <QuestionContainer id={id} />
                                    </li>
                                ))}
                        </ul>

                    </TabPanel>

                </Tabs>
            </div>
        )
    }
}


function mapStateToProps({ questions, authUser }) {

    const answered = Object.keys(questions).filter(item => questions[item].optionOne.votes.includes(authUser) ||
        questions[item].optionTwo.votes.includes(authUser)).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    const unanswered = Object.keys(questions).filter(item => !answered.includes(item)).sort((a, b) => questions[b].timestamp - questions[a].timestamp)


    return {
        answered,
        unanswered

    }

}

export default connect(mapStateToProps)(Dashboard)