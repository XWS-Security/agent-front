<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" v-bind:src="image" alt="Product image unavailable">
    <div class="card-body">
      <h5 class="card-title">{{ orderItem.product.name }}</h5>
      <p class="card-text">{{ orderItem.price }}$</p>
      <p class="card-text">Amount: {{ orderItem.amount }}</p>
    </div>
  </div>
</template>

<script>

import {_arrayBufferToBase64} from "@/components/Product/HellperFunctions";

export default {
  name: "OrderItem",
  props: ['orderItem'],
  data() {
    return {
      image: null
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'image/' + this.orderItem.product.picture, {responseType: 'arraybuffer'})
        .then(response => {
          let type = Object.values(response.headers)[2];
          this.image = _arrayBufferToBase64(response.data, type)
        })
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