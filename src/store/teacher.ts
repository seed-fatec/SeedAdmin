import { defineStore } from 'pinia'
import type { Teacher } from '~/models/Teacher'
import { useApi } from '~/composables/api'

interface State {
  isLoading: boolean
  error: string | null
  success: boolean
}

const useTeacherStore = defineStore('Teacher', {
  state: (): State => ({
    isLoading: false,
    error: null,
    success: false
  }),
  
  actions: {
    registerTeacher(teacher: Teacher) {
      console.log(teacher)
      return useApi('/teacher/register').post(teacher).json<Teacher>()
    }
}})

export { useTeacherStore }