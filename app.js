const taskManager = require('./taskManager')

const args = process.argv.slice(2)
const command = args[0]

const formatDate = (dateString) => {
  const date = new Date(dateString)

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const handleAddTask = () => {
  if (args.length < 3) {
    console.log('Usage: node app.js add "Task Title" "Task Description"')
    return
  }

  const title = args[1]
  const description = args[2]
  const newTask = taskManager.addTask(title, description)

  console.log('✓ Task added successfully!')
  console.log(`ID: ${newTask.id}, Title: "${newTask.title}"`)
}

const handleListTasks = () => {
  const tasks = taskManager.getAllTasks()

  console.log('\n=== Your Tasks ===')
  if (tasks.length === 0) {
    console.log('No tasks found!')
    return
  }

  tasks.forEach(task => {
    const status = task.completed ? 'Completed ✓' : 'Pending'
    console.log(`[${task.id}] ${task.title} (${status})`)
    console.log(`   Description: ${task.description}`)
    console.log(`   Created: [${formatDate(task.createdAt)}`)
    console.log()
  })
}

const handleCompleteTask = () => {
  if (args.length < 2) {
    console.log('Usage: node app.js complete <taskId>')
    return
  }

  const taskId = args[1]
  const task = taskManager.markTaskComplete(parseInt(taskId))
  // console.log(task)
  console.log(`✓ Task "${task.title}" marked as completed!`)

}

const handleDeleteTask = () => {
  if (args.length < 2) {
    console.log('Usage: node app.js delete <taskId>')
    return
  }

  const taskId = args[1]
  const task = taskManager.deleteTask(parseInt(taskId))
  console.log(`✓ Task "${task.title}" deleted successfully!`)
}

const main = () => {
  if (args.length === 0 || command === 'help') {
    showHelp()
    return
  }

  switch (command) {
    case 'add':
      handleAddTask()
      break
    case 'list':
      handleListTasks()
      break
    case 'complete':
      handleCompleteTask()
      break
    case 'delete':
      handleDeleteTask()
      break
    default:
      console.error(`❌ Unknown command: ${command}`)
      showHelp()
  }
}

main()
