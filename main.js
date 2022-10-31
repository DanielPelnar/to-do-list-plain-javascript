document.addEventListener("DOMContentLoaded", () => {
    
    let divsOfTasks = []; // innerHTML text of tasks
    // Setting up local storage:
    if (JSON.parse(localStorage.getItem("divsOfTasks"))) { // if there are tasks from previous "session", then load them:
        const tasks = JSON.parse(localStorage.getItem("divsOfTasks"));
        for (let task of tasks) {
            createTaskDiv(task);
            divsOfTasks.push(task);
        }
    }

    // By default, the submit button is disabled, so the user can't submit an empty string:
    document.querySelector("#submit").disabled = true;
    // As long as there is something typed in in the input field, the user can submit:
    document.querySelector("#input").onkeyup = function() {
        if (document.querySelector("#input").value !== "") {
            document.querySelector("#submit").disabled = false;
        } /// input field is empty
        else {
            document.querySelector("#submit").disabled = true;
        }
    };

    // Adding task:
    document.querySelector("form").onsubmit = function() {
        const submittedTask = document.querySelector("#input").value;

        createTaskDiv(submittedTask);

        document.querySelector("form").reset();
    
        // local storage:
        divsOfTasks.push(submittedTask);
        localStorage.setItem("divsOfTasks", JSON.stringify(divsOfTasks));

        return false; 
    };

    // Deleting (Completing) tasks:
    document.addEventListener("click", function(event) {
        const clickedElement = event.target;
        if (clickedElement.className === "delete") { // If the "delete" button was clicked:
            // "Delete" from local storage:
            const removeTask = clickedElement.parentElement.innerText;
            const size = removeTask.length
            divsOfTasks = arrayRemove(divsOfTasks, removeTask.slice(0, size - 11)); // "Delete Task".length === 11
            localStorage.setItem("divsOfTasks", JSON.stringify(divsOfTasks));

            // remove the task's div, which deletes the whole task:
            clickedElement.parentElement.remove();   
        }
    });

    // Creates task (task div and all inner tags):
    function createTaskDiv(innerText) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = innerText;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.innerHTML = "Delete Task";
        taskDiv.append(deleteButton);
        document.querySelector("#tasks").append(taskDiv);
    }

    // Helper function used to remove an element from an array by name:
    function arrayRemove(arr, element) {
        return arr.filter(function(x){
            return x != element;
        });
    }   
});