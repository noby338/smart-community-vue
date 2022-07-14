<template>
  <div>
    <!-- 查询栏 -->
    <div>

    </div>
    <!-- 表单栏 -->
    <div>
      <el-table :data="houses.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
        
        <el-table-column prop="buildingName" label="楼栋" sortable width="120">
        </el-table-column>
        
        <el-table-column prop="nuitName" label="单元" sortable width="120">
        </el-table-column>
        
        <el-table-column prop="floorName" label="楼栋" sortable width="120">
        </el-table-column>

        <el-table-column prop="houseNum" label="房间编号" sortable width="160">
        </el-table-column>

        <el-table-column prop="housePeopleNums" label="居住人数" sortable width="120">
        </el-table-column>

        <el-table-column label="居住人信息" width="180">
            <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="houseHoldList">
              <el-table-column width="120" property="name" label="姓名"></el-table-column>
              <el-table-column width="120" property="age" label="年龄"></el-table-column>
              <el-table-column width="150" property="telephone" label="电话"></el-table-column>
              <el-table-column label="居住人信息" width="180">
              </el-table-column>  
            </el-table>
            <el-button slot="reference">查看</el-button>
          </el-popover>
        </el-table-column>

        <el-table-column prop="houseState" label="房间状态" sortable width="160">
          <template slot-scope="scope">
                  {{scope.row.houseState== 1 ? "已 出 售" : 
                   scope.row.houseState== 2 ? "已 出 租" :
                   scope.row.houseState== 3 ? "出售未入住" :
                   scope.row.houseState== 4 ? "出租未入住" :
                   scope.row.houseState== 5 ? "闲 置 中" : ""
                  }}
                </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注信息" width="120">
        </el-table-column>

         <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 修改表单 -->
    <!-- <div>
        <el-dialog title="修改房间信息" :visible.sync="dialogFormVisible" >
          <el-form :model="updateHouseInfo" :inline="false" label-width="90px">
            <el-form-item label="楼 栋：" v-model="updateHouseHoldInfo.buildingName">
              {{this.updateHouseInfo.buildingName}}
            </el-form-item>
            <el-form-item label="单 元：" v-model="updateHouseHoldInfo.nuitName">
              {{this.updateHouseInfo.nuitName}}
            </el-form-item>
            <el-form-item label="楼 层：" v-model="updateHouseHoldInfo.floorName">
              {{this.updateHouseInfo.floorName}}
            </el-form-item>
            <el-form-item label="房间编号：" v-model="updateHouseHoldInfo.houseNum">
              {{this.updateHouseInfo.houseNum}}
            </el-form-item>
            <el-form-item label="居住人数：">
              <el-input v-model="updateHouseInfo.housePeopleNums" placeholder="请输入居住人数....."></el-input>
            </el-form-item>
            <el-form-item label="房间状态:">
                <el-select v-model="updateHouseInfo.houseState" placeholder="请选择房间状态.....">
                  <el-option
                    v-for="item in states"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入备注信息....."
                v-model="updateHouseInfo.remark">
              </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateCancel()">取 消</el-button>
            <el-button type="primary" @click="updateHouse()">确 定</el-button>
          </div>
        </el-dialog>
      </div> -->

    <!-- 分页 -->
    <div>
      <el-pagination @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[50, 100, 150, 200]"
               :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    created(){
      this.getHouseList();
    },
    data() {
      return {
        list:[],
        houses:[],
        houseHoldList:[],
        total: 1920,
        //查询条件
        selectHouseInfo: {
          buildingId: '',
          unitId: '',
          floorId: '',
          houseId: '',
          houseState: '',
          housePeopleNums: '',
        },
        states:[{
          value: '1',
          label: '已 出 售'
        }, {
          value: '2',
          label: '已 出 租'
        }, {
          value: '3',
          label: '出售未入住'
        }, {
          value: '4',
          label: '出租未入住'
        }, {
          value: '5',
          label: '闲 置 中'
        }],
        // 分页
        houses: [],
        search: '',
        currentPage: 1,
        pageSize: 50,
        totalNum: 1920,

        //更新房间信息
        dialogFormVisible: false ,
        updateHouseInfo:{
          buildingId: '',
          buildingName: '',
          unitId: '',
          nuitNmae: '',
          floorId: '',
          flooerName: '',
          houseId: '',
          houseState: '',
          housePeopleNums: '',
          remark: '',
        },
      }
    },
    
    methods: {
      formatter(row, column) {
        return row.address;
      },
      // 分页
      //分页大小改变
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(AfterChangeData());
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.pageNum = val;
     },
          //获取表单
      getHouseList(){
        this.$axios.get("http://localhost:8080/house/selectHouse",
            {
              params: { //这种传参方法为键值对
                buildingId: this.selectHouseInfo.buildingId,
                unitId: this.selectHouseInfo.unitId,
                floorId: this.selectHouseInfo.floorId,
                houseId: this.selectHouseInfo.houseId,
                houseState: this.selectHouseInfo.houseState,
                housePeopleNums: this.selectHouseInfo.housePeopleNums,
              }
            }
        ).then(resp => {
          console.log(resp);
          if (resp.data.code === 200) {
            this.$message.success('请求成功！');
            this.total = resp.data.data.length;
            this.houses = resp.data.data;
            //实现分页逻辑
				    this.getList();
            this.houseHoldList = resp.data.data.houseHoldList;
            // console.log(this.houseHoldList);
          } else {
            this.$message.error('请求错误！');
          }
        })
      },
      async getUserInfoTmp() {
            return await this.$axios.get('http://localhost:8080/house/selectHouse',
            {
              params: { //这种传参方法为键值对
                buildingId: this.selectHouseInfo.buildingId,
                unitId: this.selectHouseInfo.unitId,
                floorId: this.selectHouseInfo.floorId,
                houseId: this.selectHouseInfo.houseId,
                houseState: this.selectHouseInfo.houseState,
                housePeopleNums: this.selectHouseInfo.housePeopleNums,
              }
            }
            ).then((res) => {
                console.log(res.data.data);
                this.houses = res.data.data;
            }).catch(function (error) {
                console.log(error);
                this.$message.error('获取用户信息失败');
            });
      },
    		//该方法也相应改为同步，否则this.getUserInfoTmp()会有错误提示。
        async getList() {
            //条件查询时先获取全部信息
            await this.getUserInfoTmp();
            // console.log('this.userInfo总记录数为='+this.houses);
            //二次赋值
            this.houses = list;
            // console.log('this.userInfo最终赋值为='+this.houses);
            list.filter((item, index) => index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1));
            this.totalNum = list.length
        },
        handleSizeChange(val) {
            console.log('每页'+val+'条');
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log('当前页:'+val);
            this.currentPage = val;
            this.getList();
        },
		     //搜索方法
        searchData() {
            this.currentPage = 1;
            this.getList();
        },
        //修改的房间信息
      handleEdit(index, row) {
        console.log(row);
      this.dialogFormVisible = true;
      this.updateHouseInfo.buildingId = row.buildingId;
      this.updateHouseInfo.buildingName = row.buildingName;
      this.updateHouseInfo.nuitNmae = row.nuitNmae;
      this.updateHouseInfo.flooerName = row.flooerName;
      this.updateHouseInfo.houseId = row.houseId;
      this.updateHouseInfo.houseState = row.houseState;
      this.updateHouseInfo.housePeopleNums = row.housePeopleNums;
      this.updateHouseInfo.remark = row.remark;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    // 更新HouseHold
    updateHouse(){
      this.$axios.post("http://localhost:8080/house/updateHouse",
        {
          params: {
              houseId : this.updateHouse.houseId,
              houseState : this.updateHouse.houseState,
              housePeopleNums : this.updateHouse.housePeopleNums,
              remark : this.updateHouse.remark,
            }
          }
        ).then(resp => {
          if (resp.data.code === 200) {
              this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
              this.$message({
              type: 'warning',
              message: '修改失败!'
            });
          }
        })
      },
      // 取消修改
      updateCancel() {
        this.dialogFormVisible = false
        this.$message('取消修改');
    },
    }
  }
</script>