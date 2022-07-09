<template>
  <div>

    <div :title="parkingLot.parkingLotName">
      <h2>{{ parkingLot.parkingLotName }}信息管理</h2>
    </div>
    <div class="parkingInfo">
      <!-- 条件查询 -->
      <div v-if="isShowPageAndSearch">
        <el-form ref="parkingInfo" :inline="true" :model="parkingInfo" class="demo-form-inline">
          <el-form-item label="车位编号">
            <el-input v-model="parkingInfo.parkNo" placeholder="车位号"></el-input>
          </el-form-item>
          <el-form-item label="车位面积">
            <el-input v-model="parkingInfo.parkArea" placeholder="大于或等于"></el-input>
          </el-form-item>
          <el-form-item label="车位状态">
            <el-select v-model="parkingInfo.ptypeId" placeholder="车位状态">
              <el-option label="车位状态" value="null"></el-option>
              <el-option label="已售" value="1"></el-option>
              <el-option label="出租" value="2"></el-option>
              <el-option label="闲置" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchParkingInfo">查询</el-button>
            <el-button type="primary" @click="insertParkingInfo">添加车位</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- tab标签页 -->
      <div>
        <template>
          <el-tabs :tab-position="tabPosition" @tab-click="showPageAndSearch" v-model="activeName">
            <el-tab-pane label="车库信息" name="first">
              <!-- <div class="circleCenter">
                <el-progress type="circle" width="150" :percentage="percentage1" :format="format1" color="indigo">
                </el-progress>
                <el-progress type="circle" style="margin-left:40px" width="150" :percentage="percentage2"
                  :format="format2" color="blue"></el-progress>
                <el-progress type="circle" style="margin-left:40px" width="150" :percentage="percentage3"
                  :format="format3" color="orange"></el-progress>
                <el-progress type="circle" style="margin-left:40px" width="150" :percentage="percentage4"
                  :format="format4" color="green"></el-progress>
              </div> -->
            </el-tab-pane>
            <el-tab-pane label="车位信息" name="second">
              <div>
                <el-table :data="pageBean.list" style="width: 100%" height="500">
                  <el-table-column el-table-column prop="parkNo" label="车位编号" width="180">
                  </el-table-column>
                  <el-table-column prop="parkingLot.parkingLotName" label="停车场" width="280">
                  </el-table-column>
                  <el-table-column prop="parkArea" label="车位面积" width="180">
                  </el-table-column>
                  <el-table-column prop="parkingType.ptype" label="车位状态" width="180">
                  </el-table-column>
                  <el-table-column prop="ownersInfo.owName" label="业主" width="180">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" class="button1"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini" class="button2"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租售车位" name="third">
              <div>
                <el-table :data="pageBean.list" style="width: 100%" height="500">
                  <el-table-column el-table-column prop="parkNo" label="车位编号" width="150">
                  </el-table-column>
                  <el-table-column prop="parkingLot.parkingLotName" label="停车场" width="250">
                  </el-table-column>
                  <el-table-column prop="parkArea" label="车位面积" width="150">
                  </el-table-column>
                  <el-table-column prop="parkingType.ptype" label="车位状态" width="150">
                  </el-table-column>
                  <el-table-column prop="ownersInfo.owName" label="业主" width="150">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button slot="reference" icon="el-icon-goods" size="mini" type="danger" class="button2"
                        v-if="scope.row.ownersInfo == null" @click="handlBuy(scope.$index, scope.row)">购买</el-button>
                      <el-button slot="primary" icon="el-icon-timer" size="mini" type="success" class="button3"
                        v-if="scope.row.ownersInfo == null" @click="handleRent(scope.$index, scope.row)">租用</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <!-- 车位信息展示 -->
      <!-- <div>
        <el-table :data="pageBean.list" style="width: 100%" height="500">
          <el-table-column el-table-column prop="parkNo" label="车位编号" width="180">
          </el-table-column>
          <el-table-column prop="parkingLot.parkingLotName" label="停车场" width="280">
          </el-table-column>
          <el-table-column prop="parkArea" label="车位面积" width="180">
          </el-table-column>
          <el-table-column prop="parkingType.ptype" label="车位状态" width="180">
          </el-table-column>
          <el-table-column prop="ownersInfo.owName" label="业主" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" class="button1"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" class="button2"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button slot="reference" icon="el-icon-goods" size="mini" type="danger" class="button2"
                @click="handlBuy(scope.$index, scope.row)">购买</el-button>
                <el-button slot="primary" icon="el-icon-timer" size="mini" type="success" class="button3"
                @click="handleRent(scope.$index, scope.row)">租用</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div> -->
      <!-- 分页 -->
      <div v-if="isShowPageAndSearch">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageBean.pageNum" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageBean.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="pageBean.total">
        </el-pagination>
      </div>
    </div>

    <!-- 初步功能思考：购买和编辑
