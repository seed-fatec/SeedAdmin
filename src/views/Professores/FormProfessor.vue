<script setup lang="ts">
import { Icon } from '@iconify/vue'
import router from '~/router'
import { ref } from 'vue'
import { useTeacherStore } from '~/store/teacher'

const goBack = () => {
  router.back()
}

const teacherStore = useTeacherStore()

// Dados do formulário
const teacher = ref({
  name: '',
  email: '',
  password: ''
})

const confirmPassword = ref('')

const handleSubmit = async () => {
  if (teacher.value.password !== confirmPassword.value) {
    alert('As senhas não coincidem')
    return
  }

  try {
    await teacherStore.registerTeacher(teacher.value)
    router.push({ name: 'teachers' })
  } catch (err: any) {
    console.error(err)
  }
}
</script>

<template> 
  <div class="w-full h-full flex flex-col p-2 pl-10">
    <div class="cursor-pointer w-fit" @click="goBack">
      <Icon icon="mdi:arrow-left" class="w-10 h-10 hover:scale-110 transition-transform" />
    </div>

    <!-- Título -->
    <div class="w-full flex p-4 pl-6 justify-between items-center">
      <h1 class="text-4xl font-semibold">Professores</h1>
    </div>

    <div class="flex items-center justify-between">
      <!-- Formulário -->
      <form class="h-full w-full text-xl flex flex-col gap-y-8 pl-6" @submit.prevent="handleSubmit">
        <div class="flex gap-x-6 flex-col">
          <label for="name">Nome</label>
          <input v-model="teacher.name" type="text" class="border rounded w-100 p-1"/>
        </div>

        <div class="flex gap-x-6 flex-col">
          <label for="email">Email</label>
          <input v-model="teacher.email" type="email" class="border rounded w-100 p-1"/>
        </div>

        <div class="flex gap-x-6 flex-col">
          <label for="password">Senha</label>
          <input v-model="teacher.password" type="password" class="border rounded w-100 p-1"/>
        </div>

        <div class="flex gap-x-6 flex-col">
          <label for="confirmPassword">Confirmar senha</label>
          <input v-model="confirmPassword" type="password" class="border rounded w-100 p-1"/>
        </div>
      </form>

      <!-- Branding + Botão -->
      <div class="flex flex-col w-full gap-10 border-primary">
        <div class="red-600">
          <h1 class="text-6xl font-bold text-primary justify-center flex gap-0.5">
            Se<span class="text-white bg-primary px-1 rounded">ed</span>    
            <span class="text-xl flex items-end"> Admin </span>
          </h1>
        </div>

        <div class="h-max text-xl w-full flex justify-center">
          <button 
            type="submit"
            class="bg-primary rounded-lg p-3 w-full text-white cursor-pointer hover:scale-99 hover:bg-[#3f4ebf] transition-transform duration-200"
          > 
            Registrar 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
