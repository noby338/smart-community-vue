<!-- 本实例演示：
面包屑的使用
表单的使用及表单验证
layout语法
 -->
<template>
  <div>
    <!-- 面包屑:显示当前页面的路径，快速返回之前的任意页面。 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/tableExam' }">员工</el-breadcrumb-item>
      <el-breadcrumb-item>员工添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 
      :inline="false" 表示是否行内显示
      label-width="80px" 统一设置表单元素的宽度
      <el-row><el-col> 为layout布局，详见elementui官网
      :rules="rules" 为表单的验证
    -->
    <el-form ref="emp" :model="emp" label-width="80px" :inline="false" class="demo-form-inline" align="" :rules="rules">
      <el-row type="flex" justify="space-around">
        <el-col :span='6'>
          <el-form-item label="姓名" prop="ename">
            <el-input v-model="emp.ename" placeholder="请输入员工姓名" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item label="入职日期" prop="hiredate">
            <el-date-picker type="date" v-model="emp.hiredate" placeholder="请选择入职日期" style="width: 100%;" size="small"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span='6'>
          <el-form-item label="性别">
            <el-switch v-model="emp.gender" active-color="#409eff" inactive-color="#e890a9" active-text="男"
              inactive-text="女" active-value="male" inactive-value="female">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item label="部门">
            <el-select v-model="emp.dep.did" placeholder="请选择部门" size="small" style="width: 100%;">
              <el-option v-for="dep in deps" :label="dep.dname" :value="dep.did"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item>
        <el-button type="primary" @click="insert('emp')">添加</el-button>
        <el-button @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>
<script>
export default {
  name: 'FormExam',
  data() {
    return {
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
      emp: {
        ename: '',
        hiredate: '',
        gender: '',
        dep: {
          did: '',
          dname: ''
        }
      },

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

      }
    }
  },
  methods: {
    insert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {//验证通过将返回 true，否则返回 false
          //发送请求
          this.$message.success("验证通过")
        } else {
          this.$message.error('验证未通过')
        }
      });



    },
    cancel() {
      this.$router.go(-1)//回到上一个页面
    },
  },
  mounted() {
  }
}
</script>