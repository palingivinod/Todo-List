document.addEventListener('DOMContentLoaded', function () {
    const time = document.getElementById('time');


    setInterval(() => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        time.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);

    let task = "";
    let lists = document.querySelector('.lists');

 
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        addTask(task.last, task.id);
    });


    document.getElementById('addtask').addEventListener('click', () => {
        task = document.getElementById('input').value;
        if (task === "") return;
       
        task = task.charAt(0).toUpperCase() + task.slice(1);
        let data = {
            id: Date.now(),
            complete: false,
            last: `${task}`
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(data);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        addTask(data.last, data.id);
    });

    function addTask(task, id) {
        let newtask = document.createElement('li');
        newtask.classList.add("li");
        newtask.setAttribute("id", id);
        newtask.innerHTML = `
    <span class="task-text">${task}</span>
    <span>
        <button class="update-btn" id="update-${id}">Update</button>
        <button class="del-btn" id=${id}>Delete</button>
    </span>`;

        lists.appendChild(newtask);
        document.querySelector("#input").value = "";
    }

  lists.addEventListener("click", function (e) {
    if (e.target.classList.contains("update-btn")) {
        const idToUpdate = e.target.id.replace("update-", "");
        const item = document.getElementById(idToUpdate);

        if (!item) return;

        const newTaskText = prompt("Update your task:", item.querySelector('.task-text').textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            const updatedText = newTaskText.charAt(0).toUpperCase() + newTaskText.slice(1);
            item.querySelector('.task-text').textContent = updatedText;

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.map(task => {
                if (task.id == idToUpdate) {
                    task.last = updatedText;
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
});




    lists.addEventListener('click', function (e) {
        if (e.target.classList.contains('del-btn')) return;

        const clickedLi = e.target.closest('li');
        if (clickedLi) {
            clickedLi.classList.toggle('completed');
        }
    });

   
    lists.addEventListener("click", function (e) {
        if (e.target.classList.contains("del-btn")) {
            const idToDelete = e.target.getAttribute("id");
            const item = document.getElementById(idToDelete);
            if (item) item.remove();

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = tasks.filter(task => task.id != idToDelete); 
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
    });

});
