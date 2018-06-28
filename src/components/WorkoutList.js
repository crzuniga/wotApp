import React from 'react'
import edit from './../images/edit.png'
import TimeAgo from 'react-time-ago'

export class WorkoutList extends React.Component {
    render() {
        if (this.props.historyList) {
            return (
                <table className='table table-striped'>
                    <thead className="">
                        <tr>
                            <th scope="col">Workout Name</th>
                            <th scope="col">When</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.history.map((workout, index) => (
                            <tr key={workout.id}>
                                <td> {workout.name} </td>
                                <td>
                                    <TimeAgo locale="en">{workout.date}</TimeAgo> </td>
                                <td> {workout.status} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } else {
            return (
                <table className='table'>
                    <thead >
                        <tr>
                            <th scope="col">Workout Name</th>
                            <th scope="col">Laps</th>
                            <th scope="col">Expected Time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.workouts.map((workout, index) => (
                            <tr key={workout.id}>
                                <th scope="row">
                                    <a href={`/currentwo/${workout.id}`}>{workout.name}</a>
                                </th>
                                <td> {workout.total_laps} </td>
                                <td> {this.props.totalWorkoutTime(index) + "  "}minutes</td>
                                <td> <a href={`/edit/${workout.id}`}><img alt='edit' src={edit} /> </a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }

    }
}