<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/store/user'
import defaultAvatar from '~/assets/avatar.jpg'
import router from '~/router'

const userStore = useUserStore()

const { execute, data, isFetching } = userStore.fetchUsers()
execute()
onMounted(() => {
})

const register = () => {
    router.push({ name: 'teacher' })
}
</script>

<template>
    <div class="w-full h-full flex flex-col p-10 gap-y-10">
        <!-- Botão de cadastro -->
        <div class="w-full flex p-6 justify-between items-center">
            <h1 class="text-4xl font-semibold "> Professores </h1>
            <button 
                class="bg-primary text-white text-xl rounded-xl p-4 w-64 cursor-pointer hover:scale-99 hover:bg-[#3f4ebf] transition-transform duration-200" 
                @click="register">Registrar
            </button>
        </div>

        <!-- Container com altura fixa e scroll vertical -->
        <div class="w-full flex-1 overflow-auto border-2 border-primary rounded-xl no-scrollbar">
            <table class="table w-full text-center border-collapse">
                <thead class="bg-primary text-white sticky top-0 z-10">
                    <tr>
                        <th class="w-1/6">Id</th>
                        <th class="w-3/6">Nome</th>
                        <th class="w-2/6">Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isFetching">
                        <td colspan="3" class="py-4">Carregando...</td>
                    </tr>
                    <tr v-else-if="userStore.error">
                        <td colspan="3" class="py-4 text-red-600">{{ userStore.error }}</td>
                    </tr>
                    <tr v-for="user in data?.users.filter(u => u.role === 2)" :key="user.id"
                        class="hover:bg-gray-300 transition-colors duration-200">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td class="flex justify-center">
                            <img v-if="user.avatar_url" :src="user.avatar_url" alt="avatar"
                                class="w-12 h-12 rounded-full object-cover" />
                            <img v-else :src="defaultAvatar" alt="avatar padrão"
                                class="w-12 h-12 rounded-full object-cover" />
                        </td>
                    </tr>
                    <tr v-if="!isFetching && data?.users.filter(u => u.role === 2).length === 0">
                        <td colspan="3" class="text-gray-500 py-4">Nenhum usuário encontrado.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>