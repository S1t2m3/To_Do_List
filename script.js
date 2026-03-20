const form=document.querySelector("form");
const allTask=document.querySelector(".allTask");
const input=document.getElementById("task");
// Just saving the task
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".allTask div span").forEach((task) => {
        tasks.push({
            text: task.textContent,
            completed: task.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Listening event at form
form.addEventListener('submit',(e)=>{
    e.preventDefault();  

    const text=input.value.trim();
    if(!text)
        return
    const parent=document.createElement("div");
    parent.style.marginBottom="10px";

    const task=document.createElement("span");
    task.style.marginRight="20px";
    task.textContent=text;

    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.style.width="50px";

    const doneButton=document.createElement("button");
    doneButton.textContent="Done";
    doneButton.style.marginRight="10px";
    doneButton.style.width="50px";
    

    parent.append(task,doneButton,deleteButton);
    allTask.append(parent);
    saveTasks();

    deleteButton.addEventListener('click',()=>{
        parent.remove();
        saveTasks();
    });

    doneButton.addEventListener('click',()=>{
        task.style.textDecoration="line-through";
        task.style.color="grey";
        doneButton.disabled = true;
        saveTasks();
    });
    form.reset(); //reset the form after submiting
})

// Loading the saved task after reloading 
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    storedTasks.forEach((item) => {
        const parent = document.createElement("div");
        parent.style.marginBottom = "10px";

        const task = document.createElement("span");
        task.style.marginRight = "20px";
        task.textContent = item.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.width = "60px";
        deleteButton.style.marginRight = "10px";

        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.style.width = "60px";
        doneButton.style.marginRight = "10px";

        if (item.completed) {
            task.style.textDecoration = "line-through";
            task.style.color = "grey";
            doneButton.disabled = true;
        }

        parent.append(task, doneButton, deleteButton);
        allTask.append(parent);

        deleteButton.addEventListener('click', () => {
            parent.remove();
            saveTasks();
        });

        doneButton.addEventListener('click', () => {
            task.style.textDecoration = "line-through";
            task.style.color = "grey";
            doneButton.disabled = true;
            saveTasks();
        });
    });
}
loadTasks();   // IMPORTANT