管理员才能删除 模态框-->
    <!-- 信息编辑模态框 -->
    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="setParkingInfo" :rules="rules" ref="ruleForm">
          <el-form-item label="车位编号" :label-width="formLabelWidth" prop="parkNo">
            <el-input v-model="setParkingInfo.parkNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位面积" :label-width="formLabelWidth">
            <el-input v-model="setParkingInfo.parkArea" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位状态" :label-width="formLabelWidth">
            <el-select v-model="setParkingInfo.ptypeId" placeholder="车位状态">
              <el-option label="已售" value="1"></el-option>
              <el-option label="出租" value="2"></el-option>
              <el-option label="闲置" value="3"></el-option>
              <el-option label="弃用" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- 编辑车位信息时，判断车位是否有业主 显示和隐藏 -->
          <el-form-item label="业主姓名" :label-width="formLabelWidth"
            v-if="setParkingInfo.ptypeId == 1 || setParkingInfo.ptypeId == 2">
            <el-input v-model="ownersInfo.owName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth"
            v-if="setParkingInfo.ptypeId == 1 || setParkingInfo.ptypeId == 2">
            <el-input v-model="ownersInfo.owPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址房号" :label-width="formLabelWidth"
            v-if="setParkingInfo.ptypeId == 1 || setParkingInfo.ptypeId == 2">
            <el-input v-model="ownersInfo.id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="mofifytParkingInfo('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 车位交易模态框 -->
    <div>
      <el-dialog :title="tradeTitle" :visible.sync="dialogFormVisible1" @close="closeDialog">
        <el-form :model="setParkingInfo" :rules="rules" ref="ruleForm">
          <el-form-item label="车位编号" :label-width="formLabelWidth" prop="parkNo">
            <el-input v-model="setParkingInfo.parkNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位面积" :label-width="formLabelWidth">
            <el-input v-model="setParkingInfo.parkArea" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="交易内容" :label-width="formLabelWidth">
            <el-select v-model="setParkingInfo.ptypeId" placeholder="购买方式">
              <el-option label="购买" value="1"></el-option>
              <el-option label="租用" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <template v-if="tradeTitle == '车位购买'" :label-width="formLabelWidth" label="车位产权">
            <el-radio v-model="expireTime" label="20">无产权车位20年</el-radio>
            <el-radio v-model="expireTime" label="70">有产权车位70年</el-radio>
          </template>
          <el-form-item label="车位价格" :label-width="formLabelWidth">
            <el-input v-model="parkingPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租期" :label-width="formLabelWidth" v-if="tradeTitle == '车位租赁'">最长三年36个月
            <el-input-number v-model="rentMonth" controls-position="right" @change="handleChangeRentMonth" :min="1"
              :max="36">
            </el-input-number>
          </el-form-item>
          <!-- 编辑车位信息时，判断车位是否有业主 显示和隐藏 -->
          <el-form-item label="业主姓名" :label-width="formLabelWidth">
            <el-input v-model="ownersInfo.owName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="ownersInfo.owPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址房号" :label-width="formLabelWidth">
            <el-input v-model="ownersInfo.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-select v-model="payType" placeholder="支付方式">
              <el-option label="银联" value="银联"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="现金" value="现金"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button v-if="setParkingInfo.ptypeId != null" type="primary" @click="mofifytParkingInfoTrade('ruleForm')">
            确定
          </el-button>
        </div>
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
      title: '',        //编辑模态框标题
      tradeTitle: '',    //交易模态框标题
      dialogFormVisible: false, //是否显示模态框
      dialogFormVisible1: false, //购买页面的模态框
      //fullscreen: true,   //模态框是否为全屏 Dialog
      isShowPageAndSearch: false,
      name: '',
      activeName: "first",  //设置el-tab-pane默认位置 
      parkingPrice: '',   //车位购买价格
      rentMonth: 1,
      payType: '',       //支付方式
      expireTime: '',
      //用户信息
      ownersInfo: {
        owName: ""
      },
      setOwnersInfo: {},
      parkingInfo: {
        //存放车位信息
        ptypeId: "",
        // owId: "",

      },
      setParkingInfo: {
        //存放设置的车位信息
        parkLotId: "",
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
        parkNo: [
          // { required: true, message: "请输入车位编号", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 2 到 5 个字符", trigger: "blur" },
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
    //圆形进度条显示
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
    //查询当前停车场的所有车位信息
    getParkingInfoByPage() {
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
    //停车场信息查询arkingPrice
    getRealtimeParkingInfo() {
      this.$axios.get("http://localhost:8080/getRealParkingInfo")
        .then((resp) => {
          console.log("停车场信息" + resp.data);
          console.log(resp.data);
          if (resp.data.code == 200) {
            this.parkingLot = resp.data.data;
            //this.setParkingInfo.parkLotId=this.parkingLot.id; //给编辑车位信息的车库外键赋值
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
    // 分页查询方法
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
    //条件查询 ptypeId的写法才能穿过去
    searchParkingInfo() {
      //alert(this.parkingInfo.pTypeId);
      console.log(this.parkingInfo);
      this.getParkingInfoByPage();
    },
    //添加车位
    insertParkingInfo() {
      this.setParkingInfo.parkLotId = this.parkingLot.id;  //车位所属停车场id
      //alert(this.setParkingInfo.parkLotId);
      this.dialogFormVisible = true;
      this.title = "添加";
    },
    //编辑车位信息
    handleEdit(index, row) {
      this.title = "信息编辑";
      this.setParkingInfo = { ...row };
      //判断ownersInfo是否为null
      if (this.setParkingInfo.ownersInfo == null) {
        this.ownersInfo.owName = "无";
        this.ownersInfo.owPhone = "无";
        this.ownersInfo.id = 0;
      } else {
        this.ownersInfo = this.setParkingInfo.ownersInfo;
      }
      console.log("handleEdit=row=" + this.setParkingInfo.parkId);
      this.dialogFormVisible = true;
    },
    //删除车位
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //alert("row.parkid="+row.parkId);
          this.$axios
            .delete("http://localhost:8080/deleteParkingInfoByParkId/" + row.parkId)
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
    //车位交易价格计算  a和b表示要计算的两个参数
    calculateParkingPrice(a, b) {
      this.parkingPrice = a * b;
    },
    handlBuy(index, row) {
      this.tradeTitle = "车位购买";
      this.setParkingInfo = { ...row };
      console.log(row);
      this.setParkingInfo.ptypeId = 1;    //状体1表示购买
      this.calculateParkingPrice(this.setParkingInfo.parkArea, 8000);//8000每平米
      this.dialogFormVisible1 = true;
      //this.fullscreen = true;  //模态框全屏
    },
    handleRent(index, row) {
      this.tradeTitle = "车位租赁";
      this.setParkingInfo = { ...row };
      this.setParkingInfo.ptypeId = 2;
      this.calculateParkingPrice(this.rentMonth, 300);//300每月

      this.dialogFormVisible1 = true;
    },

    //模态框中方法
    mofifytParkingInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setParkingInfo.ownersInfo = this.ownersInfo;
          console.log(this.setParkingInfo);
          if (this.title == "信息编辑") {
            //编辑中的确定提交
            this.dialogFormVisible = false;
            console.log("信息编辑" + this.setParkingInfo);
            //没有传到后端，格式可能有问题
            this.$axios
              .put("http://localhost:8080/changeParkingInfo", this.setParkingInfo)
              .then((resp) => {
                this.$message("修改成功");
                this.getParkingInfoByPage;
                //this.dialogFormVisible = true;
              });
          } else {
            //执行添加请求
            this.$axios
              .post("http://localhost:8080/addParkingInfo", this.setParkingInfo)
              .then((resp) => {
                console.log("添加车位信息=" + this.setParkingInfo);
                this.$message("添加成功");
                this.getParkingInfoByPage;
              });
          }
        } else {
          this.$message("操作失败");
          return false;
        }
      });
    },
    mofifytParkingInfoTrade(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("车位交易");
          this.setParkingInfo.ownersInfo = this.ownersInfo;
          console.log(this.setParkingInfo);
          if (this.tradeTitle == "车位购买") {
            //编辑中的确定提交
            this.dialogFormVisible = false;
            console.log("信息编辑" + this.setParkingInfo);
            //没有传到后端，格式可能有问题
            this.$axios
              .post("http://localhost:8080/buyParking/" + this.payType, this.setParkingInfo, this.parkingPrice, this.expireTime)
              .then((resp) => {
                this.$message("修改成功");
                this.getParkingInfoByPage;
              });
          } else {
            //执行添加请求
            this.$axios
              .post("http://localhost:8080/addParkingInfo/" + payType, this.setParkingInfo, this.parkingRentPrice, this.expireTime)
              .then((resp) => {
                console.log("添加车位信息=" + this.setParkingInfo);
                this.$message("添加成功");
                this.getParkingInfoByPage;
              });
          }
        } else {
          this.$message("操作失败");
          return false;
        }
      });
    },
    closeDialog() {
      //模态框关闭时，清空dialog表单数据，验证信息清空
      this.setParkingInfo = {};
      this.$refs["ruleForm"].clearValidate();
    },
    showPageAndSearch(tab, event) {
      // console.log(tab, event);
      // alert(tab.index);
      if (tab.index == 0) {
        this.isShowPageAndSearch = false;
      } else {
        this.isShowPageAndSearch = true;
      }
    },
    handleChangeRentMonth(value) {
      this.calculateParkingPrice(this.rentMonth, 300)
      this.expireTime = this.rentMonth;
      console.log("租用时间");
      console.log(this.expireTime);
    },
  }
};
</script>

<style>
.circleCenter {
  white-space: pre;
}

.popper-class {
  display: none;
}

.popperclass {
  display: none;
}

/* 按钮颜色 */
.button1 {
  background: #448ba7;
  border-color: #6fc8eb;
  color: #fff;
}

.button2 {
  background: #F4606C;
  /* border-color: #20B2AA; */
  color: #fff;
}

.button3 {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}
</style>