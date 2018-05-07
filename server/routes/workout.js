const wocontroller = require('./../controllers/workout.ctrl')

module.exports = (router) => {
    router
        .route('/workout/all')
        .get(wocontroller.getAll),
    router
        .route('/workout/add')
        .post(wocontroller.addWorkout),  
    router
        .route('/workout/get/:id')
        .get(wocontroller.getWorkout)
    router
        .route('/workout/update')
        .post(wocontroller.updateWorkout),
    router
        .route('/workout/history')
        .get(wocontroller.getHistory),
    router
        .route('/workout/savehistory')
        .post(wocontroller.addHistory)

}