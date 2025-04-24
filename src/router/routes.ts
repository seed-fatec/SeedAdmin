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
                component: () => import('~/views/Login.vue')
            },
        ],
    },
    {
        path: '',
        component: () => import('~/layouts/BoxLayout.vue'),
        redirect: '',
        meta: { requiresAuth: true },
        children: [
            {
                path: '/professor',
                name: 'professor',
                component: () => import('~/views/Professores/ListProfessor.vue')
            },
            {
                path: '/professor/form',
                name: 'professor_form',
                component: () => import('~/views/Professores/FormProfessor.vue')
            }
        ]
    }
]