import React from 'react'
import { getHistory } from '../actions/actions'
import TimeAgo from 'react-time-ago'
import setupTime from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

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
            <table className='table table-striped'>
            <thead className="">
                <tr>
                    <th scope="col">Workout Name</th>
                    <th scope="col">When</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {this.state.history.map((workout, index) => (
                    <tr key={workout.id}>
                        <td> {workout.name} </td>
                        <td>
                            <TimeAgo locale="en">{ workout.date }</TimeAgo> </td>
                        <td> {workout.status} </td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
        )
    }
}