<template>
  <div>
    <!-- product-list -->
    <el-row v-for="product in products" :key="product">
      <el-card>
        <h2>{{product.title}} - {{product.price}}</h2>
        <br>
        <el-button type="primary" @click="addProductToCart(product)">add to cart</el-button>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed(){
    mapGetters({
      products:'allProducts'
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