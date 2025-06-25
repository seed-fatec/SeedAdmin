<script setup lang="ts">

import router from '~/router'
import { ref } from 'vue'
import { useTeacherStore } from '~/store/teacher'

const teacherStore = useTeacherStore()

// Dados do formulário
const teacher = ref({
  name: '',
  email: '',
  password: ''
})

async function handleSubmit() {
  const { execute: register } = teacherStore.registerTeacher(teacher.value)
  register()
    .then(() => {
      router.push({ name: 'teachers' })
    })
    .catch((error) => {
      console.error('Register failed: ', error)
    })
}
</script>

<template>
  <div>
    <TeacherForm v-model="teacher" @submit="handleSubmit" />
  </div>
</template>
