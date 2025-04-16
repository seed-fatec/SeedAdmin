export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('~/views/Login.vue')
    },
    {
        path: '/professor',
        name: 'ProfessorList',
        component: () => import('~/views/Professores/ListProfessor.vue')
    },
    {
        path: '/professor/form',
        name: 'ProfessorForm',
        component: () => import('~/views/Professores/FormProfessor.vue')
    }
]