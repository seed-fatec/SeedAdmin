<!-- components/LoginForm.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '~/router'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: '',
})

const errorMessage = ref('')
const { execute: login, isFetching, data } = authStore.login(credentials.value)

const token = computed(() => data.value?.access_token || '')
const refresh_token = computed(() => data.value?.refresh_token || '')

const handleSubmit = async () => {
  errorMessage.value = ''
  try {
    await login()
    authStore.setToken(token.value, refresh_token.value)
    router.push({ name: 'teachers' })
  } catch (error) {
    errorMessage.value = 'Email ou senha inválidos.'
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white border border-gray-300 p-8 rounded-lg shadow-xl w-full max-w-sm space-y-6">
      <h1 class="text-3xl font-bold text-center text-primary">
        Se<span class="bg-primary text-white px-1 rounded">ed</span>
        <span class="text-sm text-primary">Admin</span>
      </h1>

      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="credentials.email"
            id="email"
            type="email"
            required
            placeholder="mail@site.com"
            class="input w-full mt-1"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            v-model="credentials.password"
            id="password"
            type="password"
            required
            placeholder="Digite sua senha"
            class="input w-full mt-1"
          />
        </div>

        <p v-if="errorMessage" class="text-error text-sm mt-1">{{ errorMessage }}</p>
      </div>

      <button
        type="submit"
        :disabled="isFetching"
        class="w-full btn btn-primary"
      >
        <span v-if="!isFetching">Entrar</span>
        <span v-else>Entrando...</span>
      </button>
    </form>
  </div>
</template>
