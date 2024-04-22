import { createPromise } from "../createPromise.js"
import { createFetch } from "../createFetch.js"
import {Task} from "../model/Task.model.js"
import { urlUsers, urlTasks } from "../../config.js"

export default class TasksService{
    constructor(){
        this.tasks = []
    }

    add(task, cb, error, userId){
       
        debugger
        createFetch("POST", `${urlUsers}/${userId}/tasks`, JSON.stringify(task))
            .then(() => this.getTasks(userId)) 
            .then(() => cb())
            .catch(err => error(err))
    }

    getTasks(userId, sucess, error){

        const fn = (arrTasks) => { 

            if(arrTasks.error){
                return alert(arrTasks.message)
            }

            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            
            if(typeof sucess === "function") {                
                sucess(this.tasks)
            }

            return this.tasks
        }

        return createFetch("GET", `${urlUsers}/${userId}/tasks`)
            .then(response => {
                return fn(response)
            })
            .catch(erro => {
                if(typeof error == "function"){
                    return error(erro.message)
                }
                else{
                    throw Error(erro.message)
                } 
            })

    }

    remove(id, cb, error, userId){
        
        createPromise("DELETE", `${urlTasks}/${id}`)
        .then(() => this.getTasks(userId))
        .then(()=>cb())
        .catch(err => error(err.message))

    }

    update(task, cb, error, userId){
        task.updateAt = Date.now()
        createPromise("PATCH", `${urlTasks}/${task.id}`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(()=>cb())
            .catch(err => error(err.message))
    }

    getById(id){
        return this.tasks.find(task => task.id === id)
    }


}