<template>
  <div class="d-flex flex-row flex-wrap align-content-around">
    <div class="p-2" v-for="(p, i) in products" v-bind:key="i">
      <product-small v-bind:id="p.id"></product-small>
    </div>
  </div>
</template>

<script>
import ProductSmall from "@/components/Shop/ProductSmall";

export default {
  name: "Shop",
  components: {ProductSmall},
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'product/all')
        .then(response => {
          this.products = response.data;
        }).catch(err => (alert(err.response.data)));
  }
}
</script>

<style scoped>

</style>