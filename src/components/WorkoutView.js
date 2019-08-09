import React from 'react';
import { getAllWorkouts } from '../utils/utils';
import WorkoutList from './WorkoutList';

export default class MyWorkouts extends React.Component {
  constructor() {
    super();
    this.state = {
      workouts: [],
    };
    this.getTotalTime = this.getTotalTime.bind(this);
  }

  componentWillMount() {
    getAllWorkouts()
      .then(res => this.setState({ workouts: res }));
  }

  getTotalTime(index) {
    const { workouts } = this.state;
    const tempData = workouts;
    const lastLap = Object.keys(tempData[index].laps).length;
    let exerciseTime = 0;
    tempData[index].laps.map((lap, lapIndex) => {
      lap.exercises.map((exercise) => {
        exerciseTime += parseInt(exercise.time, 10);
        return exerciseTime;
      });
      if (!(lastLap === lapIndex + 1)) {
        exerciseTime += parseInt(tempData[index].lap_rest, 10);
        return exerciseTime;
      }
      return exerciseTime;
    });

    exerciseTime = Math.round((exerciseTime / 60) * 10) / 10;

    return exerciseTime;
  }

  render() {
    const { workouts } = this.state;
    return (
      <div className="container">
        <div className="mb-3">
          <div className="input-group">
            <div className="col-md-10" />
            <a href="/addwo">
              <button type="button" className="btn btn-outline-primary">
                        + Add new workout
              </button>
            </a>
          </div>
        </div>
        <WorkoutList workouts={workouts} totalWorkoutTime={this.getTotalTime} />
      </div>
    );
  }
}
