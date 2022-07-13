<template>
  <div>
    <!-- 查询条件 -->
    <div>
      <el-form ref="searchHouseHold" :model="searchHouseHold" label-width="80px" :inline="true" @keyup.enter.native="enterSearch" align="left">
      <div>
        <el-form-item label="姓 名：">
          <el-input v-model="searchHouseHold.name" placeholder="输入查询姓名....."></el-input>
        </el-form-item>

        <el-form-item label="年 龄：">
          <el-input v-model="searchHouseHold.age" placeholder="输入查询年龄....."></el-input>
        </el-form-item>

        <el-form-item label="性 别：">
          <div >
            <el-radio-group v-model="searchHouseHold.gender">
              <!-- <el-radio-button label="" >全部</el-radio-button> -->
              <el-radio-button label="1" >男</el-radio-button>
              <el-radio-button label="0" >女</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
      </div>
      
      <div>
        <el-form-item label="电 话：">
          <el-input v-model="searchHouseHold.telephone" placeholder="输入查询电话....."></el-input>
        </el-form-item>

        <el-form-item label="房间I D：">
          <el-input v-model="searchHouseHold.houseId" placeholder="输入查询房间ID....."></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <el-button type="" @click="clear()">清除</el-button>
          <el-button @click="tohouseHoldAdd()"><i class="el-icon-plus"></i>新添人员</el-button>
        </el-form-item>
      </div>
      </el-form>
    </div>
    <!-- 数据展示 -->
    <div>
      <!-- 表单 -->
      <div>
        <el-table :data="houseHouds" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="I D" width="120" />
            <el-table-column align="center" prop="name" label="姓 名" width="140" />
            <el-table-column align="center" prop="age" label="年 龄" width="120" />
            <el-table-column align="center" prop="gender" label="性 别" width="120" >
                <template slot-scope="scope">
                  {{scope.row.gender== true ? "男" : 
                   scope.row.gender== false ? "女": ""
                  }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="telephone" label="电 话" width="140" />
            <el-table-column align="center" prop="houseId" label="房间I D" width="100" />
            <el-table-column align="center" prop="state" label="状 态" width="140" >
              <template slot-scope="scope">
                  {{scope.row.state== 1 ? "居住在该小区" : 
                   scope.row.state== 2 ? "未居住在该小区": ""
                  }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="owner" label="户 主" width="140" >
                <template slot-scope="scope">
                  {{scope.row.gender== true ? "户主" : 
                   scope.row.gender== false ? "居住": ""
                  }}
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="houseHoldDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <!-- 修改表单 -->
        <el-dialog title="修改人员信息" :visible.sync="dialogFormVisible" >
          <el-form :model="updateHouseHoldInfo" :inline="false" label-width="90px">
            <el-form-item label="I D ：" v-model="updateHouseHoldInfo.id">
              {{this.updateHouseHoldInfo.id}}
            </el-form-item>
            <el-form-item label="姓 名：">
              <el-input v-model="updateHouseHoldInfo.name" placeholder="请输入姓名....."></el-input>
            </el-form-item>
            <el-form-item label="年 龄：">
              <el-input v-model="updateHouseHoldInfo.age" placeholder="请输入年龄....."></el-input>
            </el-form-item>
            <el-form-item label="性 别:">
              <el-switch v-model="updateHouseHoldInfo.gender" active-color="#409eff" inactive-color="#e890a9" active-text="男"
                inactive-text="女" active-value="true" inactive-value="false">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否为房主:">
              <el-switch v-model="updateHouseHoldInfo.isOwner" active-color="#409eff" inactive-color="#e890a9" active-text="是"
                inactive-text="否" active-value="true" inactive-value="false">
              </el-switch>
            </el-form-item>
            <el-form-item label="状 态:">
              <el-switch v-model="updateHouseHoldInfo.state" active-color="#409eff" inactive-color="#e890a9" active-text="居住"
                inactive-text="离开" active-value="1" inactive-value="2">
              </el-switch>
            </el-form-item>
            <el-form-item label="电 话：">
              <el-input v-model="updateHouseHoldInfo.telephone" placeholder="请输入电话....."></el-input>
            </el-form-item>
            <el-form-item label="房间ID：">
              <el-input v-model="updateHouseHoldInfo.houseId" placeholder="请输入房间ID....."></el-input>
            </el-form-item>
           
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateCancel()">取 消</el-button>
            <el-button type="primary" @click="updateHouseHold()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.page.pageNum"
          :page-sizes="[25,50, 120, 150]"
          :page-size="this.page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    this.getHouseHoldList();
  },
  data() {
    return {
      //查询的条件
      searchHouseHold: {
        name: '',
        age: '',
        gender: false,
        telephone: "",
        houseId: "",
        idOwner: "",
        state: "",
        pageNum: 1,
        pageSize: 25,
      },
      
      houseHouds: [],  
      page: [],
      retuenInfo: [],
      dialogFormVisible: false,//是否显示修改对话框
      updateHouseHoldInfo: {//修改的HouseHold
        id: '',
        name: '',
        age: '',
        gender: '',
        telephone: "",
        houseId: "",
        isOwner: "",
        state: "",
      },
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex % 3 == 0) {
          return 'warning-row';
        } else if (rowIndex %3 === 1) {
          return 'success-row';
        }
        return '';
    },
    //获取表单
    getHouseHoldList(){
      this.$axios.get("http://localhost:8080/houseHold/selectHouseHold",
          {
            params: { //这种传参方法为键值对
              id : null ,
              name : this.searchHouseHold.name,
              age : this.searchHouseHold.age,
              gender : this.searchHouseHold.gender,
              telephone : this.searchHouseHold.telephone,
              houseId : this.searchHouseHold.houseId,
              idOwner : this.searchHouseHold.idOwner,
              state : this.searchHouseHold.state,
              pageNum : this.searchHouseHold.pageNum,
              pageSize : this.searchHouseHold.pageSize,
            }
          }
      ).then(resp => {
        console.log(resp);
        if (resp.data.code === 200) {
          this.$message.success('请求成功！');
          this.houseHouds = resp.data.data.list;
          this.page = resp.data.data;
          console.log(this.houseHouds)
        } else {
          this.$message.error('请求错误！');
        }
      })
    },
    // 删除HouseHold
    deleteHouseHod(index,row){
        this.$axios.post("http://localhost:8080/houseHold/deleteHouseHold",
          {
            params: {
              id : row.id,
            }
          }
      ).then(resp => {
        console.log(resp);
        if (resp.data.code === 200) {
          this.$message.success('请求成功！');
          this.retuenInfo = resp.data.data;
          console.log(this.houseHouds)
        } else {
          this.$message.error('请求错误！');
        }
      })
    },
    // 更新HouseHold
    updateHouseHold(){
      this.$axios.post("http://localhost:8080/houseHold/updateHouseHold",
                {
                  params: {
                    id : this.updateHouseHoldInfo.id,
                    name: this.updateHouseHoldInfo.name,
                    age: this.updateHouseHoldInfo.age,
                    gender: this.updateHouseHoldInfo.gender,
                    telephone: this.updateHouseHoldInfo.telephone,
                    houseId: this.updateHouseHoldInfo.houseId,
                    idOwner: this.updateHouseHoldInfo.isOwner,
                    state: this.updateHouseHoldInfo.state,
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
    //分页
    handleSizeChange(val) {
        this.searchHouseHold.pageSize = val;
        this.getHouseHoldList();
      },
      handleCurrentChange(val) {
        this.searchHouseHold.pageNum = val;
        this.getHouseHoldList();
    },

    //添加页面
    tohouseHoldAdd() {
      this.$router.push({
        path: '/houseHoldAdd',
        query: {
          
        }
      })
    },
    
    //点击查询事件
    onSubmit() {
      console.log(this.searchHouseHold.gender);
      this.getHouseHoldList();
    },
    //键盘 enter 事件
    enterSearch() {
      this.onSubmit()
    },
    //清除条件查询
    clear() {
        this.searchHouseHold.name = '',
        this.searchHouseHold.age = '',
        this.searchHouseHold.gender = null,
        this.searchHouseHold.telephone = '',
        this.searchHouseHold.houseId = '',
        this.searchHouseHold.idOwner = '',
        this.searchHouseHold.state = '',
        this.getHouseHoldList()
    },
     //编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.updateHouseHoldInfo.id = row.id;
      this.updateHouseHoldInfo.name = row.name;
      this.updateHouseHoldInfo.age = row.age;
      this.updateHouseHoldInfo.gender = row.gender;
      this.updateHouseHoldInfo.telephone = row.telephone;
      this.updateHouseHoldInfo.houseId = row.houseId;
      this.updateHouseHoldInfo.isOwner = row.isOwner;
      this.updateHouseHoldInfo.state = row.state;
    },
    houseHoldDelete(index,row){
        this.$confirm('此操作将永久删除该住户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
                this.$axios.post("http://localhost:8080/houseHold/deleteHouseHold?",
                {
                  params: {
                    id : row.id,
                  }
                }
            ).then(resp => {
              console.log("I D" + row.id);
              if (resp.data.code === 200) {
               this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'warning',
                  message: '删除失败!'
                });
              }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
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
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>