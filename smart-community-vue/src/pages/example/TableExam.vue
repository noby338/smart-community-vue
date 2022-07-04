<!-- 本实例演示：
表格的使用
信息提示和确认对话框的统一标准
修改对话框
后端pagehelper的json数据和前端的分页组件的使用

 -->
<template>
  <div>

    <!-- 表格 -->
    <el-table :data="page.list" style="width: 100%">
      <el-table-column prop="eid" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="ename" label="姓名" width="280">
      </el-table-column>
      <el-table-column prop="hiredate" label="入职时间" width="280">
      </el-table-column>
      <el-table-column prop="dep.dname" label="部门" width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 修改对话框 -->
    <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="updateEmp" :inline="true" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="updateEmp.eid" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="updateEmp.ename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker type="date" v-model="updateEmp.hiredate" placeholder="请选择入职时间" size="small"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="updateEmp.dep.did">
            <el-option v-for="dep in deps" :label="dep.dname" :value="dep.did"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页组件，和后端的pagehelper配合使用 -->
    <el-pagination ref="refPag" background layout="prev, pager, next" :page-count="page.pages"
      :page-size="page.pageSize" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>


<script>
export default {
  name: "TableExam",
  data() {
    return {
      dialogFormVisible: false,//是否显示修改对话框
      updateEmp: {//修改的 emp
        eid: '',
        ename: '',
        dep: {
          did: '',
          dname: ''
        }
      },
      deps: [{//下拉预选框
        did: 10,
        dname: 'sale'
      }, {
        did: 20,
        dname: 'develop'
      }, {
        did: 30,
        dname: 'administration '
      }],
      

      // 分页对象(包含数据)
      page: {
        list: [{
          eid: 100,
          ename: 'one',
          hiredate: '2020-3-4',
          dep: { dname: 'sale' }
        }, {
          eid: 200,
          ename: 'tow',
          hiredate: '2020-3-5',
          dep: { dname: 'develop' }
        }, {
          eid: 300,
          ename: 'three',
          hiredate: '2020-3-6',
          dep: { dname: 'sale' }
        },
        ]
      },
    }
  },
  methods: {
    //添加页面
    toEmpAdd() {
      this.$router.push({
        path: '/empAdd',
        query: {
          deps: this.deps
        }
      })
    },
    //编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.updateEmp = row;
    },

    //删除
    handleDelete(index, row) {//这里的row表示删除的该行的对象
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定后执行的函数，发送请求
        this.$message.success('假装删除成功^_^' + index + row)
      }).catch(() => {//点击取消后执行的函数
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //修改
    update() {
      //发送请求。。。根据响应，给出提示信息
      this.$message.success("假装修改成功^_^")
      this.dialogFormVisible = false;//成功后将修改对话框隐藏

    },
    //取消修改
    updateCancel() {
      this.$message('取消修改');
      this.dialogFormVisible = false
    },
    //分页组件页码改变事件
    handleCurrentChange(pageNum) {
      this.getEmp(pageNum);
    },
  }

}
</script>

<style>
.el-form {
  line-height: 30px;
}

.el-dialog {
  width: 600px;
}

.el-pagination {
  line-height: 60px;
  padding: 40px;
}
</style>