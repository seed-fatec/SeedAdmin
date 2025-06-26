import type { RouteRecordRaw } from 'vue-router'

interface RouteStyle {
  path: string
  component: any
  redirect: Record<'name', string> | string
  name?: string
  children?: RouteRecordRaw[]
  meta?: Record<'requiresAuth', boolean>
}

export const routes: RouteStyle[] = [
  {
    path: '',
    component: '',
    redirect: { name: 'login' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('~/views/Login.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('~/layouts/AppLayout.vue'),
    redirect: '',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/teachers',
        name: 'teachers',
        component: () => import('~/views/Professores/ListProfessor.vue'),
      },
      {
        path: '/teacher/new',
        name: 'createTeacher',
        component: () => import('~/views/Professores/Create.vue'),
      },
    ],
  },
]
