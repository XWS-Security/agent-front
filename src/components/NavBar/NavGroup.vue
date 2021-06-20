<template>
  <ul v-bind:class="[ getSide, navbarClass ]">
    <slot></slot>
  </ul>
</template>

<script scoped>
export default {
  data() {
    return {
      navbarClass: 'navbar-nav',
    }
  },
  props: ['side'],
  name: "NavGroup",
  computed: {
    getSide() {
      if (this.side === 'ml-auto' || this.side === 'mr-auto' || this.side === 'mx-auto') {
        return this.side
      } else {
        return 'ml-auto'
      }

    }
  }
}
</script>

<style scoped>

</style>
