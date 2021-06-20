<template>
  <div>
  </div>
</template>

<script>

export default {
  name: "Activation",
  mounted() {
    let email = this.$route.query.email.replace(/ /g, "+");
    let code = this.$route.query.code;
    this.$http.post(process.env.VUE_APP_BACKEND_URL + 'register/activate',
        {
          'code': code,
          'email': email
        })
        .then(response => {
          this.redirectURL = response.data;
          window.location.href = this.redirectURL;
        })
        .catch(err => window.location.href = err.response.data);
  },
}

</script>

<style scoped>

</style>
