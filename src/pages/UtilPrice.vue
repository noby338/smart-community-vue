
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>单价管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 修改梯度 -->
    <el-dialog title="编辑梯度" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form ref="gradientPrice" :model="newUtilPrice" :inline="false" label-width="80px" label-position="left"
        :rules="rules">
        <el-form-item label="梯度" prop="name">
          <el-input placeholder="请输入内容" v-model="newUtilPrice.name">
          </el-input>
        </el-form-item>
        <el-form-item label="开始量" prop="beginning">
          <el-input placeholder="请输入内容" v-model="newUtilPrice.beginning">
          </el-input>
        </el-form-item>
        <el-form-item label="结束量" prop="end">
          <el-input placeholder="留空为无结束量" v-model="newUtilPrice.end">
          </el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input placeholder="请输入内容" v-model="newUtilPrice.price">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCancel">取 消</el-button>
        <el-button type="primary" @click="update('gradientPrice')">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 添加梯度 -->
    <el-dialog title="添加梯度" :visible.sync="dialogFormVisible2" :show-close="false">
      <el-form ref="gradientPrice2" :model="insertGradient" :inline="false" label-width="80px" label-position="left"
        :rules="rules2">
        <el-form-item label="梯度" prop="name">
          <el-input placeholder="请输入内容" v-model="insertGradient.name">
          </el-input>
        </el-form-item>
        <el-form-item label="开始量" prop="beginning">
          <el-input placeholder="请输入内容" v-model="insertGradient.beginning">
          </el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input placeholder="请输入内容" v-model="insertGradient.price">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="add('gradientPrice2')">确 定</el-button>
      </div>
    </el-dialog>


    <el-tabs v-model="activeName"  @tab-click="handleClickTab">
      <!-- <el-tab-pane :label="utilPrice[0].name" name="one">
        <el-table :data="utilPrice[0].gradientPriceList" style="width: 100%">
          <el-table-column prop="name" label="梯度">
          </el-table-column>
          <el-table-column prop="beginning" label="开始量">
          </el-table-column>
          <el-table-column prop="end" label="结束量">
          </el-table-column>
          <el-table-column prop="price" label="单价">
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="handleAdd(1)">添加梯度</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                :disabled="(scope.$index !== (utilPrice[0].gradientPriceList.length - 1)||scope.$index ===0) ? true : false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
      <el-tab-pane :label="utilPrice[1].name" name="elec">
        <el-table :data="utilPrice[1].gradientPriceList" style="width: 100%">
          <el-table-column prop="name" label="梯度">
          </el-table-column>
          <el-table-column prop="beginning" label="开始量(千瓦‧时)">
          </el-table-column>
          <el-table-column prop="end" label="结束量(千瓦‧时)">
          </el-table-column>
          <el-table-column prop="price" label="单价(元)">
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="handleAdd(2)">添加梯度</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                :disabled="(scope.$index !== (utilPrice[1].gradientPriceList.length - 1)||scope.$index ===0) ? true : false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="utilPrice[2].name" name="water">
        <el-table :data="utilPrice[2].gradientPriceList" style="width: 100%">
          <el-table-column prop="name" label="梯度">
          </el-table-column>
          <el-table-column prop="beginning" label="开始量(吨)">
          </el-table-column>
          <el-table-column prop="end" label="结束量(吨)">
          </el-table-column>
          <el-table-column prop="price" label="单价(元)">
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="handleAdd(3)">添加梯度</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                :disabled="(scope.$index !== (utilPrice[2].gradientPriceList.length - 1)||scope.$index ===0) ? true : false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="utilPrice[3].name" name="gas">
        <el-table :data="utilPrice[3].gradientPriceList" style="width: 100%">
          <el-table-column prop="name" label="梯度">
          </el-table-column>
          <el-table-column prop="beginning" label="开始量(立方米)">
          </el-table-column>
          <el-table-column prop="end" label="结束量(立方米)">
          </el-table-column>
          <el-table-column prop="price" label="单价(元)">
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="handleAdd(4)">添加梯度</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                :disabled="(scope.$index !== (utilPrice[3].gradientPriceList.length - 1)||scope.$index ===0) ? true : false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "UtilPrice",
  data() {
    let rightNum = (rule, value, callback) => {//数字的校验规则
      if (value === null) {
        callback();
      } else if (isNaN(value)) {//true为字符串
        callback(new Error('请输入数字值'));
      } else if (value < 0) {
        callback(new Error('请输入非负数'));
      } else if ((value.toString().length - value.toString().indexOf(".") - 1) > 4) {//true为小数位大于4的小数
        callback(new Error('小数的位数应不超过4位'));
      } {
        callback();
      }
    };
    let rightBeginning = (rule, value, callback) => {//开始量应该小于结束量
      if (this.newUtilPrice.end !== null && this.newUtilPrice.end !== '' && value >= this.newUtilPrice.end) {
        callback(new Error('开始量应该小于结束量'));
      } else {
        callback()
      }
    };
    let rightEnd = (rule, value, callback) => {//结束量应大于开始量
      if (value !== null && value !== '' && value <= this.newUtilPrice.beginning) {
        callback(new Error('结束量应大于开始量'));
      } else {
        callback()
      }
    };
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      activeName: "elec",
      rules: {//修改表单的验证规则
        name: [
          { required: true, message: '请输入本梯度名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        beginning: [
          { required: true, message: '请输入本梯度开始量', trigger: 'blur' },
          { validator: rightNum, trigger: 'blur' },
          { validator: rightBeginning, trigger: 'blur' }
        ],
        end: [
          { validator: rightNum, trigger: 'blur' },
          { validator: rightEnd, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入本梯度单价', trigger: 'blur' },
          { validator: rightNum, trigger: 'blur' }
        ],
      },
      rules2: {//添加表单的验证规则
        name: [
          { required: true, message: '请输入本梯度名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        beginning: [
          { required: true, message: '请输入本梯度开始量', trigger: 'blur' },
          { validator: rightNum, trigger: 'blur' }
        ],
     
        price: [
          { required: true, message: '请输入本梯度单价', trigger: 'blur' },
          { validator: rightNum, trigger: 'blur' }
        ],

      },

      newUtilPrice: {
        id: null,
        utilId: null,
        name: null,
        beginning: null,
        end: null,
        price: null
      },
      utilPrice: [
        {
          "id": 1,
          "name": "停车费",
          "gradientPriceList": [
            {
              "id": 1,
              "name": "第一梯度",
              "utilId": 1,
              "beginning": 0.0,
              "end": 1.0,
              "price": 3.0
            },
            {
              "id": 2,
              "name": "第二梯度",
              "utilId": 1,
              "beginning": 1.0,
              "end": null,
              "price": 5.0
            }
          ]
        },
        {
          "id": 2,
          "name": "电费",
          "gradientPriceList": [
            {
              "id": 3,
              "name": "第一梯度",
              "utilId": 2,
              "beginning": 0.0,
              "end": 180.0,
              "price": 0.5224
            },
            {
              "id": 4,
              "name": "第二梯度",
              "utilId": 2,
              "beginning": 180.0,
              "end": 280.0,
              "price": 0.6224
            },
            {
              "id": 5,
              "name": "第三梯度",
              "utilId": 2,
              "beginning": 280.0,
              "end": null,
              "price": 0.8224
            }
          ]
        },
        {
          "id": 3,
          "name": "水费",
          "gradientPriceList": [
            {
              "id": 6,
              "name": "第一梯度",
              "utilId": 3,
              "beginning": 0.0,
              "end": 18.0,
              "price": 2.08
            },
            {
              "id": 7,
              "name": "第二梯度",
              "utilId": 3,
              "beginning": 18.0,
              "end": 25.0,
              "price": 2.95
            },
            {
              "id": 8,
              "name": "第三梯度",
              "utilId": 3,
              "beginning": 25.0,
              "end": null,
              "price": 5.56
            }
          ]
        },
        {
          "id": 4,
          "name": "燃气费",
          "gradientPriceList": [
            {
              "id": 9,
              "name": "第一梯度",
              "utilId": 4,
              "beginning": 0.0,
              "end": 300.0,
              "price": 2.45
            },
            {
              "id": 10,
              "name": "第二梯度",
              "utilId": 4,
              "beginning": 300.0,
              "end": 500.0,
              "price": 3.35
            },
            {
              "id": 11,
              "name": "第三梯度",
              "utilId": 4,
              "beginning": 500.0,
              "end": null,
              "price": 6.6
            }
          ]
        }
      ],
      insertGradient: {
        id: null,
        utilId: null,
        name: null,
        beginning: null,
        price: null
      },
      initInsertGradient: {
        id: null,
        utilId: null,
        name: null,
        beginning: null,
        price: null
      }

    }
  },
  methods: {
    //添加梯度
    handleAdd(i){
      this.dialogFormVisible2 = true;
      this.insertGradient.utilId =  i;
    },
    //编辑记录
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.newUtilPrice = row;
    },
    resetNewUtilPrice() {
      this.newUtilPrice = this.utilPrice;
    },
    //点击tab
    handleClickTab(tab,event) {
    },


    //删除记录
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定后执行的函数，发送请求
        this.$axios.delete("http://localhost:8080/gradientPrice/delete/" + row.id
        ).then(resp => {
          if (resp.data.code === 200) {
            this.$message.success('删除成功');
            this.getUtilPrice();//修改成功后刷新页面
          } else {
            this.$message.error('删除失败');
          }
        })
      }).catch(() => {//点击取消后执行的函数
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    //刷新记录
    getUtilPrice() {//这种传参方法为 json 后端将此 json 封装成为一个对象
      this.$axios.get("http://localhost:8080/utilPrice/selectAll"
      ).then(resp => {
        if (resp.data.code === 200) {
          this.utilPrice = resp.data.data;
        } else {
          this.$message.error('请求错误');
        }
      })
    },
    //更改梯度
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {//验证通过将返回 true，否则返回 false
          this.$axios.put("http://localhost:8080/gradientPrice/update", this.newUtilPrice
          ).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success('修改成功');
              this.dialogFormVisible = false;
              this.getUtilPrice();//修改成功后刷新页面
            } else {
              this.$message.error('请求错误');
            }
          })
        } else {
          this.$message.error('请输入正确信息')
        }
      });
    },
    //添加梯度
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {//验证通过将返回 true，否则返回 false
          this.$axios.post("http://localhost:8080/gradientPrice/insert", this.insertGradient
          ).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success('添加成功');
              this.dialogFormVisible2 = false;
              this.getUtilPrice();//添加成功后刷新页面
            } else {
              this.$message.error('请求错误');
            }
          })
        } else {
          this.$message.error('请输入正确信息')
        }
      });
      this.insertGradient = this.initInsertGradient;
    },



  



    updateCancel() {
      this.dialogFormVisible = false
      this.$message('取消修改');
    },
    addCancel() {
      this.dialogFormVisible2 = false;
      this.insertGradient = this.initInsertGradient;
      this.$message('取消添加');
    },
    //分页组件页码改变事件
    // handleCurrentChange(pageNum) {
    //   this.getEmp(pageNum);
    // },
    // //点击查询事件
    // onSubmit() {
    //   this.getEmp(1)
    // },
    // //键盘 enter 事件
    // enterSearch() {
    //   this.onSubmit()
    // },
    // //清除条件查询
    // clear() {
    //   this.searchEmp = {
    //     eid: '',
    //     ename: '',
    //     dep: ''
    //   }
    // },
    // //获取所有的部门信息
    // getAllDep() {
    //   this.$axios.get("http://localhost:8080/selectAllDep").then(resp => {
    //     if (resp.data.code === 200) {
    //       this.deps = resp.data.data;
    //     } else if (resp.data.code === 401) {
    //       this.$router.push("/login");
    //     } else {
    //       this.$message.error('请求错误');
    //     }
    //   })
    // }

  },
  //挂载完成
  mounted() {
    this.getUtilPrice();
    this.resetNewUtilPrice();
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
</style>