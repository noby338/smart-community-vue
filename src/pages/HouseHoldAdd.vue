<template>
  <el-form>
    <div>
      <el-form ref="insertHouseHold" :model="insertHouseHold" label-width="80px" :inline="true" @keyup.enter.native="enterSearch" align="left">
      <div>
            <el-form-item label="姓 名：">
            <el-input v-model="insertHouseHold.name" placeholder="输入姓名....."></el-input>
            </el-form-item>
            
            <el-form-item label="年龄" prop="age"
              :rules="[
                { required: true, message: '年龄不能为空' },
                { type: 'number', message: '年龄必须为数字值' },
              ]">
              <el-input type="age" v-model.number="insertHouseHold.age" autocomplete="off" ></el-input>
            </el-form-item>
        <el-form-item label="性 别：">
          <div >
            <el-radio-group v-model="insertHouseHold.gender">
              <el-radio-button label="1" >男</el-radio-button>
              <el-radio-button label="0" >女</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
      </div>
      
      <div>
        <el-form-item label="电 话：">
          <el-input v-model="insertHouseHold.telephone" placeholder="输入电话....."></el-input>
        </el-form-item>

        <el-form-item label="房间I D：">
          <el-input v-model="insertHouseHold.h" placeholder="输入房间I D....."></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm()" >提交</el-button>
        <el-button @click="resetForm('insertHouseHold')">重置</el-button>
        <el-button @click="back()">返回</el-button>
      </div>
      </el-form>
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      insertHouseHold:{
        name: '',
        age: '',
        gender: '',
        idOwner: '',
        telephone: '',
        houseId: '',
        state: '',
      }
    };
  },
  methods: {
      submitForm() {
        this.$axios.post("http://localhost:8080/houseHold/insertHouseHold",
            {
              params: { //这种传参方法为键值对
                id : null ,
                name : this.insertHouseHold.name,
                age : this.insertHouseHold.age,
                gender : this.insertHouseHold.gender,
                telephone : this.insertHouseHold.telephone,
                houseId : this.insertHouseHold.houseId,
                idOwner : this.insertHouseHold.idOwner,
                state : this.insertHouseHold.state,
              }
            }
        
        ).then(resp => {
          console.log(resp);
          if (resp.data.code === 200) {
            this.$message.success('添加成功！');
          } else {
            this.$message.error('添加错误！');
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back(){
        this.$router.push({
        path: '/houseHold',
      })
      } 
  },
};
</script>