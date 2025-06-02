const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'tasks.json')

let tasks = []

// Function that adds a new task
const addTask = (title, description) => {
    const task = {
        id: tasks.length + 1,
        title: title,
        description: description,
        completed: false,
        createdAt: new Date().toDateString(),
    }

    tasks.push(task)
    // console.log(`Task added: ${JSON.stringify(task)}`);
    // console.log(`Tasks: ${JSON.stringify(tasks)}`);
}

// Function that returns all tasks
const getAllTasks = () => {
    return tasks
}

// Function that arks a task as completed
const markTaskComplete = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) task.completed = true
    else console.log(`There is no task with the id ${taskId}.`)
}

// Function that removes a task
const deleteTask = (taskId) => {
    const index = tasks.findIndex(t => t.id === taskId)
    if (index !== -1 ) {
        const deletedTask = tasks.splice(index, 1)[0]
        console.log(`Deleted task ${deletedTask.id} with title "${deletedTask.title}"`)
    }
}

// Function that saves tasks to tasks.json
const saveTasksToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8', (err) => {
        if (err) throw err
        console.log(`Tasks successfully saved into ${filePath}.`)
    })
}

// Function that loads tasks from tasks.json
const loadTasksFromFile = () => {
    tasks = fs.readFileSync(filePath, 'utf-8')
    console.log(tasks)
}

// addTask('Sample Task 1', 'This is a sample task 1 description.');
// addTask('Sample Task 2', 'This is a sample task 2 description.');
// addTask('Sample Task 3', 'This is a sample task 3 description.');
// console.log(getAllTasks())
// markTaskComplete(1)
// deleteTask(2)
// saveTasksToFile()
// loadTasksFromFile()

module.exports = {
    addTask,
    getAllTasks,
    markTaskComplete,
    deleteTask,
    saveTasksToFile,
    loadTasksFromFile,
}
