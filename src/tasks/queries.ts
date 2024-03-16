import { type GetTasks } from 'wasp/server/operations'
import { type Task } from 'wasp/entities'

const getTasks: GetTasks<void, Task[]> = async (args, context) => {
  return context.entities.Task.findMany({
    orderBy: {
      id: 'asc'
    }
  })
}

export default getTasks;
