<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" v-bind:src="image" alt="Product image unavailable">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.price }}$</p>
        <a href="#" class="btn btn-info" @click="onClick()">Shop now</a>
      </div>
    </div>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/components/Product/HellperFunctions";

export default {
  name: "ProductSmall",
  props: ['id'],
  data() {
    return {
      image: null,
      product: null
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'product/' + this.id)
        .then(response => {
          this.product = response.data
          this.loadImage(response.data.picture)
        })
  },
  methods: {
    onClick() {
      this.$router.push("/details?id=" + this.id)
    },
    loadImage(name) {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'image/' + name, {responseType: 'arraybuffer'})
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    }
  }
}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>