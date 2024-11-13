<template>
  <div class="register-container">
    <!-- Хэдер, растянутый по ширине -->
    <Header class="full-width-header" />

    <h2>Регистрация</h2>
    <form @submit.prevent="register" class="register-form">
      <input v-model="userRegisterDto.firstName" placeholder="Имя" required />
      <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>

      <input v-model="userRegisterDto.lastName" placeholder="Фамилия" required />
      <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>

      <input v-model="userRegisterDto.middleName" placeholder="Отчество" />
      <div v-if="errors.middleName" class="error-message">{{ errors.middleName }}</div>

      <input v-model="userRegisterDto.phone" placeholder="Телефон" />
      <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>

      <input v-model="userRegisterDto.email" type="email" placeholder="Email" />
      <div v-if="errors.email" class="error-message">{{ errors.email }}</div>

      <input v-model="userRegisterDto.identifyNumber" placeholder="Идентификационный номер" required />
      <div v-if="errors.identifyNumber" class="error-message">{{ errors.identifyNumber }}</div>

      <input v-model="userRegisterDto.passportSeries" placeholder="Серия паспорта" />
      <div v-if="errors.passportSeries" class="error-message">{{ errors.passportSeries }}</div>

      <input v-model="userRegisterDto.passportNumber" placeholder="Номер паспорта" />
      <div v-if="errors.passportNumber" class="error-message">{{ errors.passportNumber }}</div>

      <input v-model="userRegisterDto.address" placeholder="Адрес" required />
      <div v-if="errors.address" class="error-message">{{ errors.address }}</div>

      <input v-model="userRegisterDto.password" type="password" placeholder="Пароль" required />
      <div v-if="errors.password" class="error-message">{{ errors.password }}</div>

      <button type="submit">Зарегистрироваться</button>
    </form>

    <!-- Модальное окно для ошибок -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Ошибки регистрации</h3>
        <ul>
          <li v-for="(message, key) in errors" :key="key">{{ message.defaultMessage }}</li>
        </ul>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
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
      },
      errors: {}, // Для хранения сообщений об ошибках
      modalVisible: false // Управление отображением модального окна
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
        if (error.response && error.response.data) {
          // Если ошибка с валидацией, выводим сообщения
          this.errors = error.response.data.errors || {};
          this.modalVisible = true; // Отображаем модальное окно с ошибками
          console.error('Ошибка регистрации:', this.errors);
        } else {
          console.error('Ошибка регистрации:', error);
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
/* Обнуляем все отступы и padding для контейнера */
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  min-height: 100vh;
  padding: 0; /* Обнуляем padding */
  margin: 0; /* Убираем отступы */
}

h2 {
  margin-top: 10px; /* Убираем отступ сверху у заголовка */
}

.register-form {
  display: flex;
  flex-direction: column;
  max-width: 400px; /* Максимальная ширина формы */
  width: 100%; /* Форма растягивается до максимальной ширины */
}

.register-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #45a049;
}

.register-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

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

.modal-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  color: #d9534f; /* Цвет текста для ошибок */
}

.modal-content ul li {
  font-size: 1rem;
  margin-bottom: 10px;
}

.modal-content button {
  background-color: #d9534f; /* Цвет кнопки "Закрыть" */
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
  margin: 0; /* Убираем все отступы у хедера */
}
</style>
