import { Task } from "../model/Task.model.js"
import { userId } from "../../config.js"
  export default class TasksController{
    constructor(service, view){
        this.service = service
        this.view = view
    }

    add(title){
        if(title){
            console.log("this.service: ", this.service)
            this.service.add(new Task(title), () =>  this.view.render(this.service.tasks), userId)
        }   
    }

    remove(id){
        this.service.remove(id, () =>  this.view.render(this.service.tasks), userId)
    }

    update(task){
        task.updateAt = Date.now()                
        this.service.update(task, () => this.view.render(this.service.tasks), userId)
    }

    toogleDone(id){
        const task = this.service.getById(parseInt(id))
        let {completed} = task
        this.update({completed: !completed, id: parseInt(id)}, userId)
    }

    getTasks(){
        this.service.getTasks(userId, () => this.view.render(this.service.tasks) )
    }

}