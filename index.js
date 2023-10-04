const pendingTasksContainer = document.getElementById("pending-tasks-container");
const completedTasksContainer = document.getElementById('completed-tasks-container');
const clearTasksButton = document.getElementById("clear-tasks");
const addtaskButton = document.getElementById("add-task-button");

let pendingCount = 0;
let completedCount = 0;

const pendingDefText = document.getElementById("default-text-pending");
const completedDefText = document.getElementById("default-text-completed");
const completedVisual = document.getElementById("completed-visual");
const taskDescriptionDiv = document.getElementById("task-details");
const tagDiv = document.getElementById("select-task");

//adding a new task
addtaskButton.addEventListener('click', function(e){
    e.preventDefault();
    createNewTask(taskDescriptionDiv, tagDiv);
});

//create a new task
function createNewTask(taskDescriptionDiv, tagDiv){
    let taskDescription = taskDescriptionDiv.value;
    let tag = tagDiv.value;

    //if task description is empty -- return
    if(taskDescription == ""){
        alert("Please type something");
        return;
    }

    pendingTasksContainer.innerHTML += '<div class = "pending-task-box common-task-box"> <div class="checkbox-div"> <input class="checkbox" type="checkbox"> </div> <div class="task-description"> '+ taskDescription +' </div> <div id="tag"> ' + tag + ' </div> <i class="far fa-trash-alt delete-task"></i> </div>'
    updatePendingCount(1);

    //some styling if there is atleast one pending task
    if(pendingCount > 0){
        document.getElementById("completed-heading").style.display = 'block';
        pendingDefText.style.display = 'none';
        completedDefText.style.display = 'block';
    }

    //add event listeners to checked buttons as soon as they are created
    addListenersToCheckBoxes();
    addListenersToDeleteBut();
    
}

//add listeners to delete tasks button
function addListenersToDeleteBut(){
    let delButtons = document.getElementsByClassName("delete-task");

    //add event listeners to delete buttons
    for(let button of delButtons){
        button.addEventListener('click', function(){
        button.parentElement.remove();
        updatePendingCount(-1);
        if(pendingCount == 0 && completedCount == 0){
            setDefaultScreen();
        }
        });
    }
}

//set default screen
function setDefaultScreen(){
    //remove completed heading and text & add pending default text
    pendingDefText.style.display = 'block';
    document.getElementById("completed-heading").style.display = 'none';
    completedDefText.style.display = 'none';   
}

//add listeners to check boxes
function addListenersToCheckBoxes(){
    let checkedButtons = document.getElementsByClassName('checkbox');

    for(let button of checkedButtons){
        button.addEventListener('click', async function(e){
            e.preventDefault();
            //add task to completed container
            await addTaskToCompleted(button.parentElement.parentElement);
            //now remove the task from pending container
            button.parentElement.parentElement.remove();
            await updatePendingCount(-1);
            await updateCompletedCount(1);

            if(pendingCount == 0 && completedCount > 0){
                completedDefText.style.display = 'none';
            }
        });
    }
}

//add the task to completed container
function addTaskToCompleted(box){
    let description = box.children[1].innerText;
    let category = box.children[2].innerText;
    completedTasksContainer.innerHTML += "<div class='common-task-box completed-task-box'> <div class='checkbox-div'> <input class='checkbox' type='checkbox' checked='true'> <i class='fas fa-check'></i> </div> <div class='task-description'> "+ description +" </div> <div id='tag'> " + category + " </div> </div>"
}


//update pendingtasks count
function updatePendingCount(val){
    let pendingCountText = document.getElementById("pending-count");
    pendingCount += val;
    pendingCountText.innerText = pendingCount;
}

//update completedtasks count
function updateCompletedCount(val){
    let completedCountText = document.getElementById("completed-count"); 
    completedCount += val;
    completedCountText.innerText = completedCount;
}

//clear all tasks 
clearTasksButton.addEventListener('click', function(){
    pendingTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";
    updatePendingCount(-pendingCount);
    updateCompletedCount(-completedCount);
    setDefaultScreen();
});
