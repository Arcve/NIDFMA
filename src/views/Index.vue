<template>
<div>
  <div v-if="!isAuthenticated && isRoot" :key="1">
    <h1>Index</h1>
    <!-- <router-link to="login"></router-link> -->
    <router-link to='login'>登录</router-link>
    
  </div>
  <div v-else :key="2">
    <Header></Header>
    <router-view></router-view>
  </div>

</div>
  
</template>
<script>
import Header from '../views/common/Header'
import {mapGetters} from 'vuex'
export default {
  components:{
    Header
  },
  computed:{
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    }),
    isRoot() {return this.$route.path == '/' }
  },
  created() {
    // loggedIn = 
  },
  methods: {

  }
  
}
</script>

