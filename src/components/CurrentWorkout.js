import React from 'react'
import { getWorkout, saveHistory, getTotalLaps } from './../utils/utils'
import ReactCountdownClock from 'react-countdown-clock'
import ReactPlayer from 'react-player';

var totalLaps = []

export class CurrentWorkout extends React.Component {
    constructor() {
        super()
        this.state = {
            workout: {},
            exerciseName: '',
            nextEx: '',
            time: "0",
            currentIndex: 0,
            lapIndex: 0,
            lap: '',
            paused: true,
            remainingLaps: 0,
            remainingEx: 0,
            color: '',
            url: '',
            autoplay: false,
            stop: false,
            wodDone: false,
            started: false
        }
        this._nextExercise = this._nextExercise.bind(this)
        this._startWorkout = this._startWorkout.bind(this)
        this._resetWorkout = this._resetWorkout.bind(this)
        this._stopWorkout = this._stopWorkout.bind(this)

    }

    componentWillMount() {
        if (this.state.workout !== null) {
            let woId = this.props.id;

            getWorkout(woId)
                .then(res => {
                    const data = res[0]
                    totalLaps = getTotalLaps(data.warmup, data.laps)
                    this.setState({
                        workout: data,
                        exerciseName: totalLaps[0].exercises[0].name,
                        time: totalLaps[0].exercises[0].time,
                        lap: totalLaps[0].exercises[0].lap,
                        url: totalLaps[0].exercises[0].url,
                        remainingLaps: Object.keys(totalLaps).length - 1,
                        remainingEx: Object.keys(totalLaps[0].exercises).length - 1,
                        currentIndex: this.state.currentIndex + 1,
                        color: '#191970'
                    })
                })
        }
    }

    _startWorkout() {
        if (this.state.paused && !this.state.started) {
            this.setState({
                paused: false,
                autoplay: true,
                stop: false,
                started: true
            })
        } else if (this.state.paused) {
            this.setState({
                paused: false,
                autoplay: true,
                stop: false
            })
        } else {
            this.setState({ paused: true })
        }
    }

    _resetWorkout() {
        let data = this.state.workout
        data.status = 'Canceled'
        data.id = "history_" + Date.now()
        data.date = Date.now()
        saveHistory(data)

        //data = this.state.workout
        let exTime = totalLaps[0].exercises[0].time
        if (exTime === this.state.time) {
            exTime = parseInt(exTime, 10) + 0.00001
        }

        this.setState({
            exerciseName: totalLaps[0].exercises[0].name,
            time: parseInt(totalLaps[0].exercises[0].time, 10) + 0.0001,
            lap: totalLaps[0].exercises[0].lap,
            paused: false,
            started: true,
            stop: false,
            remainingLaps: (Object.keys(totalLaps).length - 1),
            remainingEx: (Object.keys(totalLaps[0].exercises).length - 1),
            currentIndex: 1,
            lapIndex: 0,
            color: '#191970'
        })
    }

    _stopWorkout() {
        if (!this.state.paused) {
            let data = this.state.workout
            data.status = 'Stopped'
            data.id = "history_" + Date.now()
            data.date = Date.now()
            saveHistory(data)

            this.setState({
                paused: true,
                autoplay: false,
                stop: true
            })
        }


    }

    _nextExercise() {
        if (this.state.remainingEx !== 0) {
            let currentEx = totalLaps[this.state.lapIndex].exercises.filter((val, index) => {
                return val.finished === 'false' && index === this.state.currentIndex
            })

            let exTime = currentEx[0].time
            if (exTime === this.state.time) {
                exTime = parseInt(exTime, 10) + 0.00001
            }

            let nextColor = currentEx[0].name === 'Rest' ? '#32CD32' : '#191970'
            this.setState({
                exerciseName: currentEx[0].name,
                time: exTime,
                lap: currentEx[0].lap,
                url: currentEx[0].url,
                remainingEx: this.state.remainingEx - 1,
                currentIndex: this.state.currentIndex + 1,
                color: nextColor
            })
        } else {
            if (this.state.remainingLaps === 0) {
                let data = this.state.workout
                data.id = "history_" + Date.now()
                data.status = 'Completed'
                data.date = Date.now()
                saveHistory(data)
                this.setState({ wodDone: true })

            } else {
                let exTime = this.state.workout.lap_rest
                if (exTime === this.state.time) {
                    exTime = parseInt(exTime, 10) + 0.00001
                }

                this.setState({
                    currentIndex: 0,
                    lapIndex: this.state.lapIndex + 1,
                    remainingEx: Object.keys(totalLaps[this.state.lapIndex + 1].exercises).length,
                    remainingLaps: this.state.remainingLaps - 1,
                    exerciseName: 'Lap Rest',
                    url: '',
                    time: exTime,
                    color: '#DAA520'
                })
            }
        }
    }

    render() {
        if (this.state.time === '0') {
            return (
                <div>Loading...</div>
            )
        } else {
            if (!this.state.wodDone) {
                return (
                    <div className="row">
                        <div className="col-md-20 order-md-1">
                            <table >
                                <tbody>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <div className="mb-3">
                                                Workout Name:
                                            </div>
                                            <h1>{this.state.workout.name} </h1>
                                        </td>
                                        <td>
                                            <div className="mb-3">
                                                <div className="input-group">
                                                    <div />
                                                    <label className="font-weight-light exercise-left">Current Lap: </label>
                                                    <h3 className="col-md-1"> {this.state.lap}</h3>
                                                </div>
                                            </div>
                                            <div className="mb-3 exercise-left">
                                                <h2> {this.state.exerciseName}</h2>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>

                                        </td>
                                        <td rowSpan='3'>
                                            <div className="col-md-6">
                                                <ReactCountdownClock seconds={this.state.time}
                                                    paused={this.state.paused}
                                                    color={this.state.color}
                                                    alpha={1.0}
                                                    weight={5}
                                                    timeFormat="seconds"
                                                    size={450}
                                                    onComplete={this._nextExercise}
                                                />
                                            </div>

                                        </td>
                                        <td rowSpan='3' className='' >
                                            <div className="mb-6 video-div exercise-left">
                                                <ReactPlayer
                                                    className='video-box'
                                                    url={this.state.url}
                                                    playing={this.state.autoplay}
                                                    width={450}
                                                    height={300}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <button className='btn btn-lg btn-outline-primary '
                                                type='button'
                                                onClick={this._startWorkout}
                                                hidden={this.state.started}
                                            > ►
                                                                Start Workout
                                                </button>
                                            <button className='btn btn-lg btn-outline-primary'
                                                type='button'
                                                hidden={!this.state.started}
                                                onClick={this._resetWorkout}
                                            >
                                                <img alt='reset' src="/images/reset.png" />
                                                Restart Workout</button>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <button className='btn btn-lg btn-outline-danger'
                                                type='button'
                                                hidden={this.state.stop}
                                                onClick={this._stopWorkout}>
                                                ■ Stop Workout </button>
                                            <button className='btn btn-lg btn-outline-danger'
                                                type='button'
                                                hidden={!this.state.stop}
                                                onClick={this._startWorkout}>Resume Workout </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="text-xs-center">
                        <h1 className="display-5">Workout has been Completed!
                    <img alt='ok' src='/images/check.png' />
                        </h1>
                    </div>
                )
            }
        }
    }
}

