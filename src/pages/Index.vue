<template>
  <el-container>
    <el-header>
      <el-row>

        <el-col :span="24">智能社区管理系统</el-col>

        <!-- <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff"
          active-text-color="#fff">

          <el-submenu index="2" class="submenu">
            <template slot="title">{{ localData.name }}</template>

            <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
          </el-submenu>
        </el-menu> -->

      </el-row>
    </el-header>

    <el-container>

      <el-aside width="180px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <!-- <el-menu default-active="" v-for="(item, index) in listData" :key="index" class="el-menu-vertical-demo"
              @open="handleOpen" @close="handleClose"> -->

              <!-- <el-submenu index=index v-if="item.childMenu.length != 0">
                <template slot="title">

                  <i class=""></i>
                  <span>{{ item.menuname }}</span>
                </template>
                <router-link class="list-group-item" v-for="(it, index2) in item.childMenu" :key="index2" :to="it.url">
                  <el-menu-item index2=index2>
                    <span slot="title">
                      {{ it.menuname }}
                    </span>
                  </el-menu-item>
                </router-link>

              </el-submenu> -->
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>权限管理</span>
                </template>
                <router-link class="list-group-item" to="/Role">
                  <el-menu-item index="4-1">
                    <span slot="title">
                      角色管理
                    </span>
                  </el-menu-item>
                </router-link>

              </el-submenu>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>停车场管理</span>
                </template>
                <router-link class="list-group-item" to="/parking">
                  <el-menu-item index="5-1">
                    <span slot="title">
                      车位交易
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/car">
                  <el-menu-item index="5-2">
                    <span slot="title">
                      车辆管理
                    </span>
                  </el-menu-item>
                </router-link>

                <router-link class="list-group-item" to="/parking">
                  <el-menu-item index="5-3">
                    <span slot="title">
                      管理信息
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/parkingRecord">
                  <el-menu-item index="5-4">
                    <span slot="title">
                      进出记录
                    </span>
                  </el-menu-item>
                </router-link>

              </el-submenu>



              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>费用管理</span>
                </template>
                <router-link class="list-group-item" to="/propertyCard">
                  <el-menu-item index="6-1">
                    <span slot="title">
                      物业卡管理
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/utilPrice">
                  <el-menu-item index="6-2">
                    <span slot="title">
                      单价管理
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/electricity">
                  <el-menu-item index="6-3">
                    <span slot="title">
                      电费管理
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/water">
                  <el-menu-item index="6-4">
                    <span slot="title">
                      水费管理
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/gas">
                  <el-menu-item index="6-5">
                    <span slot="title">
                      气费管理
                    </span>
                  </el-menu-item>
                </router-link>

              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      listData: [],
      localData: {},
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,

    };
  },

  // name: "index",
  // created() { this.indexLoad() },
  methods: {
    // exit() {
    //   this.$confirm('退出登录, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       setTimeout(() => {
    //         window.localStorage.clear()
    //         this.$router.push({ path: '/login' })
    //         this.$message({
    //           type: 'success',
    //           message: '已退出登录!'
    //         })
    //       }, 1000)

    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消'
    //       })
    //     })
    // }
    // ,
    // indexLoad() {
    //   this.localData = JSON.parse(window.localStorage.getItem("userdata"));
    //   this.$axios.post('http://localhost:8080/rbacMenu/findAllMenu', this.localData
    //   ).then(res => {
    //     // this.loading=false
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       this.listData = res.data.data;
    //       console.log(this.listData);
    //       this.$message({
    //         type: 'info',
    //         message: res.data.msg
    //       })

    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //     }
    //   }).catch()
    // },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

}
</script>


<style>
.log {
  /* display: grid; */
  align-items: flex-end;
  justify-items: center;
}

.el-header,
.el-footer {
  background-color: rgba(64, 158, 255, 0.8);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #D3DCE6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  line-height: 60px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.submenu {
  float: right;
}

h1 {
  /* display: inline-block;
    position: relative; */
  /* background: rgba(64, 158, 255,0.8); */
  color: white;
  text-align: center;
  padding: 0px 30px;
  height: 45px;
  line-height: 25px;
  border-radius: 10px 0px 10px 0px;
  letter-spacing: 2px;
}
</style>
