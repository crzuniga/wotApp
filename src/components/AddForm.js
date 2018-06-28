import React from 'react'
import {
  addWorkout,
  getTotalExercisesList,
  removeAndUpdateList,
  addAndUpdateExerciseList
}
  from './../utils/utils.js'
import plus from "./../images/plus.png"
import minus from "./../images/minus.png"
import wod from "./../images/wod.png"
import warmup from "./../images/warmup.png"
import SuccessView from './SucessView.js';
import { ExerciseList } from './ExerciseList.js';

var localLaps = []
var localWarmup = {
  "exercises": []
}


export class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      workoutRest: '',
      totalLaps: 0,
      exerciseTime: '',
      exerciseRest: '',
      exerciseName: '',
      lapNumber: '',
      options: [],
      laps: [],
      isWarmup: false,
      isWod: true,
      saveDisabled: true,
      addDisabled: true,
      saved: false
    }
    this.handleChange = this.handleChange.bind(this)
    this._saveWorkout = this._saveWorkout.bind(this)
    this._addExercise = this._addExercise.bind(this)
    this._fillData = this._fillData.bind(this)
    this._removeExercise = this._removeExercise.bind(this)
    this._minus = this._minus.bind(this)
    this._plus = this._plus.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    var partialState = {}
    partialState[name] = value
    switch (name) {
      case "isWarmup":
        this.setState({
          isWarmup: true,
          isWod: false
        })
        break;
      case "isWod":
        this.setState({
          isWarmup: false,
          isWod: true
        })
        break;
      default:
        if (
          this.state.workoutName !== '' &&
          this.state.workoutRest !== '' &&
          this.state.totalLaps > 0
        ) {
          partialState['saveDisabled'] = false
        }

        if (
          this.state.exerciseName !== '' &&
          this.state.exerciseTime !== '' &&
          this.state.exerciseRest !== ''
        ) {
          partialState['addDisabled'] = false
        }

        this.setState(partialState)
        break;
    }


  }

  _plus() {
    this.setState({
      totalLaps: this.state.totalLaps + 1
    })
  }

  _minus() {
    if (this.state.totalLaps > 0) {
      this.setState({
        totalLaps: this.state.totalLaps - 1
      })
    }
  }

  _fillData(event) {

    let numbers = () => {
      let x = []
      if (this.state.isWarmup) {
        x.push(0)
      } else {
        for (var i = 1; i <= this.state.totalLaps; i++) {
          x.push(i)
        }
      }
      return x
    }
    this.setState({
      options: numbers(),
      lapNumber: event.target.value
    })
  }


  _saveWorkout() {

    if (Object.keys(this.state.laps).length > 0) {
      let wot = {
        "id": "wot_" + Date.now(),
        "date": Date.now(),
        "name": this.state.workoutName,
        "total_laps": this.state.totalLaps,
        "lap_rest": this.state.workoutRest,
        "warmup": localWarmup,
        "laps": localLaps
      }

      addWorkout(wot)
      this.setState({
        saved: true
      })
    }
  }

  _addExercise() {

    if (
      this.state.exerciseName !== '' &&
      this.state.exerciseTime !== '' &&
      this.state.exerciseRest !== '' &&
      this.state.lapNumber !== ''
    ) {
      let ex = {
        "id": this.state.isWod ? "ex_" + Date.now() : "wup_" + Date.now(),
        "name": this.state.exerciseName,
        "time": this.state.exerciseTime,
        "url": this.state.url,
        "finished": "false",
        "lap": this.state.isWod ? this.state.lapNumber : 0
      }

      let rest = {
        "id": this.state.isWod ? "rest_" + Date.now() : "wrest_" + Date.now(),
        "name": "Rest",
        "time": this.state.exerciseRest,
        "url": "",
        "finished": "false",
        "lap": this.state.isWod ? this.state.lapNumber : 0
      }

      let exerciseListResult = addAndUpdateExerciseList(ex,rest,localWarmup,localLaps,this.state.isWarmup)

      localWarmup = exerciseListResult[0]
      localLaps = exerciseListResult[1]

      let tempList = getTotalExercisesList(localWarmup, localLaps)

      this.setState({
        laps: tempList
      })
    }

  }

  _removeExercise(exId) {
    if(exId!==""){
      let [updatedWarmup, UpdatedLaps] = removeAndUpdateList(exId, localWarmup, localLaps)
      localWarmup = updatedWarmup
      localLaps = UpdatedLaps
      let tempList = getTotalExercisesList(updatedWarmup, UpdatedLaps)
  
      this.setState({
        laps: tempList
      })
    }
    

  }

  render() {
    if (this.state.saved) {
      return (
        <SuccessView />
      )
    } else {
      return (

        <div className="row">
          <div className="col-md-1 order-md-1" />
          <div className="col-md-10 order-md-1">
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Wod Name :</label>
                <input
                  type="text"
                  id="wod"
                  className="form-control col-md-10 required"
                  placeholder="Workout Name"
                  name="workoutName"
                  value={this.state.workoutName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Rest Between Laps :</label>
                <div className="col-md-6" />
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control col-md-3"
                  placeholder="In seconds"
                  name="workoutRest"
                  value={this.state.workoutRest}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-4">Number of Laps :</label>
                <div className="col-md-5" />
                <a className="col-md-1" href='#plus' onClick={() => { this._plus() }}>
                  <img alt="plus" src={plus} />
                </a>
                <h2 className="col-md-1">
                  {this.state.totalLaps}
                </h2>
                <a className="col-md-1" href='#minus'
                  onClick={() => { this._minus() }}>
                  <img alt="plus" src={minus} />
                </a>
              </div>
            </div>
            <hr />
            <div className="mb-3">
              <div className="input-group">
                <div className="col-md-3" />
                <input
                  type="radio"
                  name='isWarmup'
                  value={this.state.isWarmup}
                  checked={this.state.isWarmup}
                  onChange={this.handleChange}
                />
                <label className="col-md-3 text-primary">
                  <img alt="warmup" src={warmup} />
                  This is a warm up
                </label>
                <input type="radio"
                  name='isWod'
                  checked={this.state.isWod}
                  value={this.state.isWod}
                  onChange={this.handleChange}
                />
                <label className="col-md-3 text-success">
                  <img alt="wod" src={wod} />
                  This is a WOD
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Exercise Time :</label>
                <input
                  type="text"
                  className="form-control col-md-2"
                  pattern="[0-9]*"
                  placeholder="In seconds"
                  name="exerciseTime"
                  value={this.state.exerciseTime}
                  onChange={this.handleChange}
                />
                <div className="col-md-1" />
                <label className="col-md-2">Rest Time :</label>
                <input
                  type="text"
                  className="form-control col-md-2"
                  placeholder="In seconds"
                  pattern="[0-9]*"
                  name="exerciseRest"
                  value={this.state.exerciseRest}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Exercise Name :</label>
                <input
                  type="text"
                  className="form-control col-md-10 "
                  placeholder="Burpees"
                  name="exerciseName"
                  value={this.state.exerciseName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Youtube Url :</label>
                <input
                  type="text"
                  className="form-control col-md-10 "
                  placeholder="https://www.youtube.com/watch..."
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <label className="col-md-3">Lap :</label>
                <select type="select"
                  name="lapNumber"
                  value={this.state.lapNumber}
                  onChange={this.handleChange}
                  onClick={this._fillData} >
                  <option value="" disabled>Select lap</option>
                  {this.state.options.map((value) => (
                    <option value={value} key={value}> {value} </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            <div className="mb-3">
              <div className="input-group">
                <div className="col-md-4" />
                <div className="col-md-3">
                  <button className="btn btn-primary"
                    type="button"
                    disabled={this.state.addDisabled}
                    onClick={this._addExercise}>
                    + Add Exercise
                    </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary"
                    type='button'
                    disabled={this.state.saveDisabled}
                    onClick={this._saveWorkout} >
                    Save Workout
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
                  <ExerciseList laps= { this.state.laps } onClick= {this._removeExercise} />
            </div>
          </div>
        </div>
      )
    }

  }
}