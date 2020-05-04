
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

        const STRIKE_THROUGH = "strike";

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

                //each of the task has different id
                if (this.checked) {
                    $(this).parent().parent().css("text-decoration", "line-through");

                } else {
                    $(this).parent().parent().css("text-decoration", "none");
                }

            });
        });


        // remove a ticked checkbox
        function removeTasks() {
            // check if the checkbox has been ticked. 
            //if yes, excecute the following commands for each of the ticked checkbox
            $('input[type="checkbox"]:checked').each(function () {
                $(this).closest('label').remove();
                window.localStorage.removeItem('checked');
                localStorage.setItem("USER_TASK", JSON.stringify(USER_TASK));
            });


        }

        //done button event listener
        deleteTask.addEventListener("click", function () {
            removeTasks();
        });






    },



};

app.initialize();