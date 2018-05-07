import axios from 'axios';

const url = "http://localhost:3000/api/"

export function getAllWorkouts () {
    return axios.get(`${url}workout/all`).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function addWorkout (wo) {
    return axios.post(`${url}workout/add`,wo).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function getWorkout (_id) {
    return axios.get(`${url}workout/get/${_id}`).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function updateWorkout (wo) {
    return axios.post(`${url}workout/update`,wo).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function saveHistory (wo) {
    return axios.post(`${url}workout/savehistory`,wo).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function getHistory () {
    return axios.get(`${url}workout/history`).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}