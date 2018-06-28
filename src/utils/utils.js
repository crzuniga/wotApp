import axios from 'axios';

const url = "http://localhost:3000/api/"

export function getAllWorkouts() {
    return axios.get(`${url}workout/all`).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function addWorkout(wo) {
    return axios.post(`${url}workout/add`, wo).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function getWorkout(_id) {
    return axios.get(`${url}workout/get/${_id}`).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function updateWorkout(wo) {
    return axios.post(`${url}workout/update`, wo).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function saveHistory(wo) {
    return axios.post(`${url}workout/savehistory`, wo).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function getHistory() {
    return axios.get(`${url}workout/history`).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function getTotalExercisesList(warmUpObject, lapsList) {
    let lapExercises = []

    lapsList.forEach((lap, index) => {
        lap.exercises.forEach((exercise) => {
            lapExercises.push(exercise)
        })
    })

    let tempList = warmUpObject.exercises.concat(lapExercises.map((value) => {
        return value
    }))

    return tempList
}

export function getTotalLaps(warmUpObject, TotalLaps) {
    let tempData = TotalLaps
    tempData.splice(0, 0, warmUpObject)

    let tempList = tempData.filter((lap) => {
        return Object.keys(lap.exercises).length > 0
    })

    console.log(tempList)
    return tempList
}

export function removeAndUpdateList(id, warmUpObject, lapsList) {

    if (id.startsWith('wup') || id.startsWith('wrest')) {
        let tempData = warmUpObject
        tempData.exercises.forEach((exercise, index) => {
            if (exercise.id === id) {
                warmUpObject.exercises.splice(index, 1)
            }
        })
    } else {
        let tempData = lapsList
        tempData.forEach((lap, lapIndex) => {
            lap.exercises.forEach((exercise, index) => {
                if (exercise.id === id) {
                    lapsList[lapIndex].exercises.splice(index, 1)
                }
            })
        })

        let tempLaps = lapsList.filter((lap) => {
            return Object.keys(lap.exercises).length > 0
        })

        lapsList = tempLaps
    }

    return [warmUpObject, lapsList]

}

export function addAndUpdateExerciseList(exercise, rest, warmUp, lapsList, isWarmUp) {

    if (isWarmUp) {
        warmUp.exercises.push(exercise, rest)
    } else {
        switch (Object.keys(lapsList).length) {

            case 0:
                let lap = {
                    "exercises": [exercise, rest]
                }
                lapsList.push(lap)
                break;

            default:
                let lapExist = lapsList.map((value, index) => {
                    return (index + 1).toString() === exercise.lap ? true : false
                })

                if (lapExist.find((value) => {
                    return value === true
                })) {
                    lapsList[(exercise.lap -1)].exercises.push(exercise, rest)
                } else {
                    let lap = {
                        "exercises": [exercise, rest]
                    }
                    lapsList.push(lap)
                }
                break;
        }
    }

    return [warmUp, lapsList]

}