<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '~/router';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: '',
})

const { execute: login, isFetching, data } = authStore.login(credentials.value)

const token = computed(() => {
  return data.value ? data.value.access_token : ''
})

const refresh_token = computed(() => {
  return data.value ? data.value.refresh_token : ''
})

async function handleSubmit() {
  login()
    .then(() => {
      authStore.setToken(token.value, refresh_token.value)
      router.push({ name: 'teachers' })
    })
    .catch((error) => {
      console.error('Login failed: ', error)
    })
}

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen bg-primary">
        <h1 class="text-4xl font-bold text-white justify-center flex gap-0.5 mb-10">
            Se<span class="text-primary bg-white px-1 rounded">ed</span>    
            <span class="text-sm flex items-end"> Admin </span>
        </h1>

        <form @submit.prevent="handleSubmit">
            <div class="w-100 rounded-xl flex flex-col justify-center px-6 bg-white p-10 pb-6">
                <div class="flex flex-col text-2xl mb-10"> 
                    <label> Email </label>
                    <input v-model="credentials.email" type="email" name="email" class="border p-2 rounded" placeholder="example@email.com"/>
                </div>

                <div class="flex flex-col text-2xl"> 
                    <label> Senha </label>
                    <input v-model="credentials.password" type="password" name="password" placeholder="*******" class="border p-2 rounded"/>
                </div>

                <div class="flex flex-col bg-primary rounded-lg mt-10 hover:scale-[1.01] transform transition ease-in-out active:scale-[.99]">
                    <button type="submit" :disabled="isFetching" class="text-2xl font-semibold text-white cursor-pointer w-full p-3">
                        Login
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>