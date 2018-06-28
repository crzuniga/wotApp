import React from 'react'
import { getHistory } from '../utils/utils'
import setupTime from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { WorkoutList } from './WorkoutList';

export class WorkoutHistory extends React.Component{
    constructor(){
        super()
        this.state = {
            history : []
        }
    }

    componentWillMount(){
        setupTime.locale(en)
        getHistory()
        .then(res => {
           
            this.setState({ history: res })
        }
        )
        
    }

    render(){
        return(
            <div className='Container'>
            <div className="mb-3">
                <div className="input-group">
                    <div className="col-md-10" />
                    <h3>
                            WOD Logs for me
                    </h3>
                </div>
            </div>

            <WorkoutList history={this.state.history} historyList={true} />
    </div>
        )
    }
}