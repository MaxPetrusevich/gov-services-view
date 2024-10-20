<template>
  <div class="register-container">
    <Header />
    <h2>Регистрация</h2>
    <form @submit.prevent="register" class="register-form">
      <input v-model="userRegisterDto.firstName" placeholder="Имя" required />
      <input v-model="userRegisterDto.lastName" placeholder="Фамилия" required />
      <input v-model="userRegisterDto.middleName" placeholder="Отчество" />
      <input v-model="userRegisterDto.phone" placeholder="Телефон" />
      <input v-model="userRegisterDto.email" type="email" placeholder="Email" />
      <input v-model="userRegisterDto.identifyNumber" placeholder="Идентификационный номер" required />
      <input v-model="userRegisterDto.passportSeries" placeholder="Серия паспорта" />
      <input v-model="userRegisterDto.passportNumber" placeholder="Номер паспорта" />
      <input v-model="userRegisterDto.address" placeholder="Адрес" required />
      <input v-model="userRegisterDto.password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    Header
  },
  data() {
    return {
      userRegisterDto: {
        firstName: '',
        lastName: '',
        middleName: null,
        phone: null,
        email: null,
        identifyNumber: '',
        passportSeries: null,
        passportNumber: null,
        address: '',
        password: '',
        roleId: 1 // Добавляем roleId с значением по умолчанию
      }
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/register', this.userRegisterDto);
        console.log('Регистрация успешна:', response.data);

        // Сохранение токена в localStorage
        localStorage.setItem('token', response.data.token); // Предполагается, что токен приходит в поле `token`

        // Перенаправление на домашнюю страницу
        this.$router.push('/'); // Замените '/home' на ваш маршрут
      } catch (error) {
        console.error('Ошибка регистрации:', error);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 80px auto; /* Добавлено пространство сверху для хедера */
  padding: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-form button {
  background-color: #4CAF50; /* Цвет кнопки */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #45a049; /* Цвет кнопки при наведении */
}
</style>
