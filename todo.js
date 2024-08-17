document.addEventListener("DOMContentLoaded", () => {
    const storedtask = JSON.parse(localStorage.getItem('tasks'));

    if (storedtask) {
        storedtask.forEach((task) => tasks.push(task));
        updateTasksList();
        updatestate();
    }
});

let tasks = [];

const savetask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addtask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        updateTasksList();
        updatestate();
        savetask();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestate();
    savetask();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updatestate();
    savetask();
};

const editTask = (index) => {
    const taskinput = document.getElementById('taskinput');
    taskinput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updatestate();
    savetask();
};

const updatestate = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totaltask = tasks.length;
    const progress = (completeTasks / totaltask) * 100;
    const progressbar = document.getElementById('progress');

    progressbar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks}/${totaltask}`;

    if (tasks.length && completeTasks === totaltask) {
        blastconfetti();
    }
}

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
             <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
             <p>${task.text}</p>
          </div>
          <div class="icons">
             <img src="./edit.png" alt="edit" onClick="editTask(${index})" /> 
             <img src="./bin.png" alt="delete" onClick="deleteTask(${index})" /> 
          </div> 
        </div> 
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

document.getElementById("newtask").addEventListener("click", function (e) {
    e.preventDefault();
    addtask();
});

const blastconfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
