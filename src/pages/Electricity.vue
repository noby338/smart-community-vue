
<template>
  <div>

    <el-form ref="searchElec" :model="searchEmp" label-width="80px" :inline="true" @keyup.enter.native="enterSearch"
      align="left">

      <el-form-item label="房屋">
        <el-cascader v-model="idArray" @change="handleChangeHouse" placeholder="选择所有住户" :options="houseBuildings"
          :props="{ checkStrictly: true }" filterable clearable>
        </el-cascader>
      </el-form-item>

      <el-form-item label="月份">
        <el-date-picker v-model="month" type="month" placeholder="选择所有月份" value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="" @click="clear">清除</el-button>
      </el-form-item>

    </el-form>
    <el-descriptions class="margin-top" title="" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          总计用量(千瓦‧时)：
        </template>
        {{sum}}
      </el-descriptions-item>
    </el-descriptions>
    <el-table :data="page.list" style="width: 100%" :row-class-name="tableRowColor">
      <el-table-column prop="house.houseNum" label="房屋编号" width="180">
      </el-table-column>
      <el-table-column prop="month" label="月份" width="280">
      </el-table-column>
      <el-table-column prop="nowMonthNums" label="当月用量(千瓦‧时)" width="280">
      </el-table-column>
      <el-table-column prop="nowPrices" label="当月电费(元)" width="280">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180">
        <template slot="" slot-scope="scope">
          {{ showState(scope.row.state) }}
        </template>
      </el-table-column>
    </el-table>



    <el-pagination ref="refPag" background layout="prev, pager, next" :page-count="page.pages"
      :page-size="page.pageSize" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>


<script>
export default {
  name: "Electricity",
  data() {
    return {
      sum:'',//用量总计
      idArray: "",
      month: '',
      houseBuildings: [],
      houseInfo: {//通过级联的id查房间id的对象参数
        buildingId: null,
        unitId: null,
        floorId: null,
        houseId: null
      },
      electricityList: [],

      searchEmp: {//查询的条件
        eid: '',
        ename: '',
        dep: {
          did: '',
          dname: ''
        }
      },
      page: '',//查询的分页结果
    }
  },
  computed: {//计算属性
    monthCom: {
      get() {
        if (this.month === null || this.month === '') {
          return "all"
        } else {
          return this.month
        }
      }
    }

  },
  methods: {
    showState(state) {
      if (state == 1) {
        return "启用";
      } else if (state == 2) {
        return "欠费";
      } else if (state == 3) {
        return "禁用";
      }
    },
    tableRowColor({ row, rowIndex }) {
      if (row.state === 1) {
        return 'success-row';
      } else if (row.state === 2) {
        return 'warning-row';
      } else if (row.state === 3) {
        return 'error-row';
      }
      return '';
    },

    //初始化级联选项
    getAllHouseBuildings() {
      this.$axios.get("http://localhost:8080/house/selectAllHouseBuilding").then(resp => {
        if (resp.data.code === 200) {
          this.houseBuildings = resp.data.data;

        } else {
          this.$message.error('请求错误');
        }
      })
    },
    //级联改变事件
    handleChangeHouse() {
      this.houseInfo.buildingId = null;
      this.houseInfo.unitId = null;
      this.houseInfo.floorId = null;
      this.houseInfo.houseId = null;
      let len = this.idArray.length;
      let id = this.idArray[len - 1];
      if (len === 1) {//最后一个是楼栋id
        this.houseInfo.buildingId = id;
      } else if (len === 2) {//最后一个是单元id
        this.houseInfo.unitId = id;
      } else if (len === 3) {//最后一个是楼层id
        this.houseInfo.floorId = id;
      } else if (len === 4) {//最后一个是房间id
        this.houseInfo.houseId = id;
      } else {//查询全部

      }
    },


    //分页组件页码改变事件
    handleCurrentChange(pageNum) {
      this.getPage(pageNum);
    },
    //点击查询事件
    onSubmit() {
      this.getPage(1)
    },
    getPage(pageNum) {
      this.$axios.post("http://localhost:8080/electricity/select/" + this.monthCom + "/" + pageNum, this.houseInfo
      ).then(resp => {
        if (resp.data.code === 200) {
          this.page = resp.data.data;
        } else {
          this.$message.error('请求错误');
        }
      });

      this.$axios.post("http://localhost:8080/electricity/selectSum/" + this.monthCom, this.houseInfo
      ).then(resp => {
        if (resp.data.code === 200) {
          this.sum = resp.data.data;
        } else {
          this.$message.error('请求错误');
        }
      })
    },
    //键盘 enter 事件
    enterSearch() {
      this.onSubmit()
    },
    //清除条件查询
    clear() {
      this.idArray = null,
        this.month = null,
        this.houseInfo = {//通过级联的id查房间id的对象参数
          buildingId: null,
          unitId: null,
          floorId: null,
          houseId: null
        }
    },

  },
  //挂载完成
  mounted() {
    this.getAllHouseBuildings();
    this.getPage(1);
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

.el-table .warning-row {
  background: rgb(255, 241, 214);
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .error-row {
  background: #ffd2d2;
}
</style>