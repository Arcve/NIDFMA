<template>
  <div>
    <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="书名" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
    </el-col>
    <el-table
    :data="paperList"
    style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名 : {{ scope.row.name }}</p>
            <p>标题: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="New Paper" :visible.sync="addFormVisible">
      <el-form :model="addForm">
          <el-form-item label="name" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="title" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" auto-complete="off"></el-input>
          </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        filters:{
          name:''
        },
        addFromVisible: false,
        formLabelWidth: '120px',
        paperList: [{
          date: '2018-04-25',
          name: 'kurt',
          title: '基于Vue的组件化测试'
        }],
        addForm:{
          name:'',
          title:''
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleSearch(){
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      showAddDialog(){
        this.addAddFromVisible = true
        
      }
    }
  }
</script>