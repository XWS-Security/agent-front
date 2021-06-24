<template>
  <div>
    <b-jumbotron>
      <hr>
      <div class="d-flex align-content-around flex-wrap">
        <b-card v-for="(product, index) in products" :value="product.id" :key="index"
                :title="product.name"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <b-card-text>
          </b-card-text>
          Price: {{ product.price }}
          <hr>
          Quantity: {{ product.quantity }}
          <hr>
          <b-button href="#" variant="primary" @click="viewProduct(product.id)">View product</b-button>
        </b-card>
      </div>
      <hr>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "AllProducts",

  data: function () {
    return {
      products: []
    }
  },

  mounted() {
    this.getAllProducts();
  },

  methods: {
    getAllProducts() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'product/all')
          .then(response => {
            this.products = response.data;
          }).catch(err => {
        console.log(err)
      });
    },

    viewProduct(id) {
      this.$router.push("/product?id=" + id)
    }
  }
}
</script>

<style scoped>

</style>
