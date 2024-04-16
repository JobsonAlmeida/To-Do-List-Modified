import { Task } from "../model/Task.model.js"

export default class TasksController{
    constructor(service, view){
        console.log("service: ", service)
        this.service = service
        this.view = view
    }

    add(title, userId){
        console.log("this.service: ", this.service)
        this.service.add(new Task(title), () =>  this.view.render(this.service.tasks), userId)
        // this.service.tasks
    }

    remove(id, userId){
        this.service.remove(id, () =>  this.view.render(this.service.tasks), userId )
    }
}