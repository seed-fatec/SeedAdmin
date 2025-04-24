<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';
import * as yup from 'yup'
import { useForm, Field } from 'vee-validate';

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const schema = yup.object({
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(5, 'A senha deve ter no mínimo 5 caracteres'),
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onLoginSubmit = handleSubmit(async () => {
  try {
    loading.value = true
    error.value = ''

    console.log('VALUES: ', values)

    const response = await authStore.login({
      email: values.email,
      password: values.password,
    })

    console.log('Login response:', response)

    
    if (response.data.value?.access_token) {
        router.push({ name: 'professor' })
    } else {
      error.value = 'Credenciais inválidas'
    }
  } catch (err) {
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
})

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen bg-primary">
        <h1 class="text-4xl font-bold text-white justify-center flex gap-0.5 mb-10">
            Se<span class="text-primary bg-white px-1 rounded">ed</span>    
            <span class="text-sm flex items-end"> Admin </span>
        </h1>

        <form @submit.prevent="onLoginSubmit">
            <div class="w-100 rounded-xl flex flex-col justify-center px-6 bg-white p-10 pb-6">
                <div class="flex flex-col text-2xl mb-10"> 
                    <label> Email </label>
                    <Field type="email" name="email" class="border p-2 rounded" placeholder="example@email.com"/>
                </div>

                <div class="flex flex-col text-2xl"> 
                    <label> Senha </label>
                    <Field type="password" name="password" placeholder="*******" class="border p-2 rounded"/>
                </div>

                <div class="flex flex-col bg-primary rounded-lg mt-10 hover:scale-[1.01] transform transition ease-in-out active:scale-[.99]">
                    <button type="submit" class="text-2xl font-semibold text-white cursor-pointer w-full p-3">
                        Login
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>