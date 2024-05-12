document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    const clearBtn = document.getElementById('clear-btn');

    // Load tasks from local storage
    loadTasks();

    // Event listener for form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Event listener for delete task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            saveTasks();
        }
    });

    // Event listener for clear all tasks
    clearBtn.addEventListener('click', function() {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    });

    // Function to add task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(task) {
            tasks.push(task.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(task) {
                addTask(task);
            });
        }
    }
});
