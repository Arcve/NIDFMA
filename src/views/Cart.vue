<template>
  <div>
    <!-- shopping-cart -->
    <p v-show="!products.length">Your cart is Empty</p>
    <el-row v-for="product in products" :key="product">
      <el-card>
        <h2>{{product.title}} - {{product.price}} X {{product.quantity}}</h2>
        <br>
        <el-button type="primary" @click="deleteProduct(product)">delete this product in cart</el-button>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed(){
    mapGetters({
      products:'cartProducts',
      checkoutStatus:'checkoutStatus'
    })
  },
  methods: mapActions([
    'addProductToCart'
  ]),
  created () {
    this.$store.dispatch('getAllProducts')
  }

}
</script>