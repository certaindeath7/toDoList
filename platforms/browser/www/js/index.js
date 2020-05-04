
var app = {
    // Application Constructor
    initialize: function () {

        // DeviceReady method
        document.addEventListener('deviceready', this.loadToDoList.bind(this), false);
    },


    // device ready method
    loadToDoList: function () {

        //getting elements from html file
        const taskList = document.getElementById("taskList");
        const taskInput = document.getElementById("input");
        const deleteTask = document.getElementById("doneBtn");
        const addTask = document.getElementById("addBtn");

        const STRIKE_THROUGH="strike";

        // create variables for Key-Value localstorage
        let USER_TASK, taskId;

        // check if Key-Value in user-task table has items
        if (window.localStorage.getItem("USER_TASK")) {

            // convert text into javascript object
            USER_TASK = JSON.parse(window.localStorage.getItem("USER_TASK"));

            // set the id for each task
            id = USER_TASK.length;

            // present the list of tasks
            loadTasks(USER_TASK);
        } else {
            USER_TASK = [];
            taskId = 0;
        }


        // present the list of tasks
        function loadTasks(array) {
            //for each element in this array, add it to the task list
            array.forEach(function (tasks) {
                addTasks(tasks.label, tasks.id, tasks.completed, tasks.remove);
            });
        }


        //add tasks to the list
        function addTasks(label, id, completed, remove) {

            if (remove) { return; }

            // if a task is completed, pass in the icon as in javascript object

            const tasks = `<form>
                                <label>
                                    <input type="checkbox" value="${label}" id="${id}" name="${label}">${label}
                                </label>
                            </form>`;

            // insert tasks into "taskList" position
            taskList.insertAdjacentHTML("beforeend", tasks);
           
        }

      


        function removeTasks() {

            elemination.parentNode.removeChild(elemination);
            USER_TASK[elemination.id].remove = true;
        }


        // add eventlistner for inputting a new task by clicking "return" or "enter key"
        addTask.addEventListener("click", function () {


            //check if the list is empty
            if (taskInput.value) {
                addTasks(taskInput.value, taskId, false, false);

                //JSON format, add items to the array
                USER_TASK.push({
                    label: taskInput.value,
                    id: taskId,
                    completed: false,
                    remove: false
                });

                // insert data into the local storage. 
                window.localStorage.setItem("USER_TASK", JSON.stringify(USER_TASK)); //convert a javascript value to JSON

                taskId++;
                
            }
            taskInput.value = "";

            $("input[type=checkbox").click(function () {

                //var ele = document.getElementById(taskId);
                if (this.checked) {
                    $(this).parent().parent().css("text-decoration","line-through");
                }else{
                    $(this).parent().parent().css("text-decoration","none");
                }
           
                window.localStorage.setItem("USER_TASK", JSON.stringify(USER_TASK));
            });
        });




        // //delete a task funciton
        // function removeTasks(task){
        //     // get the parent <div> tag to delete one of the <ul> tag
        //     task.parentNode.parentNode.removeChild(task.parentNode);

        //     USER_TASK[task.taskId].remove = true;
        // }

        // // handle "complete, delete" tasks for each item in the list

        // taskList.addEventListener("click", function(event){

        //     // get hold of the chosen task
        //     const task = event.target;

        //     //get hold of the function complete or remove
        //     const taskFunction = task.attributes.job.value;

        //     if(taskFunction == "completed"){
        //         completeTask(task);
        //     }
        //     else if(taskFunction == "remove"){
        //         removeTasks(task);
        //     }







    },



};

app.initialize();