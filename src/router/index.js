import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home.vue'), // Ваш главный компонент
        meta: { requiresAuth: true },
    },
    // Добавьте другие маршруты по мере необходимости
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Защита маршрутов по аутентификации
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwtToken');
    const roleId = localStorage.getItem('roleId');

    if (to.meta.requiresAuth && !token) {
        console.warn('Токен отсутствует, перенаправление на страницу входа');
        next({ path: '/login' });
    } else if (to.meta.requiresAdmin && roleId !== '1') {
        console.warn('Пользователь не имеет прав администратора, перенаправление на главную страницу');
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;
