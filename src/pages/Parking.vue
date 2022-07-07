<template>
  <div>

    <div :title="parkingLot.parkingLotName" font-size="30px">{{ parkingLot.parkingLotName }}信息管理</div>

    <div class="circleCenter">
      <el-progress type="circle" width="150" :percentage="percentage1" :format="format1" color="indigo"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage2" :format="format2" color="blue"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage3" :format="format3" color="orange"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage4" :format="format4" color="green"></el-progress>
    </div>

    <div class="parkingInfo">
      <!-- 条件查询 -->
      <div>
        <el-form ref="parkingInfo" :inline="true" :model="parkingInfo" class="demo-form-inline">
          <!-- <el-form ref="parkingInfo" :model="parkingInfo" label-width="80px"> -->
          <el-form-item label="车位编号">
            <el-input v-model="parkingInfo.parkNo" placeholder="车位号"></el-input>
          </el-form-item>
          <el-form-item label="车位面积">
            <el-input v-model="parkingInfo.parkArea" placeholder="大于或等于"></el-input>
          </el-form-item>
          <el-form-item label="车位状态">
            <el-select v-model="parkingInfo.pTypeId" placeholder="车位状态">
              <el-option label="已售" value="1"></el-option>
              <el-option label="出租" value="2"></el-option>
              <el-option label="闲置" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchParkingInfo">查询</el-button>
            <!-- <el-button type="primary" @click="searchParkingInfoByOwner">用户查询</el-button> -->
          </el-form-item>
        </el-form>
      </div>

      <!-- <div>
        <template>
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="车位信息">
              <div>
                <el-table :data="pageBean.list" style="width: 100%" height="500px">
                  <el-table-column el-table-column prop="parkNo" label="车位编号" width="150">
                  </el-table-column>
                  <el-table-column prop="parkingLot.parkingLotName" label="停车场" width="255">
                  </el-table-column>
                  <el-table-column prop="parkArea" label="车位面积" width="199">
                  </el-table-column>
                  <el-table-column prop="parkingType.ptype" label="车位状态" width="150">
                  </el-table-column>
                  <el-table-column prop="ownersInfo.owName" label="业主" width="150">
                  </el-table-column>
                  <el-table-column label="详情">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-more" size="mini"
                        @click="getMoreInfo(scope.$index, scope.row)">更多
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="pageBean.pageNum" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageBean.pageSize"
                  layout="total, sizes, prev, pager, next, jumper" :total="pageBean.total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租售车位">配置管理</el-tab-pane>
          </el-tabs>
        </template>
      </div> -->
      <div>
        <el-table :data="pageBean.list" style="width: 100%" height="500">
          <el-table-column el-table-column prop="parkNo" label="车位编号" width="224">
          </el-table-column>
          <el-table-column prop="parkingLot.parkingLotName" label="停车场" width="280">
          </el-table-column>
          <el-table-column prop="parkArea" label="车位面积" width="224">
          </el-table-column>
          <el-table-column prop="parkingType.ptype" label="车位状态" width="224">
          </el-table-column>
          <el-table-column prop="ownersInfo.owName" label="业主" width="224">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleCheck(scope.$index, scope.row)">编辑
              </el-button>
              <el-button slot="reference" icon="el-icon-goods" size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)"></el-button>
              <el-button slot="reference" icon="el-icon-goods" size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageBean.pageNum" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageBean.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="pageBean.total">
        </el-pagination>
      </div>
    </div>

    <!-- 初步功能思考：购买和编辑
管理员才能删除 -->

    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="setStudent" :rules="rules" ref="ruleForm">
          <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="setStudent.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" :label-width="formLabelWidth">
            <el-input v-model="setStudent.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生成绩" :label-width="formLabelWidth">
            <el-input v-model="setStudent.score" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="mofifytStudent('ruleForm')">确 定</el-button>
        </div> -->
      </el-dialog>
    </div>

  </div>





</template>

