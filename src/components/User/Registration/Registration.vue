<template>
  <div>
    <b-jumbotron>
      <div class="form-group">
        <label for="usernameInput">Username</label>
        <input type="text" class="form-control" id="usernameInput" placeholder="Enter username" v-model="username">
      </div>
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label for="surnameInput">Surname</label>
        <input type="text" class="form-control" id="surnameInput" placeholder="Enter surname" v-model="surname">
      </div>
      <div class="form-group">
        <label for="emailInput">Email address</label>
        <input type="email" class="form-control" id="emailInput" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <label for="passwordVerification">Confirm password</label>
        <input type="password" class="form-control" id="passwordVerification"
               placeholder="Please reenter your password"
               v-model="passwordVerification">
      </div>
      <div class="form-group" v-if="!AreInputsValid || !IsPasswordSafe">
        <p>{{ errorMessage }}</p>
      </div>
      <div>
        <input type="radio" id="male" value="Male" v-model="gender">
        <label for="male">Male</label>
        <br>
        <input type="radio" id="female" value="Female" v-model="gender">
        <label for="female">Female</label>
        <br>
      </div>
      <div class="form-group">
        <label for="phoneNumberInput">Phone number</label>
        <input type="text" class="form-control" id="phoneNumberInput" placeholder="Enter phone number"
               v-model="phoneNumber">
      </div>
      <div class="form-group">
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" v-model="dateOfBirth" class="form-control" id="DateOfBirth">
      </div>
      <div class="form-group">
        <label for="about">About</label>
        <textarea type="text" v-model="about" class="form-control" id="About"/>
      </div>
      <div>
        <input type="radio" id="private" value="true" v-model="profilePrivate">
        <label for="private">Private</label>
        <br>
        <input type="radio" id="public" value="false" v-model="profilePrivate">
        <label for="public">Public</label>
        <br>
      </div>
      <button type="submit" class="btn btn-primary btn-block" v-on:click="onSubmit()">Submit</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data: function () {
    return {
      email: null,
      password: null,
      passwordVerification: null,
      errorMessage: '',
      name: null,
      surname: null,
      username: null,
      gender: "Male",
      dateOfBirth: new Date(),
      phoneNumber: null,
      about: null,
      profilePrivate: true
    }
  },
  methods: {
    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled and passwords must match!';
        return;
      }

      if (!this.IsPasswordSafe) {
        this.errorMessage = 'Password must contain at least 10 characters, a lowercase, an uppercase, a number and one special sign. Password can not contain less/greater than signs.';
        return;
      }

      this.errorMessage = '';

      if (/[<>]/.test(this.email) || /[<>]/.test(this.name) || /[<>]/.test(this.surname) || /[<>]/.test(this.username)) {
        this.errorMessage = 'Fields can not contain less/greater than signs.';
        alert(this.errorMessage);
        return;
      }

      let user = {
        username: this.username,
        email: this.email,
        password: this.password,
        repeatedPassword: this.passwordVerification,
        name: this.name,
        surname: this.surname,
        dateOfBirth: this.dateOfBirth,
        phoneNumber: this.phoneNumber,
        about: this.about,
        gender: this.gender,
        profilePrivate: this.profilePrivate
      }
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'register/', user)
          .then(response => {
            response.data
            alert("Activation link is sent to your email address.")
          }).catch(err => {
        alert(err.response.data)
      });
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== '' && this.password !== '' && this.name !== '' && this.surname !== '' && this.passwordVerification !== '' && this.password === this.passwordVerification
          && this.username !== '' && this.dateOfBirth !== null && this.gender !== '';
    },
    IsPasswordSafe() {
      if (this.password === null) return false;
      let hasMinimumLength = (this.password.length > 8);
      let hasNumber = /\d/.test(this.password);
      let hasLowercase = /[a-z]/.test(this.password);
      let hasUppercase = /[A-Z]/.test(this.password);
      let hasSpecial = /[!@#$%^&*)(+=._-]/.test(this.password);
      let hasForbiddenChar = /[<>]/.test(this.password);
      return hasMinimumLength && hasNumber && hasLowercase && hasUppercase && hasSpecial && !hasForbiddenChar;
    }
  }
}
</script>

<style scoped>

</style>
