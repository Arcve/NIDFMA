<template>
  <div>
    Welcome to Home, {{username}}!
  </div>
</template>
<script>
export default {
  data(){
    return {
      username: ''
    }
  },

  methods:{

  },
  mounted(){
    let username = localStorage.getItem('username')
    if(username){
      this.username = username
    }
  }

}
</script>

