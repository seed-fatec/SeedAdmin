import { defineStore } from 'pinia'
import type { User } from '~/models/User'
import { useApi } from '~/composables/api'

interface UsersResponse {
  users: User[]
}

interface State {
  users: User[]
  isLoading: boolean
  error: string | null
}

export const useUserStore = defineStore('User', {
  state: (): State => ({
    users: [],
    isLoading: false,
    error: null
  }),

  actions: {
    fetchUsers() {
        return useApi('/users').get().json<UsersResponse>()
    },

    clearUsers() {
      this.users = []
    },

    getUserById(id: number): User | undefined {
      return this.users.find(user => user.id === id)
    }
  }
})
