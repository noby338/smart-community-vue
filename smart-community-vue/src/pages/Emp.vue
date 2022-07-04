
<template>
  <div>
    <el-form ref="searchEmp" :model="searchEmp" label-width="80px" :inline="true" @keyup.enter.native="enterSearch"
      align="left">
      <el-form-item label="编号">
        <el-input v-model="searchEmp.eid" placeholder="输入编号查询"></el-input>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="searchEmp.ename" placeholder="输入姓名查询"></el-input>
      </el-form-item>

      <el-form-item label="部门" ref="refDeps">
        <el-select v-model="searchEmp.dep.did" placeholder="选择部门查询" clearable>
          <el-option v-for="dep in deps" :label="dep.dname" :value="dep.did"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="" @click="clear">清除</el-button>
        <el-button @click="toEmpAdd"><i class="el-icon-plus"></i>新添员工</el-button>
      </el-form-item>

    </el-form>

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

    <el-pagination ref="refPag" background layout="prev, pager, next" :page-count="page.pages"
      :page-size="page.pageSize" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>


<script>
export default {
  name: "Emp",
  data() {
    return {
      dialogFormVisible: false,
      updateEmp: {//修改的 emp
        eid: '',
        ename: '',
        dep: {
          did: '',
          dname: ''
        }
      },

      searchEmp: {//查询的条件
        eid: '',
        ename: '',
        dep: {
          did: '',
          dname: ''
        }
      },
      deps: [],//部门下拉框的预选项
      page: '',//查询的分页结果
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
    //编辑记录
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.updateEmp = row;
    },

    //删除记录
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定后执行的函数，发送请求
        this.$axios.delete("http://localhost:8080/deleteEmpByEid/" + row.eid
          // ,{
          //   params: { //这种传参方法为键值对
          //     eid: row.eid,
          //   }
          // }
        ).then(resp => {
          if (resp.data.code === 200) {
            this.$message.success('删除成功');
            this.getEmp(this.$refs.refPag.internalCurrentPage);//删除后刷新页面
          } else {
            this.$message.error('删除失败');
          }
        })
      }).catch(() => {//点击取消后执行的函数
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    //刷新记录
    getEmp(pageNum) {//这种传参方法为 json 后端将此 json 封装成为一个对象
      this.$axios.post("http://localhost:8080/selectEmp/" + pageNum,
        this.searchEmp
      ).then(resp => {
        if (resp.data.code === 200) {
          this.page = resp.data.data;
        } else {
          this.$message.error('请求错误');
        }
      })
    },
    //更新 emp
    update() {
      this.$axios.put("http://localhost:8080/updateEmp", this.updateEmp
      ).then(resp => {
        if (resp.data.code === 200) {
          this.$message.success('修改成功');
          this.dialogFormVisible = false;
          this.getEmp(this.$refs.refPag.internalCurrentPage);//修改成功后刷新页面
        } else {
          this.$message.error('请求错误');
        }
      })
    },
    updateCancel() {
      this.dialogFormVisible = false
      this.$message('取消修改');
    },
    //分页组件页码改变事件
    handleCurrentChange(pageNum) {
      this.getEmp(pageNum);
    },
    //点击查询事件
    onSubmit() {
      this.getEmp(1)
    },
    //键盘 enter 事件
    enterSearch() {
      this.onSubmit()
    },
    //清除条件查询
    clear() {
      this.searchEmp = {
        eid: '',
        ename: '',
        dep: ''
      }
    },
    //获取所有的部门信息
    getAllDep() {
      this.$axios.get("http://localhost:8080/selectAllDep").then(resp => {
        if (resp.data.code === 200) {
          this.deps = resp.data.data;
        } else if (resp.data.code === 401) {
          this.$router.push("/login");
        } else {
          this.$message.error('请求错误');
        }
      })
    }

  },
  //挂载完成
  mounted() {
    this.getAllDep();
    this.getEmp(1);
  }
}
</script>

<style>
.el-form {
  /* background-color: aqua; */
  line-height: 30px;
  /* padding: 40px; */
}

.el-dialog {
  width: 600px;
}

.el-pagination {
  /* background-color: aqua; */
  line-height: 60px;
  padding: 40px;
}
</style>