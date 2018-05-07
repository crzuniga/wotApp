const workout = require('./../models/workout')

module.exports = {
    getAll : (req, res, next) => {
        res.send(workout.getAll())
    },

    addWorkout : (req, res, next) => {
        let receivedData =  req.body
        res.send(workout.addWorkout(receivedData))
    },

    getWorkout : (req, res, next) => {
        let woId =  req.params.id
        res.send(workout.getWorkout(woId))
    },

    updateWorkout : (req, res, next) => {
        let receivedData =  req.body
        res.send(workout.updateWorkout(receivedData))
    },
    getHistory : (req, res, next) => {
        res.send(workout.getHistory())
    },

    addHistory : (req, res, next) => {
        let receivedData =  req.body
        res.send(workout.addHistory(receivedData))
    }


}