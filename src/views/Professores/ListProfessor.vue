<script setup lang="ts">
import { onMounted } from 'vue'
import { useTeacherStore } from '~/store/teacher'
import { Icon } from '@iconify/vue'
import { format } from 'date-fns'
import router from '~/router'

const userStore = useTeacherStore()

const { execute, data, isFetching } = userStore.fetchTeachers()
execute()
onMounted(() => {})

const register = () => {
  router.push({ name: 'createTeacher' })
}
</script>

<template>
  <!-- Botão de cadastro -->
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold text-neutral">Professores</h1>
    <button class="btn btn-primary btn-md" @click="register">
      <Icon icon="lucide:user-plus" class="size-5 mr-1" />
      Cadastrar professor
    </button>
  </div>

  <TableSkeleton v-if="isFetching" />

  <table v-else class="table rounded-lg text-center">
    <thead class="bg-gray-200 text-neutral">
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Data de Criação</th>
        <th>Avatar</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 no-scrollbar overflow-y-auto">
      <tr
        v-for="user in data?.users"
        :key="user.id"
        class="hover:bg-primary/10 cursor-pointer"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ format(new Date(user.created_at), 'dd/MM/yyyy') }}</td>
        <td class="flex justify-center">
          <img
            v-if="user.avatar_url"
            :src="user.avatar_url"
            alt="avatar"
            class="size-12 rounded-full object-cover"
          />
          <Icon
            v-else
            icon="mdi:account-circle"
            class="size-12 text-gray-300"
          />
        </td>
      </tr>
      <tr v-if="!isFetching && data?.users.length === 0">
        <td colspan="3" class="text-gray-400 py-4">
          Nenhum usuário encontrado.
        </td>
      </tr>
    </tbody>
  </table>
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
