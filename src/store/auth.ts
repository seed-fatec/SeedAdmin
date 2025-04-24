import { useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Token, User } from '~/models/Auth'
import type { Resource } from '~/models/Resource'

interface State {
    token: RemovableRef<string>
}

const useAuthStore = defineStore('Auth', {
    state: (): State => ({
        token: useStorage('access_token', ''),
    }),
    actions: {
        login(user: User) {
            const response = useApi('/admin/login').post(user).json<Token>()
            if(response.data.value)
            {
                this.setToken(response.data.value.access_token)
            }
            return response
        },
        setToken(token: string) {
            this.$state.token = token
        },
    }
})

export { useAuthStore }