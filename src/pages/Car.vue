<template>
  <div>
    <!-- 查询添加 -->
    <el-form :inline="true" :model="queryCarInfo" class="demo-form-inline">
      <el-form-item label="车牌号">
        <el-input v-model="queryCarInfo.carNumber" placeholder="车牌号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryCarInfos">查询</el-button>
        <el-button type="primary" @click="addCarInfo">添加车辆</el-button>
      </el-form-item>
    </el-form>
    <!-- 车辆信息展示表格 -->
    <div>
      <el-table :data="page.list" style="width: 100%">
        <el-table-column prop="carNumber" label="车牌号" width="100"> </el-table-column>
        <el-table-column prop="carJpg" label="图片" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.carJpg+'?random='+Math.random()" style="width:150px;height:100px">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="parkingInfo.parkNumber" label="车位号" width="100">
        </el-table-column>
        <el-table-column prop="ownersInfo.name" label="车主名" width="100">
        </el-table-column>
        <el-table-column prop="ownersInfo.telephone" label="车主电话" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">修改车牌号</el-button>
            <el-button size="mini" @click="handleUpdateCarOfOwner(scope.row)">绑定车主</el-button>
            <el-button size="mini" @click="handleUpdateCarOfParking(scope.row)">绑定车位</el-button>
            <el-button size="mini" @click="handleUploadJpg(scope.row)">上传图片</el-button>
            <el-button size="mini" @click="handledeleteCar(scope.row)">删除车辆</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.pageNum" :page-sizes="[2, 5, 10]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">>
      </el-pagination>
    </div>

    <!-- 编辑车辆信息 -->
    <div>
      <el-dialog :title="titleCar" :visible.sync="dialogFormVisible">
        <el-form :model="editCar" label-width="80px">
          <el-form-item label="车牌号">
            <el-input v-model="editCar.carNumber" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateCancel">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 上传图片 -->
    <div>
      <el-dialog title="图片上传" :visible.sync="dialogFormVisibleForImgUpload">
        <el-form :model="editCar" label-width="80px">
          <el-form-item label="车牌号">
            <el-input v-model="carNumberForUpload" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片：">
            <el-upload class="upload-demo" ref="upload" :limit="1" accept=".png,.jpg,.jepg" action="" :with-credentials="true" :http-request="httpRequest" :file-list="fileList" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
              <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-left: 20px">只能上传.png.jpg.jepg格式的图片文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadCancel">取 消</el-button>
          <el-button type="primary" @click="uploadOk">上 传</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改车位 -->
    <div>
      <el-dialog title="修改车位绑定" :visible.sync="dialogFormVisibleUpdateParkingNumber">
        <el-form :model="editCar" label-width="80px">
          <el-form-item label="车牌号">
            <el-input v-model="editCar.carNumber" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车位号">
            <el-select v-model="editCar.parkingInfo.id" placeholder="请选择">
              <el-option v-for="item in optionsForParkNumber" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateParkNumberCancel">取 消</el-button>
          <el-button type="primary" @click="updateParkNumber">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改车主 -->
    <div>
      <el-dialog title="修改车位绑定" :visible.sync="dialogFormVisibleUpdateCarOfOwner">
        <el-form :model="editCar" label-width="80px">
          <el-form-item label="车牌号">
            <el-input v-model="editCar.carNumber" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择车主">
            <el-select v-model="editCar.ownersInfo.id" filterable placeholder="请选择">
              <el-option v-for="item in optionsForCarOwners" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateOwnerCancel">取 消</el-button>
          <el-button type="primary" @click="updateOwner">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询数据
      queryCarInfo: {
        carNumber: null,
      },
      //添加+查询车辆title
      titleCar: '添加车辆',
      //页面车辆数据
      currentPage: 1,
      page: {
        pageNum: 1,
        pageSize: 5
      },
      //修改车辆数据
      dialogFormVisible: false,
      optionsForParkNumber: [{
        value: null,
        label: null
      }],//车位列表
      optionsForCarOwners: [{
        value: null,
        label: null
      }],
      parkingInfo: {
        id: "0",
        name: ''
      },
      editCar: {
        id: 0,
        parkingInfo: {
          id: 0,
          name: ''
        },
        ownersInfo: {
          id: 0,
          house: {
            id: 0,
          }
        }
      },
      //图片上传
      fileList: [],
      dialogFormVisibleForImgUpload: false,
      carNumberForUpload: null,
      //车位绑定
      dialogFormVisibleUpdateParkingNumber: false,
      //车主绑定
      dialogFormVisibleUpdateCarOfOwner: false,
    }
  },
  created() {
    this.getAllCars();
  },
  methods: {
    getAllCars() {
      this.$axios.post("http://localhost:8080/cars/" + this.page.pageNum + "/" + this.page.pageSize, this.queryCarInfo).then((resp) => {
        if (resp.data.code == 200) {
          this.page = resp.data.data;
        }
      });
    },
    queryCarInfos() {
      this.getAllCars();
    },
    addCarInfo() {
      this.titleCar = '添加车辆';
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      //修改车辆传递当前行数据到修改车辆信息模态框
      this.editCar = { ...row };
      this.titleCar = '修改车牌号';
      this.dialogFormVisible = true;
      //修改和改绑使用同一个editCar数据，故必须设置parkingInfo.id来使改绑数据绑定无错
      if (this.editCar.parkingInfo == null) {
        this.editCar.parkingInfo = JSON.parse(JSON.stringify(this.parkingInfo));
      }
    },
    handleUpdateCarOfOwner(row) {
      this.editCar = { ...row };
      if (this.editCar.parkingInfo == null) {
        this.editCar.parkingInfo = JSON.parse(JSON.stringify(this.parkingInfo));
      }
      this.$axios.post("http://localhost:8080/carOwnersName/" + this.editCar.ownersInfo.id).then(resp => {
        this.optionsForCarOwners = resp.data.data;
      });
      this.dialogFormVisibleUpdateCarOfOwner = true;
    },
    handleUpdateCarOfParking(row) {
      //修改车位绑定
      this.editCar = { ...row };
      if (this.editCar.parkingInfo == null) {
        this.editCar.parkingInfo = JSON.parse(JSON.stringify(this.parkingInfo));
      }
      this.$axios.post("http://localhost:8080/parkNumbersSelect/" + this.editCar.parkingInfo.id + "/" + this.editCar.ownersInfo.id).then(resp => {
        this.optionsForParkNumber = resp.data.data;
      });
      this.dialogFormVisibleUpdateParkingNumber = true;
    },
    handleUploadJpg(row) {
      //上传图片传递当前行数据到上传图片模态框
      this.carNumberForUpload = row.carNumber;
      this.dialogFormVisibleForImgUpload = true;
    },
    handledeleteCar(row) {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("http://localhost:8080/deleteCarById/" + row.id).then(resp => {
          if (resp.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //未调用
            this.page.pageNum=1;
            this.getAllCars();
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
          message: '取消删除'
        });
      });
    },
    handleSizeChange(val) {
      //分页改页大小
      this.page.pageSize = val;
      this.getAllCars();
    },
    handleCurrentChange(val) {
      //分页改页码
      this.page.pageNum = val;
      this.getAllCars();
    },
    updateCancel() {
      //修改车辆信息模态框关闭
      this.dialogFormVisible = false;
      this.clearEditCar();
    },
    update() {
      if (this.titleCar == '添加车辆') {
        this.$confirm('确认添加, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("http://localhost:8080/addCarByNumber/" + this.editCar.carNumber).then(resp => {
            if (resp.data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.clearEditCar();
              this.dialogFormVisible = false;
              this.getAllCars();
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
      } else {
        this.$confirm('确认修改车牌号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("http://localhost:8080/changeCarNumber/" + this.editCar.id + "/" + this.editCar.carNumber).then(resp => {
            if (resp.data.code == 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.clearEditCar();
              this.dialogFormVisible = false;
              this.getAllCars();
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
            message: '已取消修改'
          });
        });
      }
    },

    //图片上传相关方法
    httpRequest(param) {
      let upLoadImg = param.file;
      let uploadDatas = new FormData();
      uploadDatas.append('img', upLoadImg);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post("http://localhost:8080/uploadImages/" + this.carNumberForUpload, uploadDatas, config).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success("上传成功");

          //清空fileList文件
          this.$refs['upload'].clearFiles();
          this.getAllCars();
          this.dialogFormVisibleForImgUpload = false;
        } else {
          this.$message.error("上传失败");
          this.$refs['upload'].clearFiles();
          this.dialogFormVisibleForImgUpload = false;
        }
      });
    },
    uploadCancel() {
      this.dialogFormVisibleForImgUpload = false;
    },
    uploadOk() {
      this.$refs.upload.submit();
    },
    //改绑车位相关方法
    updateParkNumberCancel() {
      this.dialogFormVisibleUpdateParkingNumber = false;
      this.clearEditCar();
      this.optionsForParkNumber = [];
    },
    updateParkNumber() {
      this.$confirm('确认修改车位绑定, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("http://localhost:8080/changeParkIdByCarId/" + this.editCar.id + "/" + this.editCar.parkingInfo.id).then(resp => {
          if (resp.data.code == 200) {
            this.$message({
              type: 'success',
              message: '改绑成功!'
            });
            this.clearEditCar();
            this.dialogFormVisibleUpdateParkingNumber = false;
            this.getAllCars();
          } else {
            this.$message({
              type: 'warning',
              message: '改绑失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消改绑'
        });
      });
    },
    //改绑车主相关
    updateOwnerCancel() {
      this.dialogFormVisibleUpdateCarOfOwner = false;
      this.clearEditCar();
      this.optionsForCarOwners = [];
    },
    updateOwner() {
      this.$confirm('确认修改车位绑定, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("http://localhost:8080/changeOwnerIdByCarId/" + this.editCar.ownersInfo.id + "/" + this.editCar.id).then(resp => {
          if (resp.data.code == 200) {
            this.$message({
              type: 'success',
              message: '改绑成功!'
            });
            this.clearEditCar();
            this.dialogFormVisibleUpdateCarOfOwner = false;
            this.getAllCars();
          } else {
            this.$message({
              type: 'warning',
              message: '改绑失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消改绑'
        });
      });
    },
    //清空editCar
    clearEditCar() {
      this.editCar = {
        id: 0,
        parkingInfo: {
          id: 0,
          name: ''
        },
        ownersInfo: {
          id: 0,
          house: {
            id: 0,
          }
        }
      };
    }
  }
};
</script>

<style>
</style>