import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/LoginComponent.vue'; // Caminho para o componente de login
import Ativos from '../components/AtivosComponent.vue'; // Caminho para o componente de ativos
import Deletar from '../components/DeletadoComponent.vue'; // Corrigido o nome do arquivo
import Relatorio from '../components/RelatorioComponents.vue'; // Corrigido o nome para singular
import Help from '../components/AjudasComponent.vue';
import Alterar from '../components/AlterarComponents.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login, // Define a página de login como rota principal
        meta: { title: 'Controle Unilever' }
    },
    {
        path: '/ativos',
        name: 'Ativos',
        component: Ativos,
        meta: { requiresAuth: true }, // Rota protegida
    },
    {
        path: '/help',
        name: 'Help',
        component: Help,
     
    },
    {
        path: '/remover',
        name: 'Deletar',
        component: Deletar,
    },
    {
        path: '/relatorio',
        name: 'Relatorio',
        component: Relatorio,
    },
    {
        path: '/alterar',
        name: 'Alterar',
        component: Alterar,
    },
    {
        path: '*',
        redirect: '/', // Redireciona para login qualquer rota não definida
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

// Middleware de verificação de autenticação
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token'); // Verifica se há um token de autenticação no localStorage
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/'); // Redireciona para a página de login se não estiver autenticado
    } else {
        next(); // Permite o acesso à rota solicitada
    }
});

export default router;
