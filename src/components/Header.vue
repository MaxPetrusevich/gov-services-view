<template>
  <header>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Главная</router-link>
      <div v-if="isAuthenticated" class="auth-buttons">
        <button class="logout-button" @click="logout">Выход</button>
      </div>
      <div v-else class="auth-links">
        <router-link to="/login" class="nav-link">Авторизация</router-link>
        <router-link to="/register" class="nav-link">Регистрация</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('jwtToken');
      this.isAuthenticated = !!token;
    },
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('roleId');
      this.isAuthenticated = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
header {
  background-color: #f8f9fa; /* Цвет фона хедера */
  padding: 10px; /* Отступы вокруг хедера */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Тень под хедером */
}

.navbar {
  display: flex;
  justify-content: space-between; /* Выравнивание элементов */
  align-items: center; /* Вертикальное выравнивание */
}

.nav-link {
  margin: 0 10px; /* Отступы между ссылками */
  text-decoration: none; /* Убираем подчеркивание */
  color: #007bff; /* Цвет ссылок */
  font-weight: bold; /* Жирный текст */
}

.auth-buttons {
  display: flex; /* Flexbox для кнопок */
  align-items: center; /* Вертикальное выравнивание */
}

.logout-button {
  background-color: transparent; /* Прозрачный фон */
  border: none; /* Убираем рамку */
  cursor: pointer; /* Указатель при наведении */
  color: #dc3545; /* Цвет текста для кнопки выхода */
  font-weight: bold; /* Жирный текст */
}

.logout-button:hover {
  color: #c82333; /* Цвет при наведении */
}
</style>
