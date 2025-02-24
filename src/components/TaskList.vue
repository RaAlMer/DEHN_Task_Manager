<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'
import EditTaskModal from './EditTaskModal.vue'

const taskStore = useTaskStore()

// Taks state
const selectedTaskId = ref<number | null>(null)
// Modal state
const showModal = ref(false)
// Sorting state
const sortKey = ref<keyof (typeof taskStore.tasks)[0] | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)

// Modal functions
const openEditModal = (taskId: number) => {
  selectedTaskId.value = taskId
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedTaskId.value = null
}

// Sorting function
const sortedTasks = computed(() => {
  if (!sortKey.value || !sortOrder.value) {
    return taskStore.tasks // Return original order if no sorting is applied
  }

  return [...taskStore.tasks].sort((a, b) => {
    const valA = a[sortKey.value] as string | number
    const valB = b[sortKey.value] as string | number

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

// Click handler for sorting
const sortBy = (key: keyof (typeof taskStore.tasks)[0]) => {
  if (sortKey.value === key) {
    if ('asc' === sortOrder.value) {
      sortOrder.value = 'desc'
    } else if ('desc' === sortOrder.value) {
      sortOrder.value = null
      sortKey.value = null
    } else {
      sortOrder.value = 'asc'
    }
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div>
    <!-- Tabular Task List -->
    <table
      v-if="0 < taskStore.tasks.length"
      class="w-full border-collapse border border-gray-200 mt-4"
    >
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2 cursor-pointer" @click="sortBy('id')">
            ID
            <span v-if="sortKey === 'id'">{{
              sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''
            }}</span>
          </th>
          <th class="border p-2 cursor-pointer" @click="sortBy('title')">
            Title
            <span v-if="sortKey === 'title'">{{
              sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''
            }}</span>
          </th>
          <th class="border p-2">Description</th>
          <th class="border p-2 cursor-pointer" @click="sortBy('dueDate')">
            Due Date
            <span v-if="sortKey === 'dueDate'">{{
              sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''
            }}</span>
          </th>
          <th class="border p-2 cursor-pointer" @click="sortBy('completed')">
            Status
            <span v-if="sortKey === 'completed'">{{
              sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''
            }}</span>
          </th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in sortedTasks" :key="task.id">
          <td class="border p-2">{{ task.id }}</td>
          <td class="border p-2 title">{{ task.title }}</td>
          <td class="border p-2 description">{{ task.description }}</td>
          <td class="border p-2">{{ task.dueDate }}</td>
          <td class="border p-2 status">
            <span :class="task.completed ? 'text-green-600' : 'text-red-600'" class="font-bold">
              {{ task.completed ? 'Completed' : 'Pending' }}
            </span>
          </td>
          <td class="border p-2">
            <button @click="taskStore.toggleTaskCompletion(task.id)" class="mr-2">
              Toggle Status
            </button>
            <button @click="openEditModal(task.id)" class="mr-2 action">Update</button>
            <button @click="taskStore.deleteTask(task.id)" class="action">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Task Modal -->
    <EditTaskModal v-if="showModal" :taskId="selectedTaskId" @close="closeModal" />
  </div>
</template>
