<template>
  <div class="login-container">
    <Header />
    <h2>Авторизация</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="userLoginDto.identifyNumber" placeholder="Идентификационный номер" required />
      <input v-model="userLoginDto.password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios'; // Импортируйте axios

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      userLoginDto: {
        identifyNumber: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/login', this.userLoginDto); // Убедитесь, что URL правильный
        console.log('Авторизация успешна:', response.data);
        localStorage.setItem('jwtToken', response.data); // Сохраняем токен в localStorage
        this.$router.push('/'); // Переход на главную страницу после успешной авторизации
      } catch (error) {
        console.error('Ошибка авторизации:', error);
        alert('Неверные учетные данные. Пожалуйста, проверьте введенные данные.'); // Сообщение об ошибке для пользователя
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #45a049;
}
</style>
