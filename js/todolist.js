import {Task} from "./model/Task.model.js"
import {createXMLHttpRequest} from "./createXMLHttpRequest.js"
import TasksService from "./Service/Tasks.services.js"
import TasksController from "./Controller/Tasks.Controller.js"
import TasksView from "./View/Tasks.View.js"

// const url = "https://jsonplaceholder.typicode.com/users/1/todos"
const urlUsers = "http://localhost:3000/users"
const urlTasks = "http://localhost:3000/tasks/"

const userId = 2

const taskService = new TasksService() 

const ul = document.getElementById("todo-list")
const tasksView = new TasksView(ul)

console.log("taskService", taskService)
const taskController = new TasksController(taskService, tasksView)

 //ARMAZENAR O DOM EM VARIAVEIS
 const itemInput = document.getElementById("item-input")
 const todoAddForm = document.getElementById("todo-add")
 const lis = ul.getElementsByTagName("li")

taskService.getTasks(userId, init)


// createXMLHttpRequest("GET", `${urlUsers}/${userId}/tasks`, init )

todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault()
    
    taskController.add(itemInput.value, userId)

    itemInput.value = ""
    itemInput.focus()
});

function init(arrInstancesTasks){ 

    if(arrInstancesTasks.error) return
       
    tasksView.render(taskService.tasks) 

    function clickedUl(e) {
        const dataAction = e.target.getAttribute("data-action")
        console.log(e.target)
        if (!dataAction) return

        let currentLi = e.target
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)

        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");

                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer.style.display = "flex";

            },
            deleteButton: function () {
                arrInstancesTasks.splice(currentLiIndex, 1)
                renderTasks()

            },
            containerEditButton: function () {
                const val = currentLi.querySelector(".editInput").value
                arrInstancesTasks[currentLiIndex].setTitle(val)
                renderTasks()
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getTitle()
            },
            checkButton: function () {

                // DEVE USAR O MÉTODO toggleDone do objeto correto
                arrInstancesTasks[currentLiIndex].toggleDone()
                renderTasks()
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }

    ul.addEventListener("click", clickedUl)

}


