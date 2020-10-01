<template>
  <div class="">
    <form class="form-signin">
      <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
      </div>
      <label class="mb-0">Имя пользователя</label>
      <input v-model="form.login" type="text" class="form-control mb-2" placeholder="Имя пользователя" required
             autofocus>
      <label class="mb-0">Пароль</label>
      <input v-model="form.password" type="password" class="form-control mb-2" placeholder="Пароль" required>
      <button class="btn btn-primary btn-block btn-sm"
              :disabled="sending"
              @keyup.enter="submit"
              @click="submit"
              type="submit">
        <spinner class="mr-1" v-if="sending" color="white"/>
        <span v-else>Войти</span>
      </button>
      <div class="text-center">
        <small class="form-text text-danger" v-if="error">{{ error }}</small>
      </div>
    </form>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";

export default {
  name: "Auth",
  components: {Spinner},
  data() {
    return {
      error: '',
      sending: false,
      form: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      this.error = '';
      if (this.form.login && this.form.password) {
        this.sending = true;
        this.$store.dispatch('authorization', this.form).then((result) => {
          if (result) {
            this.$router.push({name: 'home'})
          }
        }).finally(() => {
          this.sending = false;
        })
      } else {
        this.error = 'Заполните обязательные поля';
      }
    }
  },
}
</script>