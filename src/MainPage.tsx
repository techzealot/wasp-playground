import { ChangeEvent, FormEvent } from "react"
import { createTask, getTasks, updateTask, useQuery } from "wasp/client/operations"
import { Task } from "wasp/entities"

export const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks)
  return (
    <div>
      <NewTaskForm />
      {tasks && <TaskList tasks={tasks} />}
      {isLoading && 'Loading...'}
      {error && 'Error'}
    </div>
  )
}

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  if (!tasks?.length) return <div>No Tasks</div>

  return (
    <div>
      {tasks.map((task, idx) => {
        return (
          <TaskView task={task} key={idx} />
        )
      })}
    </div>
  )
}

const TaskView = ({ task }: { task: Task }) => {
  const handleIsDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      })
    } catch (error: any) {
      window.alert('Error while updating task: ' + error.message)
    }
  }
  return (
    <div>
      <input type="checkbox" 
      id={String(task.id)} 
      checked={task.isDone}
      onChange={handleIsDoneChange}
      />
      {task.description}
    </div>)
}

const NewTaskForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const target = event.target as HTMLFormElement
      const description = target.description.value
      target.reset()
      await createTask({ description })
    } catch (err: any) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value="Create task" />
    </form>
  )
}
