import { createXMLHttpRequest } from "../createXMLHttpRequest.js"
import { createPromise } from "../createPromise.js"
import {Task} from "../model/Task.model.js"
import { urlUsers, urlTasks } from "../../config.js"

export default class TasksService{
    constructor(){
        this.tasks = []
    }

    add(task, cb, error, userId){
       
        const fn = (_task) => {
            // const {title, completed, createdAt, updatedAt} = _task            
            this.getTasks(userId, cb)            
        }
            
        createPromise("POST", `${urlUsers}/${userId}/tasks`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(dados => cb(dados))
            .catch(err => error(err))
    }

    getTasks(userId, sucess, error){
        
        const fn = (arrTasks) => { 
            console.log(arrTasks)

            if(arrTasks.error){
                return alert(arrTasks.message)
            }

            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            
            if(typeof sucess === "function") sucess(this.tasks)

            return this.tasks
        }

        // createXMLHttpRequest("GET", `${urlUsers}/${userId}/tasks`, fn, error) 

        return createPromise("GET", `${urlUsers}/${userId}/tasks`)
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
        
        const fn = () => { 
            this.getTasks(userId, cb)           
        }
       
        createXMLHttpRequest("DELETE", `${urlTasks}/${id}`, fn, error) 

    }

    update(task, cb, error, userId){
        task.updateAt = Date.now()
        const fn = () => {             
            this.getTasks(userId, cb)           
        }
        createXMLHttpRequest("PATCH", `${urlTasks}/${task.id}`, fn, error, JSON.stringify(task))
    }

    getById(id){
        return this.tasks.find(task => task.id === id)
    }


}