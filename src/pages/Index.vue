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
      <el-aside width="180px" >
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="" v-for="(item,index) in listData" :key="index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index=index v-if="item.childMenu.length!=0">
                <template slot="title" >
                  <i class="el-icon-user"></i>
                  <span>{{item.menuname}}</span>
                </template>
                 <router-link class="list-group-item" 
                 v-for="(it,index2) in item.childMenu" :key="index2" :to="it.url">
                  <el-menu-item index2=index2>
                    <span slot="title">
                      {{it.menuname}}
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
            listData:[],
            localData:{},
            //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
            
        };
    },

  name: "index",
  created(){this.indexLoad()},
  methods: {
    indexLoad(){
        
    
this.localData= JSON.parse(window.localStorage.getItem("userdata"));

this.$axios.post('http://localhost:8080/rbacMenu/findAllMenu',this.localData
      ).then(res=>{
        // this.loading=false
        console.log(res);
        if(res.data.code==200){
             this.listData = res.data.data;
           console.log(this.listData);
           this.$message({
              type: 'info',
              message: res.data.msg
            })
           
        }else{
             this.$message({
              type: 'error',
              message: res.data.msg
            })
        }
      }).catch()
    },
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
