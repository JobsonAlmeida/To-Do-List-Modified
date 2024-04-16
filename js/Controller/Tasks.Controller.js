import { Task } from "../model/Task.model.js"

export default class TasksController{
    constructor(service, view){
        console.log("service: ", service)
        this.service = service
        this.view = view
    }

    add(title, userId){
        debugger
        console.log("this.service: ", this.service)
        this.service.add(new Task(title), () => {
            this.view.render()
        }, userId)
        // this.service.tasks
    }
}