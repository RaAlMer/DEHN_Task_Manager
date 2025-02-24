<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Simple Task Manager</h1>
    <TaskForm />
    <TaskList />
  </div>
</template>
