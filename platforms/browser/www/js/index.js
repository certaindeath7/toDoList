
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

        // assign icons classes as variables
        const DONE = "glyphicon glyphicon-ok";
        const UNDONE = "glyphicon glyphicon-remove";
        const STRIKE_THROUGH = "lineThrough";

        // create variables for Key-Value localstorage
        let USER_TASK, taskId;

        // check if Key-Value table has items
        if (window.localStorage.getItem("USER_TASK")) {

            // convert text into javascript object
            USER_TASK = JSON.parse(window.localStorage.getItem("USER_TASK"));

            // set the id for each task
            id = USER_TASK.length;

            // present the list of tasks
            loadTasks(USER_TASK);
        } else {
            USER_TASK =[];
            taskId = 0;
        }


        // present the list of tasks
        function loadTasks(array) {
            //for each element in this array, add it to the task list
            array.forEach(function(tasks){
                addTasks(tasks.label, tasks.id, tasks.completed, tasks.remove);
            });
        }

        //add tasks to the list
        function addTasks(label, id, completed, remove) {

            if(remove){ return; }

            const COMPLETED = completed ? DONE : UNDONE;
            const STRIKE = completed ? STRIKE : "";

            // if a task is completed, pass in the icon as in javascript object

            const tasks = `<li class="tasks">
                                    <i class= "${COMPLETED}" job="complete" id="${id}"></i>
                                    <p class="text ${STRIKE}">${label}</p>
                                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                              </li>`;
            
            // insert tasks into "taskList" position
            taskList.insertAdjacentHTML("beforeend", tasks);
        }

        // remove the all tasks from the list
        deleteTask.addEventListener("click", function(){

            window.localStorage.clear();

        });

        // add eventlistner for inputting a new task by clicking "return" or "enter key"
        addTask.addEventListener("click", function(){
                

                //check if the list is empty
                if(taskInput.value){
                    addTasks(taskInput.value, taskId, false, false);

                    //JSON format
                    USER_TASK.push({
                        label : taskInput.value,
                        id: taskId,
                        completed: false,
                        remove: false
                    });

                    // insert data into the local storage. 
                    window.localStorage.setItem("USER_TASK", JSON.stringify(USER_TASK)); //convert a javascript value to JSON

                    taskId++;
                }
                taskInput.value = "";
        });

    },



};

app.initialize();