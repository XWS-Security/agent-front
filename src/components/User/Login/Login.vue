<template>
  <div>
    <b-jumbotron>
      <div class="form-group">
        <label for="usernameInput">Email</label>
        <input type="text" class="form-control" id="usernameInput" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password">
      </div>
      <div class="form-group" v-if="!AreInputsValid || !IsEmailValid">
        <p>{{ errorMessage }}</p>
      </div>
      <div class="form-group">
        <a class="btn-link" v-on:click="onResetPassword()">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary btn-block" id="loginButton" v-on:click="onSubmit()">Login</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: null,
      password: null,
      secret: null,
      errorMessage: ''
    }
  },

  mounted() {
  },

  methods: {
    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }
      let store = this.$store;
      this.errorMessage = '';

      let user = {email: this.email, password: this.password}
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'login/', user)
          .then(response => {
            store.dispatch('startSession', response.data);
            this.dispatch(response.data.userType);
          }).catch(err => {
        console.log(err)
        alert("Login failed!")
      });
    },

    dispatch(type) {
      let router = this.$router;
      if (type === 'NistagramUser') {
        router.push('/instagram');
        return
      } else {
        router.push('/admin');
        return
      }
    },
    onResetPassword() {
      if (!this.IsEmailValid) {
        this.errorMessage = 'Email cannot be empty!';
        return;
      }
      this.errorMessage = '';
      this.$router.push('passwordReset/' + this.email)
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== null && this.password !== null && this.email !== '' && this.password !== '';
    },
    IsEmailValid() {
      return this.email !== null && this.email !== '';
    }
  }
}
</script>

<style scoped>

</style>
