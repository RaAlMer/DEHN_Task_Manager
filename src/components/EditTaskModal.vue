<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'

const taskStore = useTaskStore()
const emit = defineEmits(['close'])
const props = defineProps<{ taskId: number | null }>()

// Task object
const task = ref<Task | null>(null)

// Watch taskId prop for changes and update task data
watch(
  () => props.taskId,
  (newId) => {
    const foundTask = taskStore.tasks.find((t) => t.id === newId)
    if (foundTask) {
      task.value = { ...foundTask }
    }
  },
  { immediate: true },
)

// Ensure task is loaded when the component is mounted
onMounted(() => {
  if (props.taskId) {
    const foundTask = taskStore.tasks.find((t) => t.id === props.taskId)
    if (foundTask) {
      task.value = { ...foundTask }
    }
  }
})

// Function to update the task in the store
const updateTask = () => {
  if (!task.value.title || !task.value.description || !task.value.dueDate) return

  taskStore.updateTask(task.value)
  emit('close')
}
</script>

<template>
  <div v-if="props.taskId" class="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Update Task</h2>
      <!-- Task Title -->
      <input v-model="task.title" placeholder="Title" class="border p-2 w-full mb-2" />
      <!-- Task Description -->
      <textarea
        v-model="task.description"
        placeholder="Description"
        class="border p-2 w-full mb-2"
      ></textarea>
      <!-- Task Due Date -->
      <input type="date" v-model="task.dueDate" class="border p-2 w-full mb-2" />
      <!-- Toggle Completed Switch -->
      <label class="flex items-center cursor-pointer mt-2">
        <span class="mr-2">Completed</span>
        <input type="checkbox" v-model="task.completed" class="sr-only" />
        <div
          class="relative w-10 h-5 bg-gray-300 rounded-full transition duration-300"
          :class="{ 'bg-red-500': task.completed }"
        >
          <div
            class="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300"
            :class="{ 'translate-x-5': task.completed }"
          ></div>
        </div>
      </label>
      <!-- Buttons -->
      <div class="flex justify-end mt-4">
        <button @click="emit('close')" class="mr-2 p-2 rounded action">Cancel</button>
        <button
          @click="updateTask"
          class="p-2 rounded"
          :disabled="!task.title || !task.description || !task.dueDate"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
