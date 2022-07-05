
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" :rules="rules">
      <el-breadcrumb-item :to="{ path: '/emp' }">员工</el-breadcrumb-item>
      <el-breadcrumb-item>员工添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="emp" :model="emp" label-width="80px" :inline="false" class="demo-form-inline" align="">
      <el-form-item label="姓名" prop="ename">
        <el-col :span="3">
          <el-input v-model="emp.ename" placeholder="请输入员工姓名" size="small"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="入职日期" prop="hiredate">
        <el-col :span="3">
          <el-date-picker type="date" v-model="emp.hiredate" placeholder="请选择入职日期" style="width: 100%;" size="small"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="部门" prop="dep">
        <el-col :span="3">
          <el-select v-model="emp.dep.did" placeholder="请选择部门" size="small" style="width: 100%;">
            <el-option v-for="dep in deps" :label="dep.dname" :value="dep.did"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="insert('emp')">添加</el-button>
        <el-button @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>
<script>
export default {
  name: 'EmpAdd',
  data() {
    return {
      emp: {
        ename: '',
        hiredate: '',
        dep: {
          did: '',
          dname: ''
        }
      },
      deps: this.$route.query.deps,
      rules: {
        ename: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        hiredate: [
          { required: true, message: '请选择入职时间', trigger: 'change' }
        ],
        dep: {
          did: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        }
        ,

      }
    }
  },
  methods: {
    insert(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("http://localhost:8080/addEmp", this.emp
          ).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success('添加成功');
            } else {
              this.$message.error('请求错误');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });



    },
    cancel() {
      this.$router.go(-1)
    },
  },
  mounted() {
  }
}
</script>