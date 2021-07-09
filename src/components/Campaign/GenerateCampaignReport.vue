<template>
  <div class="main-container">
    <div class="form-group">
      <h4>Generate token to access your campaigns</h4>
      <textarea v-model="token" class="form-control" id="exampleFormControlTextarea1"
                rows="3"></textarea>
    </div>
    <button class="btn btn-info btn-block" v-on:click="onGenerateReport">Generate report</button>
  </div>
</template>

<script>
export default {
  name: "GenerateCampaignReport",
  data() {
    return {
      token: ''
    }
  },
  methods: {
    onGenerateReport() {
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'campaign/', {token: this.token, message: "Hello"})
          .then(response => alert(response.data))
          .catch(error => alert(error.response.data))
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 60%;
  margin-left: 10%;
  margin-right: 30%;
}

.form-group {
  margin-top: 10%;
}
</style>