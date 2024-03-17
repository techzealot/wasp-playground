import { Task } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { type CreateTask } from 'wasp/server/operations'
import { type UpdateTask } from 'wasp/server/operations'

type CreateTaskInput = Pick<Task, 'description'>

export const createTask: CreateTask<CreateTaskInput, Task> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Task.create({
    data: {
      user: { connect: { id: context.user.id } },
      description: args.description
    }
  })
}

type UpdateTaskInput = Pick<Task, 'id' | 'isDone'>
type UpdateTaskOutput = {count: number}

export const updateTask: UpdateTask<UpdateTaskInput, UpdateTaskOutput> = async ({ id, isDone }, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Task.updateMany({
    where: { id ,user: { id: context.user.id }},
    data: {isDone}
  })
}
