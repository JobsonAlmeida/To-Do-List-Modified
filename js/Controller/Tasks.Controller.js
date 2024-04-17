import { Task } from "../model/Task.model.js"

export default class TasksController{
    constructor(service, view){
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

    update(task, userId){
        task.updateAt = Date.now()                
        this.service.update(task, () => this.view.render(this.service.tasks), userId)
    }

    toogleDone(id, userId){
        const task = this.service.getById(parseInt(id))
        let {completed} = task
        this.update({completed: !completed, id: parseInt(id)}, userId)
    }

}