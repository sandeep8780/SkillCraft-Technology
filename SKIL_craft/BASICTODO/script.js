document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            addedAt: new Date().toLocaleString(),
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
        loadTasks();
    }
}

function loadTasks() {
    const pendingTasksContainer = document.getElementById('pending-tasks');
    const completedTasksContainer = document.getElementById('completed-tasks');

    pendingTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.textContent = `${task.text} (Added: ${task.addedAt})`;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        taskElement.appendChild(completeButton);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        if (task.completed) {
            taskElement.classList.add('completed');
            completedTasksContainer.appendChild(taskElement);
        } else {
            pendingTasksContainer.appendChild(taskElement);
        }
    });
}

function toggleTaskCompletion(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toLocaleString() : null;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const newTaskText = prompt('Edit task', task.text);
        if (newTaskText) {
            task.text = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.filter(task => task.id !== taskId);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
