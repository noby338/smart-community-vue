
<template>
  <div>
    <el-dialog title="充值" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form  :inline="false" label-width="80px" label-position="left"
        >
        <el-form-item label="金额" prop="name">
          <el-input placeholder="请输入金额" v-model="addMoney">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chargeCancel">取 消</el-button>
        <el-button type="primary" @click="charge()">确 定</el-button>
      </div>
    </el-dialog>

    <el-form ref="searchElec"  label-width="120px" :inline="true" @keyup.enter.native="enterSearch"
      align="left">

      <el-form-item>
        <el-input v-model="cardNumber" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-descriptions class="margin-top" title="物业卡" :column="3"  border>
      <template slot="extra">
        <el-button type="primary" :disabled="!haveRes" @click="handleCharge">充值</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          物业卡编号
        </template>
        {{ card.cardNumber }}
      </el-descriptions-item>
      <el-descriptions-item :content-class-name="color">
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          账户余额
        </template>
        {{ card.lastMoney }}
      </el-descriptions-item>
      <el-descriptions-item :content-class-name="color">
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          使用状态
        </template>
        {{ stateCom }}
      </el-descriptions-item>

    </el-descriptions>
  </div>
</template>


<script>
export default {
  name: "PropertyCard",
  data() {
    return {
      dialogFormVisible: false,
      addMoney: "",
      cardNumber: "01010103",
      card: '',
      color: '',

    }
  },
  computed: {//计算属性
    stateCom: {
      get() {
        if (this.card.state == 1) {
          this.color = 'success';
          return "启用"
        } else if (this.card.state == 2) {
          this.color = 'warning';
          return "欠费"
        } else if (this.card.state == 3) {
          this.color = 'error';
          return "禁用"
        }
      }
    },
    haveRes: {
      get() {
        if (this.card == '') {
          return false;
        } else {
          return true;
        }
      }
    }

  },
  methods: {

    //点击查询事件
    onSubmit() {
      this.$axios.get("http://localhost:8080/propertyCard/selectByCardNumber/" + this.cardNumber
      ).then(resp => {
        if (resp.data.code === 200) {
          this.card = resp.data.data;
        } else {
          this.$message.error('请求错误');
        }
      })
    },
    handleCharge() {
      this.dialogFormVisible = true;
    },
    charge() {
      this.$axios.post("http://localhost:8080/propertyCard/charge/"+this.addMoney,this.card
      ).then(resp => {
        if (resp.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success('充值成功');
          this.onSubmit();
        } else {
          this.$message.error('请求错误');
        }
      })
      this.addMoney = ''
    },
    chargeCancel() {
      this.dialogFormVisible = false;
      this.addMoney = '';
      this.$message('取消充值');
    },

    //键盘 enter 事件
    // enterSearch() {
    //   this.onSubmit()
    // },


  },
  //挂载完成
  mounted() {
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

.warning {
  background: rgb(255, 241, 214);
}

.success {
  background: #f0f9eb;
}

.error {
  background: #ffd2d2;
}
</style>