<script>
export default {
  data() {
    return {
      percentage1: 40, //记录当前车库空余车位--动态
      percentage2: 80, //记录当前车库出售车位
      percentage3: 80, //记录当前车库出租车位
      percentage4: 80, //记录当前车库空余车位
      parkingLot: {},   //停车场信息
      tabPosition: 'left',
      title: '',
      dialogFormVisible: false,
      parkingInfo: {
        //存放车位信息
        // parkNo: "",
        // parkArea: "",
        // pTypeId: "",
        // owId: "",
      },
      setParkingInfo: {
        //存放设置的车位信息
      },
      //分页设置
      pageIndex: 1,
      pageSize: 10,
      pageBean: "",
      formLabelWidth: "120px",
      setStudent: {},
      ruleForm: {},
      rules: {
        //验证格式
        name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },

    };
  },
  created() {
    //页面初始化执行
    this.getParkingInfoByPage();
    this.getRealtimeParkingInfo();//车库信息
  },
  methods: {
    format1(percentage1) {
      return percentage1 + "%\n车位使用中";
    },
    format2(percentage2) {
      return percentage2 + "%\n已售出车位";
    },
    format3(percentage3) {
      return percentage3 + "%\n已出租车位";
    },
    format4(percentage4) {
      return percentage4 + "%\n空余车位";
    },
    getParkingInfoByPage() {
      //查询当前停车场的所有车位信息
      this.$axios
        .post(
          "http://localhost:8080/getParkingInfoByPage/" +
          this.pageIndex +
          "/" +
          this.pageSize,
          this.parkingInfo
        )
        .then((resp) => {
          console.log(resp.data.data);
          this.pageBean = resp.data.data;
          console.log(this.pageBean);
        });
    },
    getRealtimeParkingInfo() {        //停车场信息查询
      this.$axios.get("http://localhost:8080/getRealParkingInfo")
        .then((resp) => {
          console.log(resp);
          if (resp.data.code == 200) {
            this.parkingLot = resp.data.data;
            let nullParkNums = (this.parkingLot.parkNums - (this.parkingLot.sellParkNums + this.parkingLot.hireParkNums));
            this.percentage1 = ((this.parkingLot.nowUseNums / this.parkingLot.parkNums) * 100).toFixed(2);
            this.percentage2 = ((this.parkingLot.sellParkNums / this.parkingLot.parkNums) * 100).toFixed(2);
            this.percentage3 = ((this.parkingLot.hireParkNums / this.parkingLot.parkNums) * 100).toFixed(2);
            this.percentage4 = ((nullParkNums / this.parkingLot.parkNums) * 100).toFixed(2);
            //console.log("number1=="+number1+"---this.parkingLot.nowUseNums="+this.parkingLot.nowUseNums);
          } else {
            alert("响应错误，稍后再试" + resp.data.code);
          }
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getParkingInfoByPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getParkingInfoByPage();
    },
    searchParkingInfo() {
      //条件查询
      //alert(this.parkingInfo.pTypeId);
      this.getParkingInfoByPage();
    },
    getMoreInfo(index, row) {
      this.title = "车位详情";
      console.log(row);
      this.dialogFormVisible = true;
    },
    handleCheck(index, row) {
      this.title = "查看"; //查询修改添加公用一个表单，给的提示
      //编辑按钮
      // console.log(index, row);
      // console.log("row====" + this.row);
      this.dialogFormVisible = true;
      // this.setStudent = row;
      //ES6扩展语句，将一个对象的对应相同属性值赋给另一个对象
      this.setStudent = { ...row };
      // console.log("setStudent=" + this.setStudent);
    },
    //   handleDelete(index, row) {
    //     this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     })
    //       .then(() => {
    //         this.$axios
    //           .delete("http://localhost:8080/delStudent/" + row.id)
    //           .then((resp) => {
    //             this.$message({
    //               type: "success",
    //               message: "删除成功!",
    //             });
    //             this.getAllStudents();
    //           });
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type: "info",
    //           message: "已取消删除",
    //         });
    //       });
    //   },
    closeDialog() {
      //模态框关闭时，清空dialog表单数据，验证信息清空
      this.setStudent = {};
      this.$refs["ruleForm"].clearValidate();
    },
  },
};
</script>

<style>
.circleCenter {
  white-space: pre;
}
</style>