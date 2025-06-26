<script setup lang="ts">
import router from '~/router'
import { ref } from 'vue'
import { useTeacherStore } from '~/store/teacher'

const teacherStore = useTeacherStore()

const teacher = ref({
  name: '',
  email: '',
  password: '',
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

const goBack = () => {
  router.back()
}
</script>

<template>
  <button class="flex items-center gap-2 link link-hover mb-4" @click="goBack">
    <Icon icon="lucide:arrow-left" class="size-4" />
    Voltar
  </button>

  <h1 class="text-2xl font-medium mb-4">Cadastrar Novo Professor</h1>

  <TeacherForm v-model="teacher" @submit="handleSubmit" />
</template>
