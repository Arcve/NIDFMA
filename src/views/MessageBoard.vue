<template>
  <div>
        <p v-if='comments != []' :tid="commentIndex('test')">
          comments 已经载入 
        </p>
        <el-row v-for='(comment, index) in comments' :key="index" :tid='commentIndex(index)'  >
          <el-card :tid='commenter(comment.user)'>
              <p>{{comment.time}}-{{comment.user}}:</p>
              <br>
              {{comment.content}}
              <br>
              <el-button :tid='commentDeleteBtnIndex(index)' v-show=" (currentUser == id || comment.user == currentUser) && !comment.isDelete" 
              type="danger" @click="triggerDelete(index)">delete</el-button>              
          </el-card>
        </el-row>
          <el-dialog title="要删除此条评论吗？" tid='deleteDialog'
                  v-show="deleteDialogVisible"
                  width="30%"
                  :before-close="handleClose">
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose" tid='cancelDelete'>取 消</el-button>
                    <el-button type="primary" @click="deleteComment(deleteIndex)" tid="confirmDelete">确 定</el-button>
                  </span>
          </el-dialog>
        <template v-if="!currentUser">
          <el-button type="primary" @click="login" tid='loginBtn'>登录后才可以评论 </el-button>
          </template>
          
       <template v-else >      
         <el-form tid='commentForm'>
                <el-input type='textarea' v-model="content" placeholder="说点什么吧(输入长度为3-10个字)" tid="commentInput" ></el-input>
                <el-button type="primary" @click="submitComment" tid='commentSubmitBtn'>提交评论</el-button>
         </el-form>
      </template>
   
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props:['id'],
  data(){
    return {
      content:'',
      deleteIndex: -1,
      deleteDialogVisible: false,
      currentUser: localStorage.getItem('username')
    } 
  },
  computed:{
    ...mapGetters ({
      comments:'comments',
    })
  },
  methods:{ 
    commenter(user){
      return 'commenter' + user
    },
    commentIndex(index){
      return `comment${index}`
    },
    commentDeleteBtnIndex(index){
      return `commentDeleteBtn${index}`
    },
    login(){
      this.$router.push({name:'login'})
    },
    handleClose(){
      this.deleteDialogVisible = false
      this.deleteIndex = -1
    },
    triggerDelete(index){
      this.deleteIndex = index
      this.deleteDialogVisible = true
    },
    submitComment(){
      if(this.content.length <= 10 && this.content.length >= 3){
        let self = this
        this.$store.dispatch('submitComment', {id:this.id, content: this.content}).then((success)=>{
          if(success){
            this.$message.success("评论成功")
            this.content = ''
          } else {
            this.$message.error("评论失败")
          }
        })
      } else {
        this.$message.warning('评论字数为3-10个字')
      }
       
    },
    deleteComment(index){
      let self = this
      this.$store.dispatch('deleteComment', index).then((success)=>{
        if(success){
          self.$message.success("删除成功")
        } else {
          self.$message.error('删除失败')
        }   
        self.handleClose()
      })
      
    }
  },
  created(){
      this.$store.dispatch('getComments', this.id)
  }
}
</script>
