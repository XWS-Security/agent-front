<template>
  <div class="row">
    <div class="col-6">
      <div class="d-flex flex-column flex-wrap align-content-start">
        <div class="p-2" v-for="(p, index) in products" v-bind:key="index">
          <cart-item v-bind:id="p.id" v-model="p.amount" v-on:price-loaded="p.price = $event"></cart-item>
        </div>
      </div>
    </div>
    <div class="col-5 mt-5 bg-light border border-light rounded align-self-start p-4">
      <div class="form-group" v-if="!areAllFieldsValid">
        <p class="text-danger">All fields must be filled and phone number can contain only digits</p>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input type="text" class="form-control" id="surname" placeholder="Enter surname" v-model="surname">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone number</label>
        <input type="text" class="form-control" id="phoneNumber" placeholder="Enter phone number"
               v-model="phoneNumber">
      </div>
      <hr>
      <div class="form-group">
        <label for="country">Country</label>
        <input type="text" class="form-control" id="country" placeholder="Enter country" v-model="country">
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" class="form-control" id="city" placeholder="Enter city" v-model="city">
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input type="email" class="form-control" id="street" placeholder="Enter street" v-model="street">
      </div>
      <div class="form-group">
        <label for="zipCode">Zip code</label>
        <input type="text" class="form-control" id="zipCode" placeholder="Enter zip code" v-model="zipCode">
      </div>
      <hr>
      <h4>Your total will be {{ this.totalPrice }}$ (+ the cost of shipping)</h4>
      <hr>
      <button type="submit" class="btn btn-info btn-block" v-on:click="onSubmit()">Submit</button>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import CartItem from "@/components/Cart/CartItem";

export default {
  name: "Cart",
  components: {CartItem},
  data() {
    return {
      products: [],
      name: null,
      surname: null,
      email: null,
      phoneNumber: null,
      country: null,
      city: null,
      street: null,
      zipCode: null,
    }
  },
  mounted() {
    let map = JSON.parse(sessionStorage.getItem("cart"))
    let array = []
    for (let key in map) {
      let pair = {'id': key, 'amount': map[key], 'price': 0}
      array.push(pair)
    }
    this.products = array
  },
  methods: {
    onSubmit() {
      if (!this.areAllFieldsValid) return;
      let data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: {country: this.country, city: this.city, street: this.street, zipCode: this.zipCode},
        items: this.products
      }

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'order/', data)
          .then(response => {
            alert(response.data)
            sessionStorage.clear()
            this.$router.push('/shop')
          })
          .catch(err => (alert(err.response.data)))
    },
    isFieldEmpty(text) {
      return text == null || text === ''
    }
  },
  computed: {
    isNameValid() {
      return !this.isFieldEmpty(this.name)
    },
    isSurnameValid() {
      return !this.isFieldEmpty(this.surname)
    },
    isEmailValid() {
      return !this.isFieldEmpty(this.email)
    },
    isPhoneNumberValid() {
      return !this.isFieldEmpty(this.phoneNumber) && /^([0-9+]+)$/.test(this.phoneNumber);
    },
    isCountryValid() {
      return !this.isFieldEmpty(this.country)
    },
    isCityValid() {
      return !this.isFieldEmpty(this.city)
    },
    isStreetValid() {
      return !this.isFieldEmpty(this.street)
    },
    isZipCodeValid() {
      return !this.isFieldEmpty(this.zipCode)
    },
    areAllFieldsValid() {
      return this.isNameValid && this.isSurnameValid && this.isEmailValid && this.isPhoneNumberValid
          && this.isCountryValid && this.isCityValid && this.isStreetValid && this.isZipCodeValid;
    },
    totalPrice() {
      let result = 0
      for (let p of this.products) {
        result += p.price * p.amount
      }
      return result;
    }
  }
}
</script>

<style scoped>

</style>