<template>
    <el-menu  class="el-menu-demo" mode="horizontal" router  >
        <span>Engrave-Time</span><br>
        <el-menu-item  index="/">Home(LOGO)</el-menu-item>
        <el-menu-item  index="problemSet">problemSet</el-menu-item>
        <el-menu-item  index="explore">explore</el-menu-item>

         <div class="user-info" :key="1" tid='logInOrOut'> 
             <template v-if='isAuthenticated'>
                 <el-dropdown trigger="click" @command="handleCommand" tid='username'>
                    <span class="el-dropdown-link">
                        {{ username }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout" id="logout" tid='logout'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </template>
            <template v-else>
                 <el-menu-item  index="login">登录</el-menu-item>
            </template>    
        </div>
    </el-menu>
</template>

<script>

import { mapGetters} from 'vuex'
    export default {
        data() {
            return {
                username: localStorage.getItem('username')
            }
        },
        computed:{
            ...mapGetters({
                isAuthenticated:'isAuthenticated',

            })
        },
        methods:{
            handleCommand(index) {
                if(index == 'logout'){
                    this.$store.dispatch('logout')
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 1300px;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #000000;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        /* color: #fff; */
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        /* color: #fff; */
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>