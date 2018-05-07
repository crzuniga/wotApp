const defaultData = require('./../data.json')

var db = [];
var history = [];
db.push(defaultData);

let addWorkout = (wo) => {
    db.push(wo)
    return db
}

let updateWorkout = (wo) => {
    let data = db.filter((value) => {
        return value.id !== wo.id
    })

    db = data
    db.push(wo)
    return db
}

let getWorkout = (id) => {
    let wo = db.filter((wo) => {
        return wo.id == id
    })
    return wo
}

let getAll = () => {
    let data = db
    return data
}

let addHistory = (wo) => {
    history.push(wo)
    return history
}

let getHistory = () => {
    let data = history
    return data
}

module.exports = { getAll, addWorkout, getWorkout, updateWorkout, getHistory , addHistory  }

