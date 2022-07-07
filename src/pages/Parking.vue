<template>
  <div>
    <div>这是我的车位管理地方</div>
    <div>这是我的车位管理地方</div>
    <div class="circleCenter">
      <el-progress type="circle" width="150" :percentage="percentage1" :format="format1" color="indigo"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage2" :format="format2" color="indigo"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage3" :format="format3" color="orange"></el-progress>
      <el-progress type="circle" width="150" :percentage="percentage4" :format="format4" color="green"></el-progress>
    </div>

    <div class="parkingInfo">
      <div>
        <el-form :inline="true" :model="parkingInfo" class="demo-form-inline">
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
            <el-button type="primary" @click="searchParkingInfoByOwner">用户查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="page.list" style="width: 100%">
          <el-table-column el-table-column prop="eid" label="编号" width="180">
          </el-table-column>
          <el-table-column prop="ename" label="姓名" width="280">
          </el-table-column>
          <el-table-column prop="hiredate" label="入职时间" width="280">
          </el-table-column>
          <el-table-column prop="dep.dname" label="部门" width="280">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button slot="reference" icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageBean.pageIndex" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageBean.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageBean.totalRecord">
        </el-pagination>
      </div>
    </div>

    <!-- 初步功能思考：购买和编辑
管理员才能删除 -->

  </div>

</template>

<script>
export default {
  data() {
    return {
      percentage1: 80, //记录当前车库空余车位--动态
      percentage2: 80, //记录当前车库出售车位
      percentage3: 80, //记录当前车库出租车位
      percentage4: 80, //记录当前车库空余车位

      parkingInfo: {
        //存放车位信息
        parkNo: "",
        parkArea: "",
        pTypeId: "",
        owId: "",
      },
      setParkingInfo: {
        //存放设置的车位信息
      },
      //分页设置
      pageIndex: "",
      pageSize: "",
      pageBean: "",
      // 分页对象(包含数据)
      page: {
        list: [
          {
            eid: 100,
            ename: "one",
            hiredate: "2020-3-4",
            dep: { dname: "sale" },
          },
          {
            eid: 200,
            ename: "tow",
            hiredate: "2020-3-5",
            ep: { dname: "develop" },
          },
          {
            eid: 300,
            ename: "three",
            hiredate: "2020-3-6",
            dep: { dname: "sale" },
          },
        ],
      },
    };
  },
  created() {
    this.getAllStudents();
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
    searchParkingInfo() {
      alert("hhh");
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
          console.log(resp);
        });
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
    handleEdit(index, row) {
      this.title = "修改"; //查询修改添加公用一个表单，给的提示
      //编辑按钮
      // console.log(index, row);
      // console.log("row====" + this.row);
      this.dialogFormVisible = true;
      // this.setStudent = row;
      //ES6扩展语句，将一个对象的对应相同属性值赋给另一个对象
      this.setStudent = { ...row };
      // console.log("setStudent=" + this.setStudent);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("http://localhost:8080/delStudent/" + row.id)
            .then((resp) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getAllStudents();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.circleCenter {
  white-space: pre;
}
</style>