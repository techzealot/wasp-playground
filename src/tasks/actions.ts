import { Task } from 'wasp/entities'
import { type CreateTask } from 'wasp/server/operations'
import { type UpdateTask } from 'wasp/server/operations'

type CreateTaskInput = Pick<Task, 'description'>

export const createTask: CreateTask<CreateTaskInput, Task> = async (args, context) => {
  return context.entities.Task.create({
    data: {
      description: args.description
    }
  })
}

type UpdateTaskInput = Pick<Task, 'id' | 'isDone'>
type UpdateTaskOutput = Task

export const updateTask: UpdateTask<UpdateTaskInput, UpdateTaskOutput> = async ({ id, isDone }, context) => {
  return context.entities.Task.update({
    where: { id: id },
    data: {
      isDone: isDone,
    }
  })
}
