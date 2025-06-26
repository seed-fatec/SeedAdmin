<!-- components/TeacherForm.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '~/router'

const props = defineProps<{
  modelValue: {
    name: string
    email: string
    password: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'submit'): void
}>()

const confirmPassword = ref('')
const errorMessage = ref('')

const updateField = (key: keyof typeof props.modelValue, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
  errorMessage.value = '' // limpa erro ao digitar
}

const handleSubmit = () => {
  if (props.modelValue.password !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem.'
    return
  }
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6  max-w-md">

    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
        <input
          id="name"
          type="text"
          class="input w-full mt-1"
          placeholder="John Doe"
          required
          :value="modelValue.name"
          @input="e => updateField('name', (e.target as HTMLInputElement).value)"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          class="input w-full mt-1"
          placeholder="mail@site.com"
          required
          :value="modelValue.email"
          @input="e => updateField('email', (e.target as HTMLInputElement).value)"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
        <input
          id="password"
          type="password"
          class="input w-full mt-1"
          placeholder="Digite sua senha"
          minlength="6"
          required
          :value="modelValue.password"
          @input="e => updateField('password', (e.target as HTMLInputElement).value)"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar senha</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="input w-full mt-1"
          placeholder="Confirme sua senha"
          required
        />
      </div>

      <p v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</p>
    </div>

    <button
      type="submit"
      class="w-full btn btn-primary"
    >
      Cadastrar
    </button>
  </form>
</template>
