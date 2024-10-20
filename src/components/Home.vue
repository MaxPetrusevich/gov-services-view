<template>
  <div>
    <Header />
    <main class="home">
      <h1>Welcome to the Government Services Information System</h1>
      <p>Use the menu to navigate through different sections of the website.</p>
    </main>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  mounted() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      const token = localStorage.getItem('jwtToken');
      console.warn(token)// Убедитесь, что используете правильное имя токена
      if (!token || this.isTokenExpired(token)) {
        // Если токен отсутствует или истек, перенаправьте на страницу входа
        this.$router.push('/login'); // Замените '/login' на ваш маршрут
      }
    },
    isTokenExpired(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(payload.exp * 1000);
        return expirationDate < new Date();
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        return true; // Если токен не может быть разобран, считаем его истекшим
      }
    }
  }
};
</script>

<style scoped>
.home {
  padding: 60px 20px 20px; /* Отступ сверху для учета фиксированного хедера */
  text-align: center;
}
</style>
