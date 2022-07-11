<template>
  <div>
    <div :title="parkingLot.name">
      <h2>{{ parkingLot.name }}信息管理</h2>
    </div>
    <div class="parkingInfo">
      <!-- 条件查询 v-if="isShowPageAndSearch" -->
      <div v-if="isShowPageAndSearch">
        <el-form ref="parkingInfo" :inline="true" :model="parkingInfo" class="demo-form-inline">
          <el-form-item label="车位编号">
            <el-input v-model="parkingInfo.parkNumber" placeholder="车位号"></el-input>
          </el-form-item>
          <el-form-item label="车位面积">
            <el-input v-model="parkingInfo.parkArea" placeholder="大于或等于"></el-input>
          </el-form-item>
          <el-form-item label="车位状态">
            <el-select v-model="parkingInfo.parkingType.id" placeholder="车位状态">
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
      <!-- 订单条件查询 v-if="isShowOrderPageSearch" -->
      <div v-if="isShowOrderPageSearch" >
        <!-- <el-form ref="parkingOrderList" :inline="true" :model="parkingOrderList" class="demo-form-inline">
          <el-form-item label="车位编号">
            <el-input v-model="parkingOrderList.parkingInfo.parkNumber" placeholder="车位号"></el-input>
          </el-form-item>
          <el-form-item label="车位面积">
            <el-input v-model="parkingOrderList.parkingInfo.parkArea" placeholder="大于或等于"></el-input>
          </el-form-item> -->
          <el-form-item label="车位状态">
            <el-select v-model="parkingOrderList.parkingType.id" placeholder="车位状态">
              <el-option label="车位状态" value="null"></el-option>
              <el-option label="已售" value="1"></el-option>
              <el-option label="出租" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="模板交易时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="parkingOrderList.orderTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item> -->
          <el-form-item label="交易时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="parkingOrderList.orderTime" value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="到期时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="parkingOrderList.orderEndTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchParkingOrderList">查询</el-button>
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
                  <el-table-column el-table-column prop="parkNumber" label="车位编号" width="100">
                  </el-table-column>
                  <el-table-column prop="parkingLot.name" label="停车场" width="200">
                  </el-table-column>
                  <el-table-column prop="parkArea" label="车位面积" width="100">
                  </el-table-column>
                  <el-table-column prop="parkingType.name" label="车位状态" width="180">
                  </el-table-column>
                  <el-table-column prop="ownersInfo.name" label="业主" width="180">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" class="button1" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini" class="button2" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租售车位" name="third">
              <div>
                <el-table :data="pageBean.list" style="width: 100%" height="500">
                  <el-table-column el-table-column prop="parkNumber" label="车位编号" width="100">
                  </el-table-column>
                  <el-table-column prop="parkingLot.name" label="停车场" width="200">
                  </el-table-column>
                  <el-table-column prop="parkArea" label="车位面积" width="100">
                  </el-table-column>
                  <el-table-column prop="parkingType.name" label="车位状态" width="150">
                  </el-table-column>
                  <el-table-column prop="ownersInfo.name" label="业主" width="150">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button slot="reference" icon="el-icon-goods" size="mini" type="danger" class="button2" v-if="scope.row.ownersInfo == null" @click="handlBuy(scope.$index, scope.row)">购买</el-button>
                      <el-button slot="primary" icon="el-icon-timer" size="mini" type="success" class="button3" v-if="scope.row.ownersInfo == null" @click="handleRent(scope.$index, scope.row)">租用</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="交易记录" name="fourth">
              <div>
                <el-table :data="pageBean.list" style="width: 100%" height="500">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="订单编号">
                          <span>{{ props.row.orderNo }}</span>
                        </el-form-item>
                        <el-form-item label="业主姓名">
                          <span>{{ props.row.ownersInfo.name }}</span>
                        </el-form-item>
                        <el-form-item label="支付方式">
                          <span>{{ props.row.payType }}</span>
                        </el-form-item>
                        <el-form-item label="业主电话">
                          <span>{{ props.row.ownersInfo.telephone }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                          <span>{{ props.row.ordeRemark }}</span>
                        </el-form-item>
                        <el-form-item label="业主住址">
                          <span>{{ props.row.ownersInfo.house }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column prop="parkingInfo.parkNumber" label="停车场编号" width="150">
                  </el-table-column>
                  <el-table-column prop="parkingInfo.parkArea" label="车位面积" width="100">
                  </el-table-column>
                  <el-table-column prop="parkingType.name" label="订单类型" width="150">
                  </el-table-column>
                  <el-table-column prop="orderTime" label="交易时间" width="200">
                  </el-table-column>
                  <el-table-column prop="orderEndTime" label="有效期" width="200">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button slot="reference" icon="el-icon-edit" size="mini" type="primary" class="button1" v-if="scope.row.orderState == 1" @click="handlEditOrder(scope.$index, scope.row)">编辑</el-button>
                      <el-button slot="primary" icon="el-icon-delete" size="mini" type="danger" class="button2" @click="handleRemovOrder(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <!-- 分页 -->
      <div v-if="isShowPageSearch">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageBean.pageNum" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageBean.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageBean.total">
        </el-pagination>
      </div>
    </div>

    <!-- 初步功能思考：购买和编辑
管理员才能删除 模态框-->
    <!-- 信息编辑模态框 -->
    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="setParkingInfo" :rules="rules" ref="ruleForm">
          <el-form-item label="车位编号" :label-width="formLabelWidth" prop="parkNumber">
            <el-input v-model="setParkingInfo.parkNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位面积" :label-width="formLabelWidth">
            <el-input v-model="setParkingInfo.parkArea" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位状态" :label-width="formLabelWidth">
            <el-select v-model="setParkingInfo.parkingType.id" placeholder="车位状态">
              <el-option label="已售" value="1"></el-option>
              <el-option label="出租" value="2"></el-option>
              <el-option label="闲置" value="3"></el-option>
              <el-option label="弃用" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- 编辑车位信息时，判断车位是否有业主 显示和隐藏 -->
          <el-form-item label="业主姓名" :label-width="formLabelWidth" v-if="setParkingInfo.parkingType.id == 1 || setParkingInfo.parkingType.id == 2">
            <el-input v-model="ownersInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" v-if="setParkingInfo.parkingType.id == 1 || setParkingInfo.parkingType.id == 2">
            <el-input v-model="ownersInfo.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址房号" :label-width="formLabelWidth" v-if="setParkingInfo.parkingType.id == 1 || setParkingInfo.parkingType.id == 2">
            <el-input v-model="ownersInfo.house.id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CloseDialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="mofifytParkingInfo('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 车位交易模态框 -->
    <div>
      <el-dialog :title="tradeTitle" :visible.sync="dialogFormVisible1" @close="closeDialog1">
        <el-form :model="setParkingInfo" :rules="rules1" ref="ruleForm1">
          <el-form-item label="车位编号" :label-width="formLabelWidth" prop="parkNo">
            <el-input v-model="setParkingInfo.parkNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位面积" :label-width="formLabelWidth">
            <el-input v-model="setParkingInfo.parkArea" autocomplete="off"></el-input>
          </el-form-item>
          <template v-if="tradeTitle == '车位购买'" :label-width="formLabelWidth" label="车位产权">
            <el-radio v-model="expireTime" label="20">无产权车位20年</el-radio>
            <el-radio v-model="expireTime" label="70">有产权车位70年</el-radio>
          </template>
          <!--车位价格 和 租赁费用功能相同 prop验证要求不同 后端统一接收paringPrice-->
          <el-form-item label="车位价格" :label-width="formLabelWidth" prop="sellPrice" v-if="tradeTitle == '车位购买'">
            <el-input v-model="parkingPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租赁费用" :label-width="formLabelWidth" prop="rentPrice" v-if="tradeTitle == '车位租赁'">
            <el-input v-model="parkingPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租期" :label-width="formLabelWidth" prop="rentMonth" v-if="tradeTitle == '车位租赁'">最长三年36个月
            <el-input-number v-model="rentMonth" controls-position="right" @change="handleChangeRentMonth" :min="0" :max="36">
            </el-input-number>
          </el-form-item>
          <!-- 编辑车位信息时，判断车位是否有业主 显示和隐藏 -->
          <el-form-item label="业主姓名" :label-width="formLabelWidth" prop="owName">
            <el-input v-model="ownersInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="owPhone">
            <el-input v-model="ownersInfo.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址房号" :label-width="formLabelWidth">
            <el-input v-model="ownersInfo.house.id" autocomplete="off"></el-input>
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
          <el-button @click="CloseDialogFormVisible1">取 消</el-button>
          <el-button type="primary" @click="mofifytParkingInfoTrade('ruleForm1')">
            确定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 订单编辑模态框 -->
    <div>
      <el-dialog :title="orderTitle" :visible.sync="dialogFormVisible2" @close="closeDialog2">
        <el-form :model="parkingOrderList" :rules="rules" ref="ruleForm">
          <el-form-item label="业主姓名" :label-width="formLabelWidth" prop="owName">
            <el-input v-model="parkingOrderList.ownersInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="owPhone">
            <el-input v-model="parkingOrderList.ownersInfo.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="住址房号" :label-width="formLabelWidth">
            <el-input v-model="parkingOrderList.ownersInfo.house.id" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="订单备注" :label-width="formLabelWidth">
            <el-input v-model="parkingOrderList.ordeRemark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CloseDialogFormVisible2">取 消</el-button>
          <el-button type="primary" @click="mofifytParkingOrder('ruleForm')">
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
      //停车场信息
      percentage1: 40, //记录当前车库空余车位--动态
      percentage2: 80, //记录当前车库出售车位
      percentage3: 80, //记录当前车库出租车位
      percentage4: 80, //记录当前车库空余车位
      parkingLot: {}, //停车场信息
      tabPosition: "left",

      title: "", //编辑模态框标题
      tradeTitle: "", //交易模态框标题
      orderTitle: "", //订单模态框标题
      dialogFormVisible: false, //是否显示模态框(添加和编辑)
      dialogFormVisible1: false, //购买页面的模态框(购买和租赁)
      dialogFormVisible2: false, // 订单编辑模态框
      //fullscreen: true,   //模态框是否为全屏 Dialog
      isShowPageAndSearch: false, //是否显示查询栏
      isShowPageSearch: false, //是否显示分页栏
      isShowOrderPageSearch: false, //是否显示订单查询
      name: "",
      activeName: "first", //设置el-tab-pane默认位置
      parkingPrice: "", //车位购买价格
      rentMonth: 1,
      payType: "", //支付方式
      expireTime: "", //交易时长  租期或者是产权有效期
      parkingBusiness: {
        //统一响应对象，给后端车位信息，车主信息等进行交易
        parkingInfo: {},
      },
      //车位交易订单信息
      parkingOrderList: {
        parkingInfo:{
          parkNumber:"",
        },
        ownersInfo: {
          house: {},
        },
        parkingType:{}
      },
      //用户信息
      ownersInfo: {
        id: null,
        name: "",
        house: {
          id: null,
        },
      },
      //setOwnersInfo: {},
      parkingInfo: {
        //存放车位信息
        parkingType: {
          id: null,
        },
        // owId: "",
      },
      setParkingInfo: {
        //存放设置的车位信息
        parkingLot: {
          id: "",
        },
        parkingType: {
          id: "",
        },
        ownersInfo: {
          id: "",
          telephone:"",
        },
      },
      //分页设置
      pageIndex: 1,
      pageSize: 10,
      pageBean: "",
      formLabelWidth: "120px",
      setStudent: {},
      ruleForm: {
        parkNo: "",
        rentPrice: "",
        sellPrice: "",
        rentMonth: "",
        owName: "",
        owPhone: "",
      },
      ruleForm1: {}, //交易
      rules1: {},
      rules: {
        //验证格式
        parkNo: [
          { required: true, message: "请输入车位编号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // rentPrice: [ //租金验证
        //   { required: true, message: "请检查价格是否正确（人名币/元）", trigger: "blur" },
        //   //{ type: 'number', min: 300, pattern:/^2\d*$/, trigger: "blur" } //验证租用金额必须大于300
        //   {min:2,max:6,message:"请输入合适的价格",trigger:"blur"}
        // ],
        // sellPrice: [ //售价验证
        //   { required: true, message: "请检查价格是否正确（人名币/元）", trigger: "blur" },
        //   { type: "number", pattern: /^[1-9]\d\d\d\d*$/, trigger: "blur" } //验证租用金额必须大于10万
        // ],
        // rentMonth: [
        //   { required: true, message: "请选择租期", trigger: "change" },
        //   { type: "number", pattern: /^[1-9]\d$/, trigger: "change" }, //验证是否是正整数--不包含0
        // ],
        // owName: [
        //   { required: true, message: "用户名不能为空", trigger: "blur" },
        //   { type:'string', min: 2, max: 10, message: "长度在 2 到 10 个字符",trigger: "blur"}, //验证是否是正整数--不包含0
        //    //{ type: 'string',required: true,message: "名称必填", trigger: 'blur'}, {max: 30,message: "名称长度不能超过30位" }
        // ],
        // owPhone: [
        //   { required: true, message: "请输入正确的手机号码", trigger: "blur" },
        //   {pattern: /^1[0-9]\d$/, trigger: "blur" }, ///^1[3|4|5|6|7|8|9][0-9]\d{8}$/  标准
        // ],
      },
    };
  },
  created() {
    //页面初始化执行
    this.getParkingInfoByPage();
    this.getRealtimeParkingInfo(); //车库信息
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
          console.log("车位信息");
          console.log(resp.data.data);
          this.pageBean = resp.data.data;
          console.log(this.pageBean);
        });
    },
    //停车场信息查询arkingPrice
    getRealtimeParkingInfo() {
      this.$axios
        .get("http://localhost:8080/getRealParkingInfo")
        .then((resp) => {
          console.log("停车场信息" + resp.data);
          console.log(resp.data);
          if (resp.data.code == 200) {
            this.parkingLot = resp.data.data;
            //this.setParkingInfo.parkLotId=this.parkingLot.id; //给编辑车位信息的车库外键赋值
            let nullParkNums =
              this.parkingLot.parkNums -
              (this.parkingLot.sellParkNums + this.parkingLot.hireParkNums);
            this.percentage1 = (
              (this.parkingLot.nowUseNums / this.parkingLot.parkNums) *
              100
            ).toFixed(2);
            this.percentage2 = (
              (this.parkingLot.sellParkNums / this.parkingLot.parkNums) *
              100
            ).toFixed(2);
            this.percentage3 = (
              (this.parkingLot.hireParkNums / this.parkingLot.parkNums) *
              100
            ).toFixed(2);
            this.percentage4 = (
              (nullParkNums / this.parkingLot.parkNums) *
              100
            ).toFixed(2);
            //console.log("number1=="+number1+"---this.parkingLot.nowUseNums="+this.parkingLot.nowUseNums);
          } else {
            alert("响应错误，稍后再试" + resp.data.code);
          }
        });
    },
    //分页查询订单信息查询
    getParkingOrderList() {
      this.$axios
        .post(
          "http://localhost:8080/getParkingOrderListByPage/" +
            this.pageIndex +
            "/" +
            this.pageSize,
          this.parkingOrderList
        )
        .then((resp) => {
          console.log("车位订单信息");
          console.log(resp);
          this.pageBean = resp.data.data;
        });
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
    //订单条件查询
    searchParkingOrderList(){
      console.log("订单条件查询")
      console.log(this.parkingOrderList);
      this.getParkingOrderList();
    },
    //添加车位
    insertParkingInfo() {
      this.setParkingInfo.parkingLot.id = this.parkingLot.id; //车位所属停车场id
      //alert(this.setParkingInfo.parkLotId);
      this.dialogFormVisible = true;
      this.title = "添加";
    },
    //编辑车位信息
    handleEdit(index, row) {
      //alert("进入了");
      this.title = "信息编辑";
      this.setParkingInfo = { ...row };
      if (this.setParkingInfo.ownersInfo != null) {
        this.ownersInfo = this.setParkingInfo.ownersInfo;
      }
      alert(this.setParkingInfo.parkingType.id);
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
            .delete("http://localhost:8080/deleteParkingInfoByParkId/" + row.id)
            .then((resp) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getParkingInfoByPage();
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
      this.setParkingInfo.parkingType.id = 1; //状体1表示购买
      this.calculateParkingPrice(this.setParkingInfo.parkArea, 8000); //8000每平米
      this.dialogFormVisible1 = true;
      //this.fullscreen = true;  //模态框全屏
    },
    handleRent(index, row) {
      this.tradeTitle = "车位租赁";
      this.setParkingInfo = { ...row };
      this.setParkingInfo.parkingType.id = 2;
      this.calculateParkingPrice(this.rentMonth, 300); //300每月
      this.dialogFormVisible1 = true;
    },
    //订单编辑
    handlEditOrder(index, row) {
      this.orderTitle = "订单编辑";
      this.parkingOrderList = { ...row };
      console.log(row);
      // //this.ownersInfo=this.parkingOrderList.ownersInfo;
      // console.log("订单编辑"+this.parkingOrderList);
      this.dialogFormVisible2 = true;
    },
    //订单删除
    handleRemovOrder(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("http://localhost:8080/deleteParkingOrder/" + row.id)
            .then((resp) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getParkingOrderList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //模态框中方法
    //添加车位信息输入后确认执行
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
              .put(
                "http://localhost:8080/changeParkingInfo",
                this.setParkingInfo
              )
              .then((resp) => {
                this.$message("修改成功");
                this.getParkingInfoByPage();
                this.dialogFormVisible = false;
              });
          } else {
            //执行添加请求
            this.$axios
              .post("http://localhost:8080/addParkingInfo", this.setParkingInfo)
              .then((resp) => {
                console.log("添加车位信息=" + this.setParkingInfo);
                this.$message("添加成功");
                this.getParkingInfoByPage();
                this.dialogFormVisible = false;
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
            console.log("信息编辑" + this.setParkingInfo);
            //统一一个请求对象
            this.parkingBusiness.parkingInfo = this.setParkingInfo;
            this.parkingBusiness.payType = this.payType;
            this.parkingBusiness.parkingPrice = this.parkingPrice;
            this.parkingBusiness.expireTime = this.expireTime;
            console.log("统一请求对象");
            console.log(this.parkingBusiness);
            //没有传到后端，格式可能有问题
            this.$axios
              .post("http://localhost:8080/buyParking", this.parkingBusiness)
              .then((resp) => {
                this.$message("修改成功");
                this.getParkingInfoByPage;
                this.dialogFormVisible = false;
              });
          } else {
            //执行添加请求
            this.$axios
              .post("http://localhost:8080/buyParking/", this.parkingBusiness)
              .then((resp) => {
                console.log("添加车位信息=" + this.setParkingInfo);
                this.$message("添加成功");
                this.getParkingInfoByPage();
                this.dialogFormVisible1 = false;
              });
          }
        } else {
          this.$message("操作失败");
          return false;
        }
      });
    },
    mofifytParkingOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改订单信息
          console.log(this.parkingOrderList);
          this.$axios
            .put("http://localhost:8080/setParkingOrder", this.parkingOrderList)
            .then((resp) => {
              this.$message("修改成功");
              this.dialogFormVisible2 = false;
              this.closeDialog2();
            });
        } else {
          this.$message("操作失败");
          return false;
        }
      });
    },
    //编辑模态框的---X按钮点击事件
    closeDialog() {
      //模态框关闭时，清空dialog表单数据，验证信息清空
      this.setParkingInfo = {
        parkingLot: {
          id: "",
        },
        parkingType: {
          id: "",
        },
        ownersInfo: {
          id: "",
        },
      };
      this.ownersInfo = {
        house: {},
      };
      this.$refs["ruleForm"].clearValidate();
      this.dialogFormVisible = false;
    },
    //编辑模态框的---取消按钮点击事件
    CloseDialogFormVisible() {
      // this.dialogFormVisible = false;
      this.closeDialog();
    },
    //交易模态框的---X按钮
    closeDialog1() {
      //模态框关闭时，清空dialog表单数据，验证信息清空
      this.setParkingInfo = {
        parkingLot: {
          id: "",
        },
        parkingType: {
          id: "",
          name: "",
        },
        ownersInfo: {
          id: "",
        },
      };
      this.ownersInfo = {
        house: {},
      };
      this.$refs["ruleForm1"].clearValidate();
      this.dialogFormVisible1 = false;
    },
    //交易模态框的---取消按钮点击事件
    CloseDialogFormVisible1() {
      //this.dialogFormVisible1 = false;
      this.closeDialog1();
    },
    //订单模态框--X按钮
    closeDialog2() {
      this.parkingOrderList = {
        ownersInfo: {},
        parkingInfo: {},
        parkingType: {},
      };
      this.$refs["ruleForm"].clearValidate();
      //更改后直接分页查询会将订单信息带到 后端
      this.getParkingOrderList();
      this.dialogFormVisible2 = false;
    },
    //订单模态框--取消按钮
    CloseDialogFormVisible2() {
      this.closeDialog2();
    },
    //表格导航栏侧边点击事件
    showPageAndSearch(tab, event) {
      // console.log(tab, event);
      // alert(tab.index);
      if (tab.index == 0) {
        this.isShowPageAndSearch = false;
        this.isShowPageSearch = false;
      } else {
        this.isShowPageAndSearch = true;
        this.isShowPageSearch = false;
      }
      if (tab.index == 3) {
        this.isShowPageAndSearch = false;
        this.isShowOrderPageSearch = true;
        this.getParkingOrderList();
      } else {
        this.isShowOrderPageSearch = false;
      }
    },
    handleChangeRentMonth(value) {
      this.calculateParkingPrice(this.rentMonth, 300);
      this.expireTime = this.rentMonth;
      console.log("租用时间");
      console.log(this.expireTime);
    },
  },
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
  background: #f4606c;
  /* border-color: #20B2AA; */
  color: #fff;
}

.button3 {
  background: #20b2aa;
  border-color: #20b2aa;
  color: #fff;
}
/* 订单详情下拉信息 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>