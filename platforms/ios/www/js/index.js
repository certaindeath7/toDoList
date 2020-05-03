
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
        const taskInput = document.getElementById("taskInput");
        const deleteTask = document.getElementById("doneBtn");
    

        // assign icons classes as variables
        const DONE = "glyphicon glyphicon-ok";
        const UNDONE = "glyphicon glyphicon-remove";
        const STRIKE_THROUGH = "lineThrough";

        // create variables for Key-Value localstorage
        let USERS_TASK, taskId;

        // check if Key-Value table has items
        if (window.localStorage.getItem("USER_TASK")) {

            // convert text into javascript object
            USERS_TASK = JSON.parse(window.localStorage.getItem("USER_TASK"));

            // set the id for each task
            id = USERS_TASK.length;

            // present the list of tasks
            loadTasks(USERS_TASK);
        }
        // present the list of tasks
        function loadTasks(array) {
            //for each element in this array, add it to the task list
            array.forEach(addTasks(label, id, completed, remove));
        }

        //add tasks to the list
        function addTasks(label, id, completed, remove) {

            const COMPLETED = completed;
            const STRIKE = completed;

            // if a task is completed, pass in the icon as in javascript object
            if (completed) { COMPLETED = DONE }
            else { UNDONE }

            // if a task is completed, strike through the text
            if (completed) { STRIKE = STRIKE_THROUGH }
            else { "" }

            const tasks = `<li class="taskList">
                                    <i class= "${COMPLETED}" job="complete" id="${id}"></i>
                                    <p class="text ${STRIKE}">${toDo}</p>
                                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                              </li>`;
            
            // insert tasks into "taskList" position
            taskList.insertAdjacentHTML("beforeend", tasks);
        }

        // remove the all tasks from the list
        deleteTask.addEventListener("click", function(){

            window.localStorage.clear();
            window.localStorage.remove();
        });

        // add eventlistner for inputting a new task by clicking "return" or "enter key"
        document.addEventListener("keyup", function(){
                if(event.keycode == 13){
                const toDoTask = taskInput.value;

                //check if the list is empty
                if(toDoTask){
                    addTasks(toDoTask, taskId, null, null);

                    //JSON format
                    USERS_TASK.push({
                        label : toDoTask,
                        id: taskId,
                        completed: null,
                        remove: null
                    });

                    // insert data into the local storage. 
                    window.localStorage.setItem("USER_TASK", JSON.stringify(USERS_TASK)); //convert a javascript value to JSON

                    taskId++;
                }
                askInput.value = "";
                }
        });

    },



};

app.initialize();