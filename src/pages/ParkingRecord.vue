<template>
  <div>
    <!-- 查询添加 -->
    <el-form :inline="true" :model="queryParkingRecord" class="demo-form-inline">
      <el-form-item label="车牌号">
        <el-select filterable v-model="queryParkingRecord.carInfo.id" placeholder="请选择">
          <el-option v-for="item in optionsQuery" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryParkingRecords">查询</el-button>
        <el-button type="primary" @click="addCarInParkingRecord">添加车辆进入记录</el-button>
      </el-form-item>
    </el-form>
    <!-- 车辆信息展示表格 -->
    <div>
      <el-table :data="page.list" style="width: 100%">
        <el-table-column prop="recordNumber" label="记录编号" width="100"> </el-table-column>
        <el-table-column prop="carInfo.carNumber" label="车牌号" width="100"></el-table-column>
        <el-table-column prop="ownersInfo.name" label="车主名" width="100"></el-table-column>
        <el-table-column prop="ownersInfo.telephone" label="车主电话" width="150"></el-table-column>
        <el-table-column prop="inTime" label="进入时间" width="100"></el-table-column>
        <el-table-column prop="outTime" label="离开时间" width="100"></el-table-column>
        <el-table-column prop="cost" label="费用" width="100"></el-table-column>
        <el-table-column prop="payType" label="支付方式" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditOut(scope.row)">车辆出去</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.pageNum" :page-sizes="[2, 5, 10]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">>
      </el-pagination>
    </div>

    <!-- 车辆进入--添加记录 -->
    <div>
      <el-dialog title="车辆进入" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="editParkingRecord" label-width="80px">
          <el-form-item label="车牌号">
            <el-select filterable v-model="editParkingRecord.carInfo.id" placeholder="请选择">
              <el-option v-for="item in optionsAdd" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCarInRecordCancel">取 消</el-button>
          <el-button type="primary" @click="addCarInRecordOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //初始显示
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      //查询条件
      queryParkingRecord: {
        recordNumber: null,
        carInfo: {},
        ownersInfo: {}
      },
      //查询框
      optionsQuery: [{
        value: null,
        label: null
      }],
      //添加记录车牌选择框
      optionsAdd: [{
        value: null,
        label: null
      }],
      dialogFormVisibleAdd: false,
      editParkingRecord: {
        id: 0,
        carInfo: {
          id: 0,
        }
      }
    }
  },
  created() {
    this.getRarkingRecordsToPage();
    //this.getCarsInCarInfo();
  },
  methods: {
    getRarkingRecordsToPage() {
      this.$axios.post("http://localhost:8080/getParkingRecordsToPage/" + this.page.pageNum + "/" + this.page.pageSize, this.queryParkingRecord).then(resp => {
        if (resp.data.code == 200) {
          this.page = resp.data.data;
          this.getCarsInParkingRecord();
        }
      });
    },
    getCarsInParkingRecord() {
      this.$axios.post("http://localhost:8080/getCarsInParkingRecord").then(resp => {
        if (resp.data.code == 200) {
          this.optionsQuery = resp.data.data;
        }
      });
    },
    getCarsInCarInfo() {
      this.$axios.post("http://localhost:8080/getCarsInCarInfo").then(resp => {
        if (resp.data.code == 200) {
          this.optionsAdd = resp.data.data;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getRarkingRecordsToPage();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getRarkingRecordsToPage();
    },
    queryParkingRecords() {
      this.getRarkingRecordsToPage();
    },
    //添加车辆进入记录开始
    addCarInParkingRecord() {
      this.getCarsInCarInfo();
      this.dialogFormVisibleAdd = true;
    },
    addCarInRecordCancel() {
      this.dialogFormVisibleAdd = false;
      this.clearEditParkingRecord();
      this.optionsAdd = [];
    },
    addCarInRecordOk() {
      this.$confirm('确认添加, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("http://localhost:8080/addCarInRecord/" + this.editParkingRecord.carInfo.id).then(resp => {
          if (resp.data.code == 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.getRarkingRecordsToPage();
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: 'warning',
              message: resp.data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });
      });
    },
    //车辆出去开始
    handleEditOut(row){
        this.$confirm('确认让车辆'+row.carInfo.carNumber+'出去, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("http://localhost:8080/changeCarOutRecord/" + row.id).then(resp => {
          if (resp.data.code == 200) {
            this.$message({
              type: 'success',
              message: '车辆出去成功!'
            });
            this.getRarkingRecordsToPage();
          } else {
            this.$message({
              type: 'warning',
              message: resp.data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消车辆出去'
        });
      });
    },
    //清空数据
    clearEditParkingRecord() {
      this.editParkingRecord = {
        id: 0,
        carInfo: {
          id: 0,
        }
      };
    }
  }
}
</script>

<style>
</style>