<template>
  <div class="login-container">
    <Header class="full-width-header" />
    <h2>Авторизация</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="userLoginDto.identifyNumber" placeholder="Идентификационный номер" required />
      <div v-if="errors.identifyNumber" class="error-message">{{ errors.identifyNumber }}</div>

      <input v-model="userLoginDto.password" type="password" placeholder="Пароль" required />
      <div v-if="errors.password" class="error-message">{{ errors.password }}</div>

      <button type="submit">Войти</button>
    </form>

    <!-- Модальное окно для ошибок -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Ошибка авторизации</h3>
        <p>{{ errorMessage }}</p>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';

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
      },
      errors: {}, // Для хранения ошибок валидации
      modalVisible: false, // Управление модальным окном
      errorMessage: '' // Сообщение об ошибке
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/login', this.userLoginDto);
        console.log('Авторизация успешна:', response.data);
        localStorage.setItem('jwtToken', response.data);
        this.$router.push('/'); // Переход на главную страницу после успешной авторизации
      } catch (error) {
        if (error.response && error.response.data) {
          // Если ошибка с валидацией
          this.errors = error.response.data.errors || {};
          this.modalVisible = true;
          this.errorMessage = 'Неверные учетные данные. Пожалуйста, проверьте введенные данные.';
        } else {
          console.error('Ошибка авторизации:', error);
        }
      }
    },
    closeModal() {
      this.modalVisible = false;
    }
  }
};
</script>

<style scoped>
/* Общие стили для страницы */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

h2 {
  margin-top: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
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

.login-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Стили ошибок */
.error-message {
  color: red;
  font-size: 12px;
}

/* Стиль для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.modal-content p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #d9534f; /* Цвет текста ошибки */
}

.modal-content button {
  background-color: #d9534f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.modal-content button:hover {
  background-color: #c9302c;
}

/* Стиль для хедера, растянутого по ширине */
.full-width-header {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  margin: 0;
}
</style>
