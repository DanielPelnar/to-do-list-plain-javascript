document.addEventListener("DOMContentLoaded", () => {

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
        // console.log(submittedTask);
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = submittedTask;
        const deleteButton = document.createElement("button");
        const completeButton = document.createElement("button");
        deleteButton.className = "delete";
        completeButton.className = "complete";
        deleteButton.innerHTML = "Delete Task";
        completeButton.innerHTML = "Complete";
        taskDiv.append(deleteButton);
        taskDiv.append(completeButton);
        document.querySelector("#tasks").append(taskDiv);
        document.querySelector("form").reset();
        console.log(taskDiv);
        return false; 
    };

    // Deleting and Completing tasks:
    document.addEventListener("click", function(event) {
        const clickedElement = event.target;
        if (clickedElement.className === "delete") { // If the "delete" button was clicked:
            clickedElement.parentElement.remove();   // remove the task's div, which deleted the whole task.
        }

        if (clickedElement.className === "complete") { // If the "complete" button was clicked:
            clickedElement.parentElement.style.textDecoration = "line-through";   // Cross the text of the task
        }
    });



});