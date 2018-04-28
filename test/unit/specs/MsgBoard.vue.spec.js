/* eslint-disable */
import '@/bootstrap'
import '../globals'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import flushPromises from 'flush-promises'
import {mount, createLocalVue} from '@vue/test-utils'
import MessageBoardViewPageObj from '../page/MessageBoard.vue.po'
import container, {GLOBAL_ID} from '@/di'
import { createStore, STORE_ID } from '@/store'
import { createRouter, ROUTER_ID} from '@/router'
import sinon from 'sinon'
import { expect } from 'chai'
import MessageBoardView from '@/views/MessageBoard'
import ElementUI from 'element-ui'


describe('MessageBoard.vue test', () => {
  beforeEach( function () {
    this.axios = new AxiosMockAdapter(axios)
    this.localVue = createLocalVue()

    this.localVue.use(ElementUI)

    this.store = createStore(this.localVue)
    container.bind(STORE_ID).toConstantValue(this.store)

    this.router = createRouter(this.localVue)
    container.bind(ROUTER_ID).toConstantValue(this.router)
    
    this.owner = 'owner'    
    this.reqOwnerCommentsURL = `user/${this.owner}/comments`
    this.mountMessageBoardView = function (options) {
      let wrapper = mount(MessageBoardView, {localVue: this.localVue, store: this.store, router: this.router,...options })
      return new MessageBoardViewPageObj(wrapper)
    }
  
    this.router.push({path: `${this.owner}/comments`})
    return flushPromises()
  })

  afterEach(function () {
    this.axios.restore()
    // this.router.restore()
  })

  it('should enter route', function () {
    expect(this.router.currentRoute.path).to.equal(`/${this.owner}/comments`)
  })

  it('should mount without any errors', function () {
    this.mountMessageBoardView({
      propsData: {
      id: this.owner
    }})
    expect(console.error).not.to.have.been.called
  })

  describe("and when visitor enter owner's messageboard", function () {
    beforeEach(function(){
      this.data = {
        "data": {
          "success": true
        },
        "comments": [
          {
            "user": "wj",
            "time": "1990-11-15 21:29:19",
            "isDelete": false,
            "content": "我在 山西省 吕梁市",
            "agree": 0
          },
          {
            "user": "Jose",
            "time": "1994-08-03 19:25:12",
            "isDelete": false,
            "content": "我在 陕西省 宝鸡市",
            "agree": 0
          },
          {
            "user": "wj",
            "time": "2004-03-21 07:15:33",
            "isDelete": false,
            "content": "我在 贵州省 贵阳市",
            "agree": 0
          },
          {
            "user": "Gary",
            "time": "2008-11-14 05:16:45",
            "isDelete": false,
            "content": "我在 辽宁省 辽阳市",
            "agree": 0
          },
          {
            "user": "wj",
            "time": "1989-02-04 01:03:33",
            "isDelete": false,
            "content": "我在 香港特别行政区 新界",
            "agree": 0
          },
          {
            "user": "John",
            "time": "1999-11-22 12:21:23",
            "isDelete": false,
            "content": "我在 海南省 海口市",
            "agree": 0
          },
          {
            "user": "wj",
            "time": "1990-04-06 02:09:46",
            "isDelete": false,
            "content": "我在 内蒙古自治区 巴彦淖尔市",
            "agree": 0
          },
          {
            "user": "Barbara",
            "time": "1980-06-26 13:06:39",
            "isDelete": false,
            "content": "我在 西藏自治区 拉萨市",
            "agree": 0
          },
          {
            "user": "wj",
            "time": "1977-01-11 09:42:28",
            "isDelete": false,
            "content": "我在 湖南省 湘潭市",
            "agree": 0
          },
          {
            "user": "Carol",
            "time": "1982-06-27 21:56:25",
            "isDelete": false,
            "content": "我在 甘肃省 临夏回族自治州",
            "agree": 0
          }
        ],
        "success": true
      }
      this.axios.onGet(this.reqOwnerCommentsURL).replyOnce(200, this.data)
    })

    afterEach(function () {
      this.axios.reset()
    })
    describe('and when visitor do not log in', function () {
      beforeEach(async function () {
        this.router.push = this.routerPushStub = sinon.stub();
        this.msgBoard = this.mountMessageBoardView({
          propsData: {
          id: this.owner
        }})
        await flushPromises()
      })

      it('should show all comments without deleteBtn', function () {  
        let count = 0
        for(let i = 0; i < this.data.comments.length; i++){
          if(this.msgBoard.getCommentDeleteBtnIndex(i).isVisible()){
            count++;
          }
        }
        expect(count).to.equal(0)
      })
      
      it("should show login button ", function () {
        expect(this.msgBoard.loginBtn.exists()).to.be.true    
      })

      it("shouldn't show comment Form", function () {
        expect(this.msgBoard.commentForm.exists()).to.be.false
      })

      describe('and when visitor click login button', function () {
        it('should go to login page', function () {
          this.msgBoard.login() 
          expect(this.routerPushStub).calledWith({name:'login'})
        })
      }) 
    })
    describe("and when visitor isn't owner and logged in ", function () {
      beforeEach(async function(){
        this.visitor = 'wj' // or 'anotherRandomUser'
        this.store.commit('setUsername', this.visitor)
        this.msgBoard = this.mountMessageBoardView({
          propsData: {
          id: this.owner
        }})
        sinon.spy(this.msgBoard.vm.$message, 'warning')
        sinon.spy(this.msgBoard.vm.$message, 'error')
        sinon.spy(this.msgBoard.vm.$message, 'success')

        await flushPromises()
      })

      afterEach(function(){
        this.msgBoard.vm.$message.error.restore()
        this.msgBoard.vm.$message.success.restore()
        this.msgBoard.vm.$message.warning.restore()
        this.store.commit('resetUsername')
      })
      it("should not show login button", function () {
        expect(this.msgBoard.loginBtn.exists()).to.be.false
      })
      it('should show comment Form', function () {
        expect(this.msgBoard.commentForm.isVisible()).to.be.true
      })
      describe('and when user submit comment', function () {
        describe('and when content of comment Form is invaild', function () {
          beforeEach(function(){
            this.content = 'invaildContent'
          })
          it('should warn user with warn msg',function () {
            this.msgBoard.submitComment(this.content)
            expect(this.msgBoard.vm.$message.warning).to.be.calledWith(this.msgBoard.commentWarnMsg)     
          })

          it.skip('should not submit comment', function () {
          })
          it.skip("shouldn't clear the comment input", function () {
          })
        })

        describe('and when content of comment Form is vaild', function () {
          beforeEach(function(){
            this.content = 'Right'
          })
          describe('and when submit comment success', function () {
            beforeEach(async function(){
              
              this.axios.onPost(this.reqOwnerCommentsURL,{username: this.visitor, content: this.content})
              .reply(200, {success:true})

              this.msgBoard.submitComment(this.content)

              await flushPromises()
            })
            afterEach(function(){
              this.axios.reset()
            })
            it('should add a new comment', function () {
              let newComment = this.msgBoard.getCommentIndex(this.data.comments.length)
              expect(newComment.isVisible()).to.be.true
              expect(newComment.html()).to.include(this.visitor, this.content)
            })
            it('should clear the comment input', function () {
              expect(this.msgBoard.commentInput.element.value).to.be.empty
            })
            it('should show submit success msg', function () {
              expect(this.msgBoard.vm.$message.success).to.be.calledWith(this.msgBoard.commentSuccMsg)
            }) 
          })
          
          describe('and when submit comment fail', function () {
            beforeEach(async function(){
              this.axios.onPost(this.reqOwnerCommentsURL, {username : this.visitor, content:this.content})
              .reply(200, {success:false})

              this.msgBoard.submitComment(this.content)
              await flushPromises()
            })

            afterEach(function(){
              this.axios.reset()
            })
            it('should show submit fail msg', function () {   
              expect(this.msgBoard.vm.$message.error).to.be.calledWith(this.msgBoard.commentFailMsg)
            })              
          })
        })
      })  

      it('should show some deleteBtns, numbers:[0,n]', function () {
        let length = this.data.comments.length
        let msgBoard = this.msgBoard
        expect(
          Array
        .from({length}, (v, k) => k)
        .reduce((s, i) =>  msgBoard.getCommentDeleteBtnIndex(i).isVisible() + s, 0)
        ).to.be.within(0,length) 
      })
    })
    describe('and when visitor as owner logged in ', function () {
      beforeEach(async function(){
        this.visitor = this.owner 
        this.store.commit("setUsername", this.visitor)

        this.msgBoard = this.mountMessageBoardView({
          propsData: {
          id: this.owner
        }})
         
        sinon.spy(this.msgBoard.vm.$message, 'warning')
        sinon.spy(this.msgBoard.vm.$message, 'error')
        sinon.spy(this.msgBoard.vm.$message, 'success')

        await flushPromises()
      })

      afterEach(function(){  
        this.msgBoard.vm.$message.error.restore()
        this.msgBoard.vm.$message.success.restore()
        this.msgBoard.vm.$message.warning.restore()  
        this.store.commit("resetUsername")
      })
      it("shouldn't show login button", function () {
        expect(this.msgBoard.loginBtn.exists()).to.be.false
      })
      it('should show comment Form', function () {
        expect(this.msgBoard.commentForm.isVisible()).to.be.true
      })
      describe('and when user submit comment', function () {
        describe('and when content of comment Form is invaild', function () {
          beforeEach(function(){
            this.content = 'invaildComment'
          })
          it('should warn user with warn msg',function () {
            this.msgBoard.submitComment(this.content)
            expect(this.msgBoard.vm.$message.warning).to.be.calledWith(this.msgBoard.commentWarnMsg)     
          })
        })

        describe('and when content of comment Form is vaild', function () {
          beforeEach(function(){
            this.content = 'Right'
          })
          describe('and when submit success', function () {
            beforeEach(async function(){
              
              this.axios.onPost(this.reqOwnerCommentsURL,{username: this.visitor, content: this.content})
              .reply(200, {success:true})

              this.msgBoard.submitComment(this.content)

              await flushPromises()
            })
            afterEach(function(){
              this.axios.reset()
            })

            it('should add a new comment', function () {
              let newComment = this.msgBoard.getCommentIndex(this.data.comments.length)
              expect(newComment.isVisible()).to.be.true
              expect(newComment.html()).to.include(this.visitor, this.content)
            })

            it('should clear the comment input', function () {
              expect(this.msgBoard.commentInput.element.value).to.equal('')  
            })

            it('should show submit success msg', function () {
              expect(this.msgBoard.vm.$message.success).to.be.calledWith(this.msgBoard.commentSuccMsg)
            })
          })
          
          describe('and when submit fail', function () {
            beforeEach(async function(){
              this.axios.onPost(this.reqOwnerCommentsURL, {username:this.visitor, content:this.content}).reply(200, {success:false})

              this.msgBoard.submitComment(this.content)
              await flushPromises()
            })
            it('should show submit fail msg', function () {           
              expect(this.msgBoard.vm.$message.error).to.be.calledWith(this.msgBoard.commentFailMsg)
            })              
          })
        })
      })  

      describe('when visitor(as owner) can delete all comments', function () {
        it('should show all delete buttons', function () {
          let length = this.data.comments.length
          let msgBoard = this.msgBoard
          expect(
            Array
          .from({length}, (v, k) => k)
          .reduce((s, i) =>  msgBoard.getCommentDeleteBtnIndex(i).isVisible() + s, 0)
          ).to.equal(length) 
        })

        describe('and when visitor click a comment deleteBtn', function () {
          beforeEach(async function (){
            this.index = 0
            this.msgBoard.getCommentDeleteBtnIndex(this.index).trigger('click')  
            await flushPromises()
          })
          describe('and when pop up deleteDialog', function (){
            it('should show deleteDialog with confirmBtn, cancelBtn', function () {
              expect(this.msgBoard.deleteDialog.isVisible()).to.be.true
              expect(this.msgBoard.confirmDelete.isVisible()).to.be.true
              expect(this.msgBoard.cancelDelete.isVisible()).to.be.true
            })

            describe('and when click confirmDelete button', function () {
              describe('and when delete comment success', function () {
                beforeEach(async function(){
                  this.axios.onDelete(`${this.reqOwnerCommentsURL}/${this.index}`).replyOnce(200, {success: true})
                  this.deleteContent = this.msgBoard.getCommentIndex(this.index).html()
                  this.msgBoard.confirmDelete.trigger('click')
                  await flushPromises()
                })
  
                afterEach(function(){
                  this.axios.reset()
                })
  
                it('the comment should be changed as "this comment has been deleted"', function (done) {
                  let msgBoard = this.msgBoard 
                  let index = this.index
                  this.msgBoard.vm.$nextTick(function(){
                    expect(msgBoard.getCommentIndex(index).html()).contains(msgBoard.contentHasBeenDeleted)
                    done()
                  })
                })
    
                it('should show delete success msg', function () {
                  expect(this.msgBoard.vm.$message.success).be.calledWith(this.msgBoard.deleteSuccMsg)
                })
    
                it("deleteButton shouldn't show again", function () {
                  expect(this.msgBoard.getCommentDeleteBtnIndex(this.index).isVisible()).to.be.false
                })

                it('deleteDialog should close', function (done) {
                  let msgBoard = this.msgBoard 
                  let index = this.index
                  this.msgBoard.vm.$nextTick(function(){
                    expect(msgBoard.deleteDialog.isVisible()).to.be.true
                    done()
                  })
                })
              })
              describe('and when delete comment fail', function () {
                beforeEach(async function(){
                  this.axios.onDelete(`${this.reqOwnerCommentsURL}/${this.index}`).replyOnce(200, {success: false})
                  this.deleteContent = this.msgBoard.getCommentIndex(this.index).html()
                  this.msgBoard.confirmDelete.trigger('click')
                  await flushPromises()
                })
  
                afterEach(function(){
                  this.axios.reset()
                })
                it('the comment should be unchanged', function (done) {
                  let msgBoard = this.msgBoard 
                  let index = this.index
                  let deleteContent = this.deleteContent
                  this.msgBoard.vm.$nextTick(function(){
                    expect(msgBoard.getCommentIndex(index).html()).equal(deleteContent)
                    done()
                  })
                })
    
                it("show delete fail msg", function () {
                  expect(this.msgBoard.vm.$message.error).to.be.calledWith(this.msgBoard.deleteFailMsg)
                })
                it("deleteButton should still be visible", function () {  
                  expect(this.msgBoard.getCommentDeleteBtnIndex(this.index).isVisible()).to.be.true
                })
                it('deleteDialog should close', function (done) {     
                  let msgBoard = this.msgBoard 
                  let index = this.index
                  this.msgBoard.vm.$nextTick(function(){
                    expect(msgBoard.deleteDialog.isVisible()).to.be.true
                    done()
                  })
                })
              })
            })
            describe('and when click cancel button', function () {
              it('deleteDialog should close', function (done) {     
                let msgBoard = this.msgBoard 
                let index = this.index
                this.msgBoard.vm.$nextTick(function(){
                  expect(msgBoard.deleteDialog.isVisible()).to.be.true
                  done()
                })
              })
            })
            describe('and when click exit button', function () {
              it('deleteDialog should close', function (done) {     
                let msgBoard = this.msgBoard 
                let index = this.index
                this.msgBoard.vm.$nextTick(function(){
                  expect(msgBoard.deleteDialog.isVisible()).to.be.true
                  done()
                })
              })
            })
          })   
        })
      })
    })
  })
})
  
  
