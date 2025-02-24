import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  description: string
  dueDate: Date
  completed: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[],
  }),
  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
      this.saveTasks()
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id)
      if (-1 !== index) {
        this.tasks[index] = updatedTask
        this.saveTasks()
      }
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveTasks()
    },
    toggleTaskCompletion(id: number) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.saveTasks()
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
  },
})
