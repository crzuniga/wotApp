import React from 'react';
import { getAllWorkouts } from './../utils/utils'
import { WorkoutList } from './WorkoutList';

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
           <WorkoutList workouts={this.state.workouts} totalWorkoutTime={this._getTotalTime} />
        </div>)
    }
}
