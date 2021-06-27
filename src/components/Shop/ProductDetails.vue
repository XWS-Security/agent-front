<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-5">
      <div class="p-5">
        <img class="img-thumbnail" v-bind:src="image"/>
      </div>
    </div>
    <div class="col-1"></div>
    <div class="col-4 m-auto">
      <div class="card bg-light" style="height: 20rem;">
        <div class="card-body">
          <h2 class="card-text">{{ product.name }}</h2>
          <h4 class="card-text mb-5 text-muted">{{ product.price }}$</h4>

          <div class="d-flex flex-row justify-content-center bottom-row mb-4">
            <div class="p-2 col input-group m-auto">
              <div class="input-group-prepend">
                <div class="input-group-text bg-info" v-on:click="onAmountDown()">
                  <b-icon-arrow-down-circle variant="light"></b-icon-arrow-down-circle>
                </div>
              </div>
              <input type="number" class="form-control" id="inlineFormInputGroup"
                     placeholder="Amount"
                     v-model="amount">
              <div class="input-group-append">
                <div class="input-group-text bg-info" v-on:click="onAmountUp()">
                  <b-icon-arrow-up-circle variant="light"></b-icon-arrow-up-circle>
                </div>
              </div>
            </div>
            <div class="p-2 m-auto">
              <button class="btn btn-info" v-on:click="onAddToCart">Add item(s) to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/components/Product/HellperFunctions";
import {BIconArrowDownCircle, BIconArrowUpCircle} from "bootstrap-vue";

export default {
  name: "ProductDetails",
  components: {BIconArrowDownCircle, BIconArrowUpCircle},
  data() {
    return {
      product: {id: 0, name: '', price: 0},
      image: null,
      amount: 1
    }
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    this.getProduct(id)
  },
  methods: {
    getProduct(id) {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'product/' + id)
          .then(response => {
            this.product = response.data
            this.loadImage(response.data.picture)
          })
    },
    loadImage(name) {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'image/' + name, {responseType: 'arraybuffer'})
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    },
    onAmountUp() {
      if (this.amount < this.product.quantity) this.amount++;
    },
    onAmountDown() {
      if (this.amount > 0) this.amount--;
    },
    onAddToCart() {
      let cart = new Map()
      let cartJSON = sessionStorage.getItem("cart")
      if (cartJSON != null) cart = JSON.parse(cartJSON)

      cart[this.product.id] = this.amount
      sessionStorage.setItem("cart", JSON.stringify(cart))
      console.log(sessionStorage.getItem("cart"))
    }
  }
}
</script>

<style scoped>
.img-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: fill;
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

.bottom-row {
  position: absolute;
  bottom: 0
}
</style>