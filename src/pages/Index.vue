<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="end">
        <el-col :span="18">智能社区管理系统</el-col>
        <el-col :span="3">
          <router-link class="log" to="/login">登录</router-link>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="180px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item> -->

              <el-submenu index="0">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>例子</span>
                </template>
                <router-link class="list-group-item" to="/tableExam">
                  <el-menu-item index="0-1">
                    <span slot="title">
                      统一的表格使用
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/formExam">
                  <el-menu-item index="0-2">
                    <span slot="title">
                      表单的使用
                    </span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
              <router-link class="list-group-item" to="/home">
                <el-menu-item index="1">
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">
                    首页
                  </span>
                </el-menu-item>
              </router-link>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>个人管理</span>
                </template>
                <router-link class="list-group-item" to="/emp">
                  <el-menu-item index="2-1">
                    <span slot="title">
                      信息修改
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/empAdd">
                  <el-menu-item index="2-2">
                    <span slot="title">
                      密码修改
                    </span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>房屋和住户</span>
                </template>
                <router-link class="list-group-item" to="/emp">
                  <el-menu-item index="3-1">
                    <span slot="title">
                      房屋管理
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link class="list-group-item" to="/emp">
                  <el-menu-item index="3-2">
                    <span slot="title">
                      住户管理
                    </span>
                  </el-menu-item>
                </router-link>
               
              </el-submenu>
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
  name: "index",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
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
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100px;
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
</style>
