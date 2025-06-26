<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { Icon } from '@iconify/vue'
import router from '~/router'

const authStore = useAuthStore()

async function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="h-screen w-64 bg-white p-4 flex flex-col border-r border-gray-300 shadow-s">
    <header class="pb-4 border-b border-gray-200 mb-4">
      <h1 class="text-4xl font-bold text-primary justify-center flex gap-0.5">
        Se<span class="text-white bg-primary px-1 rounded">ed</span>
        <span class="text-sm flex items-end"> Admin </span>
      </h1>
    </header>

    <h2 class="font-medium text-primary">Menu</h2>
    <nav class="flex flex-col h-full">
      <div class="menu">
        <li>
          <h2 class="font-medium text-primary">Professores</h2>
          <ul>
            <li>
              <RouterLink :to="{ name: 'teachers' }"> Visualizar </RouterLink>
            </li>
          </ul>
        </li>
      </div>

      <button @click="handleLogout" class="btn btn-error btn-outline mt-auto">
        <Icon icon="lucide:log-out" class="size-5" />
        Sair
      </button>
    </nav>
  </div>
</template>
