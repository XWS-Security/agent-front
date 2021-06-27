<template>
  <div class="row" style="width: 50rem;">
    <div class="col">
      <img class="card-img-top" v-bind:src="image" alt="Product image unavailable">
    </div>
    <div class="col">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.price }}$</p>

        <div class="p-2 col input-group m-auto">
          <div class="input-group-prepend">
            <div class="input-group-text bg-info" v-on:click="onAmountDown()">
              <b-icon-arrow-down-circle variant="light"></b-icon-arrow-down-circle>
            </div>
          </div>
          <input type="number" class="form-control" id="inlineFormInputGroup"
                 placeholder="Amount"
                 v-model="amountSelected">
          <div class="input-group-append">
            <div class="input-group-text bg-info" v-on:click="onAmountUp()">
              <b-icon-arrow-up-circle variant="light"></b-icon-arrow-up-circle>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/components/Product/HellperFunctions";
import {BIconArrowDownCircle, BIconArrowUpCircle} from "bootstrap-vue";

export default {
  name: "CartItem",
  props: ['id', 'value', 'price'],
  components: {BIconArrowDownCircle, BIconArrowUpCircle},
  data() {
    return {
      product: {id: 0, name: '', price: 0, quantity: 0},
      image: null,
      amountSelected: this.value
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'product/' + this.id)
        .then(response => {
          this.product = response.data
          this.$emit('price-loaded', this.product.price)
          this.loadImage(response.data.picture)
        })
  },
  methods: {
    loadImage(name) {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'image/' + name, {responseType: 'arraybuffer'})
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    },
    onAmountUp() {
      if (this.amountSelected < this.product.quantity) this.amountSelected++;
      this.$emit('input', this.amountSelected)
    },
    onAmountDown() {
      if (this.amountSelected > 0) this.amountSelected--;
      this.$emit('input', this.amountSelected)
    },
  }
}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>