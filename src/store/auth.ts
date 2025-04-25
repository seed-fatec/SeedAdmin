import { useStorage, type AfterFetchContext, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Token, User } from '~/models/Auth'
import type { Resource } from '~/models/Resource'

interface State {
    token: RemovableRef<string>
    refresh_token: RemovableRef<string>
}

const useAuthStore = defineStore('Auth', {
    state: (): State => ({
        token: useStorage('access_token', ''),
        refresh_token: useStorage('refresh_token', '')
    }),
    actions: {
        login(user: User) {
            return useApi('/admin/login').post(user).json<Token>()
        },
        logout() {
            return useApi('/logout', {
                afterFetch: async (ctx: AfterFetchContext) => {
                    this.setToken('', '')

                    return ctx
                }
            }).post({refresh_token: this.$state.refresh_token})
        },
        setToken(token: string, refresh_token: string) {
            this.$state.token = token
            this.$state.refresh_token = refresh_token
        },
    }
})

export { useAuthStore }