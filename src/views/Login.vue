<template>
  <el-form :model="form" :rules='rules' ref="form" class="loginForm" tid='login_form' >
    <el-form-item label="用户名" prop="username" ref='validateUsername'>
        <!-- <el-input v-model="form.username" id="username" tid='login_username'></el-input> -->
        <input v-model="form.username" type='text' id="username" tid='login_username'/>
    </el-form-item>
    <el-form-item label="密码" prop="pwd" ref='validatePwd'>
        <!-- <el-input v-model="form.pwd" type='password' id="pwd" tid='login_pwd'></el-input> -->
         <input v-model="form.pwd" type='password' id="pwd" tid='login_pwd'/> 
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('form')"  id="submit" tid='login_submit'>登录</el-button>
    </el-form-item>
        <el-alert v-show='loginFailed' title="用户名或密码错误" :closable="false" tid='login_failed_msg' type="error" center show-icon></el-alert>
  </el-form>
</template>
<script>

import { mapGetters } from 'vuex'
export default {
  data(){
      return {
          form:{
              username:'',
              pwd:''
          },
          rules:{
              username:[
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
              ],
              pwd:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
          },
          loginFailed: false
      }
  },
  methods:{
      submitForm(formName){
          let self = this
          this.$refs[formName].validate((valid)=>{
              if(valid){
                  this.$store.dispatch('login', self.form)
                  .then(()=>{
                      this.$router.push({ path: '/' });
                  })
                  .catch(()=>{
                      this.loginFailed = true
                  })
              }
          })
      }
  }
  
}
</script>
<style scoped>
.loginForm{
    width: 350px;
    margin: 50px auto;
    height: 300px;
}
</style>


