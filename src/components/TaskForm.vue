<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'

const taskStore = useTaskStore()
const title = ref('')
const description = ref('')
const dueDate = ref('')
const successMessage = ref('')
// Touched form fields
const titleTouched = ref(false)
const descriptionTouched = ref(false)
const dueDateTouched = ref(false)

const addTask = () => {
  if (!title.value || !description.value || !dueDate.value) return

  // Creates a new task and add it to the store
  taskStore.addTask({
    id: Date.now(),
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    completed: false,
  })

  // Show success message
  successMessage.value = 'Task added successfully!'
  setTimeout(() => (successMessage.value = ''), 3000)
  // Clear form fields
  title.value = ''
  description.value = ''
  dueDate.value = ''
  titleTouched.value = false
  descriptionTouched.value = false
  dueDateTouched.value = false
}
</script>

<template>
  <form @submit.prevent="addTask" class="bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto">
    <h2 class="text-xl font-semibold mb-4">Create New Task</h2>
    <!-- Task Title -->
    <input
      v-model="title"
      type="text"
      placeholder="Title"
      class="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': !title && titleTouched }"
      @blur="titleTouched = true"
    />
    <!-- Task Description -->
    <textarea
      v-model="description"
      placeholder="Description"
      class="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': !description && descriptionTouched }"
      @blur="descriptionTouched = true"
    ></textarea>
    <!-- Task Due Date -->
    <input
      v-model="dueDate"
      type="date"
      class="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': !dueDate && dueDateTouched }"
      @blur="dueDateTouched = true"
    />
    <!-- Submit Button -->
    <button
      type="submit"
      class="p-2 rounded w-full disabled:opacity-50"
      :disabled="!title || !description || !dueDate"
    >
      Add Task
    </button>
    <!-- Success Message -->
    <p v-if="successMessage" class="text-green-500 text-sm mt-3">{{ successMessage }}</p>
  </form>
</template>
