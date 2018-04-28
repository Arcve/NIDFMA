<template>
  <div >
    <div v-if="!!msg" :key="1">
       {{msg}}
       <br>
        <router-link :to = "{name:'comments'}">MessageBoard</router-link>
        <router-view :id = 'id'> </router-view>
    </div>
    <div v-else :key="2">
    <NotFound></NotFound>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
import NotFound from '../views/NotFound'

export default {
  props:['id'],
  components:{
    NotFound
  },
  data() {
    return {
      msg: ''
    }
  },
  created (){
      let self = this
      self.msg = `this is ${this.id}'s World`
      axios.get(`user/${this.id}`).then((res) => {
        if(res.data.userInfo){
          self.msg = `this is ${this.id}'s World`
        } else {
          self.msg = ''
        }
      })
      
  }
}
</script>
