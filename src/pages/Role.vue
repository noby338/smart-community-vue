/**
 * 系统管理  角色管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

       <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.roleName" placeholder="输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.roleNo" placeholder="输入角色代码"></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="loginName" label="账号" width="100">
      </el-table-column>
      <el-table-column sortable prop="password" label="密码" width="100">
      </el-table-column>
      <el-table-column sortable prop="name" label="用户名" width="100">
      </el-table-column>
      <el-table-column sortable prop="age" label="年龄" width="100">
      </el-table-column>
      <el-table-column sortable prop="gender" label="性别" width="100">
      </el-table-column>
      <el-table-column sortable prop="tellphone" label="电话" width="100">
      </el-table-column>
      <el-table-column sortable prop="state" label="状态" width="100">
      </el-table-column>
      <el-table-column sortable prop="roleNo" label="角色" width="100">
      </el-table-column>
      
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="menuAccess(scope.$index, scope.row)">菜单权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
         <el-form-item label="账号" prop="loginName"  v-if="this.editForm.addOrEdit=='add'">
          <el-input size="small" v-model="editForm.loginName" auto-complete="off" placeholder="请输入用户"></el-input>
          <!-- <el-input size="small" v-model="editForm.loginName" auto-complete="off" placeholder="请输入用户" v-else disabled></el-input> -->
        </el-form-item>
<el-form-item label="账号" prop="loginName" v-else >
          <el-input size="small" v-model="editForm.loginName" auto-complete="off" placeholder="请输入用户"  disabled></el-input>
        </el-form-item>

         <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item> 
         <el-form-item label="用户名" prop="password">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item> 
         <el-form-item label="年龄" prop="age" >
          <el-input size="small" v-model="editForm.age" auto-complete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>
         <el-form-item label="性别" prop="gender" >
          <el-input size="small" v-model="editForm.gender" auto-complete="off" placeholder="请输入性别"></el-input>
        </el-form-item>
         <el-form-item label="电话" prop="tellphone">
          <el-input size="small" v-model="editForm.tellphone" auto-complete="off" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input size="small" v-model="editForm.state" auto-complete="off" placeholder="请输入状态"></el-input>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 菜单权限 -->
    <el-dialog title="菜单权限" :visible.sync="menuAccessshow" width="30%" @click='closeDialog("perm")'>
      <el-tree ref="tree" default-expand-all="" :data="RoleRight" :props="RoleRightProps" :default-checked-keys="checkmenu" node-key="id" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   roleList,
//   roleSave,
//   roleDelete,
//   rolePwd,
//   RoleRightTree,
//   RoleRightSave
// } from '../../api/userMG'
import Pagination from '../pages/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      title: '添加',
      editForm: {
        age: '',
        gender: '',
        id:'',
        loginName: '',
        name:'',
        password: '',
        state: '',
        tellphone:'',
        addOrEdit:'',
        token: localStorage.getItem('Authorization')
      },
      // rules 表单验证
      rules: {
        systemNo: [
          { required: true, message: '请输入系统编码', trigger: 'blur' }
        ],
        roleNo: [
          { required: true, message: '请输入角色代码', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 5,
        total: ""
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取角色列表
    getdata(parameter) {
      // 模拟数据
      let res = {
        code: 0,
        msg: null,
        count: 6,
        data: []
      }
      this.loading = false
    //   this.listData = res.data
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.data.total
      // 模拟数据结束

      this.$axios.get('http://localhost:8080/user/findAll/'+this.pageparm.currentPage+'/'+this.pageparm.pageSize,
      ).then(res=>{
        this.loading=false
        // console.log(res);
        if(res.data.code==200){
             this.listData = res.data.data.list;
        //    console.log(this.listData);
           this.$message({
              type: 'info',
              message: res.data.msg
            })
           
        }else{
             this.$message({
              type: 'error',
              message: res.data.msg
            })
        }
      }).catch()

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // roleList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('获取角色列表失败，请稍后再试！')
      //   })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
        if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.age = row.age
        this.editForm.gender = row.gender
        this.editForm.loginName = row.loginName
        this.editForm.password = row.password
        this.editForm.state = row.state
        this.editForm.name = row.name
        this.editForm.tellphone = row.tellphone
        this.editForm.addOrEdit='edit'
      } else {
        this.title = '添加'
         this.editForm.age = ''
        this.editForm.gender = ''
        this.editForm.loginName = ''
        this.editForm.password = ''
        this.editForm.state = ''
        this.editForm.name = ''
        this.editForm.tellphone = ''
        this.editForm.addOrEdit='add'
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
             if(this.editForm.addOrEdit=='edit'){
                 this.$axios.post("http://localhost:8080/user/update",this.editForm).then(res=>{
               console.log(res);
               if(res.data.code == 200){
                  this.getdata(this.formInline)
                  this.$message({
                    type: 'success',
                    message: '用户修改成功！'
                  })
                  this.editFormVisible = false
                }else{
                   this.$message({
                   type: 'info',
                   message: res.data.msg
                })
                 this.editFormVisible = false
                }
             })
            .catch();
            }else{
                 this.$axios.post("http://localhost:8080/user/insert",this.editForm).then(res=>{
                if(res.data.code == 200){
                  this.getdata(this.formInline)
                  this.$message({
                    type: 'success',
                    message: '用户添加成功！'
                  })
                  this.editFormVisible = false
                }else{
                   this.$message({
                   type: 'info',
                   message: res.data.msg
                })
                 this.editFormVisible = false
                }
             })
            .catch();
            }
        } else {
          return false
        }
      })
    },
    // 删除角色
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
            this.$axios.delete("http://localhost:8080/user/delete/"+row.loginName )
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('角色删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          
        })
    },
    // 数据权限
    menuAccess: function(index, row) {
      this.menuAccessshow = true
      this.saveroleId = row.roleId
      RoleRightTree(row.roleId)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '获取权限成功'
            })
            this.changemenu(res.data.data)
            this.RoleRight = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      this.checkmenu = change
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = []
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          }
          temptree[list[i].id] = trow
          items.push(trow)
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]['children'].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          })
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]['children'].push(temptree[items[j].id])
        } else {
          tree.push(temptree[items[j].id])
        }
      }
      temptree = null
      items = null
      return tree
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.moduleIds = JSON.stringify(moduleIds)
      }
      RoleRightSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.menuAccessshow = false
            this.getdata(this.formInline)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('权限保存失败，请稍后再试！')
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 