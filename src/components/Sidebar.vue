<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import Icon from './Icon.vue';
import router from '~/router';

const authStore = useAuthStore()

async function handleLogout() {
    const { execute } = authStore.logout()

    await execute()
    router.push({ name: 'login' })
}
</script>

<template>
    <div class="h-screen w-70 bg-neutral-50 p-2 flex flex-col px-4">
        <div class="h-30 flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-primary justify-center flex gap-0.5">
                Se<span class="text-white bg-primary px-1 rounded">ed</span>    
                <span class="text-sm flex items-end"> Admin </span>
            </h1>
        </div>

        <div class=" flex flex-col text-lg pt-8">
            <RouterLink :to="{name: 'teachers'}" class="rounded font-semibold text-center p-1 hover:bg-primary hover:text-white cursor-pointer transform transition ease-in-out"> 
                Professores 
            </RouterLink>
        </div>

        <div class="flex flex-col justify-center mt-auto p-1 rounded">
            <button @click="handleLogout" class="flex gap-x-4">
                <Icon icon="material-symbols:logout-rounded" class="size-6" />
                Logout
            </button> 
        </div>
    </div>
</template>