<template>
  <div class="main-container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Campaign</th>
        <th scope="col">Date</th>
        <th scope="col">Likes</th>
        <th scope="col">Dislikes</th>
        <th scope="col">Comments</th>
        <th scope="col">Revenue</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r, index) in reports" v-bind:key="index">
        <th scope="row">{{ index }}</th>
        <td>{{ r.campaignId }}</td>
        <td>{{ r.date }}</td>
        <td>{{ r.likes }}</td>
        <td>{{ r.dislikes }}</td>
        <td>{{ r.comments }}</td>
        <td>{{ r.revenue }}</td>
        <td>
          <button class="btn btn-outline-info" v-on:click="onDownloadPDF(r.id)">Download PDF</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Reports",
  data() {
    return {
      reports: []
    }
  },
  mounted() {
    this.$http.get(process.env.VUE_APP_BACKEND_URL + 'campaign/')
        .then(response => this.reports = response.data)
        .catch(error => console.log(error.response.data))
  },
  methods: {
    onDownloadPDF(id) {
      id
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'campaign/pdf/', {responseType: 'blob'})
          .then(response => {//Create a Blob from the PDF Stream
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => console.log(error.response.data))
    }
  }
}
</script>

<style scoped>
.main-container {
  margin: 3%
}
</style>