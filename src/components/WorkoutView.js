import React from 'react';
import { getAllWorkouts } from './../actions/actions'
import edit from './../images/edit.png'

export default class MyWorkouts extends React.Component {
    constructor() {
        super()
        this.state = {
            workouts: [],
            totalWorkoutTime: []
        }

        this._getTotalTime = this._getTotalTime.bind(this)
    }

    componentWillMount() {
        getAllWorkouts()
            .then(res => 
                this.setState({ 
                    workouts: res }))
    }

    _getTotalTime(index) {
        let tempData = this.state.workouts
        let lastLap = Object.keys(tempData[index].laps).length
        let exerciseTime = 0
        tempData[index].laps.map((lap, lapIndex) => {
            lap.exercises.map((exercise, exIndex) => {
                exerciseTime += parseInt(exercise.time, 10)
                return exerciseTime
            })
            if (!(lastLap === lapIndex + 1)) {
                exerciseTime += parseInt(tempData[index].lap_rest, 10)
                return exerciseTime
            } else {
                return exerciseTime
            }
        })

        exerciseTime = Math.round((exerciseTime / 60) * 10) / 10

        return exerciseTime
    }

    render() {

        return (<div className='container'>

            <div className="mb-3">
                <div className="input-group">
                    <div className="col-md-10" />
                    <a href='/addwo'>
                        <button className="btn btn-outline-primary">
                            + Add new workout
            </button>
                    </a>
                </div>
            </div>
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
                    {this.state.workouts.map((workout, index) => (
                        <tr key={workout.id}>
                            <th scope="row">
                                <a href={`/currentwo/${workout.id}`}>{workout.name}</a>
                            </th>
                            <td> {workout.total_laps} </td>
                            <td> {this._getTotalTime(index) + "  "}minutes</td>
                            <td> <a href={`/edit/${workout.id}`}><img alt='edit' src={edit} /> </a></td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>)
    }
}
