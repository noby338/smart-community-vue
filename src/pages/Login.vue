<template >
    <el-container>
        <el-main class="backgroud">
            <el-row type="flex" justify="center" align="middle" style="height: 100%;">
                <el-col :span="8" class="login_box">
                    <el-form ref="loginFormRef" label-position="left" label-width="80px" :model="loginForm"
                        :rules="loginRules" class="login_form" @keyup.enter.native="enterKey">
                    <h2>登录</h2>

                        <el-form-item prop="username" label="用户名:">
                            <el-input v-model="loginForm.loginName" prefix-icon="iconfo6nt icondenglu"
                                placeholder="请输入用户名">
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password" label="密 码:">
                            <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" placeholder="请输入密码"
                                type="password">
                            </el-input>
                        </el-form-item>
                        <el-checkbox class="remember" v-model="rememberpwd">记住密码</el-checkbox>
                        <el-button type="" @click="resetLoginForm">重 置</el-button>
                        <el-button type="primary" @click="login">登 录</el-button>

                    </el-form>

                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { setCookie, getCookie, delCookie } from '../utils/util'
export default {
    data() {
        return {
        
            //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
            loginForm: {
                loginName: "",
                age: '',
        gender: '',
        id:'',
        loginName: '',
        name:'',
        password: '',
        state: '',
        tellphone:'',
        addOrEdit:'',
        token: localStorage.getItem('logintoken'),

            },
            loginRules: {
                loginName: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 2, max: 8, message: "密码为 2~8 位", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
         // 获取用户名密码
    getuserpwd() {
      if (getCookie('user') != '' && getCookie('pwd') != '') {
        this.ruleForm.loginName = getCookie('user')
        this.ruleForm.password = getCookie('pwd')
        this.rememberpwd = true
      }
    },
        resetLoginForm() {
            //重置函数方法
            this.$refs.loginFormRef.resetFields();
        },
        enterKey() {
            this.login()
        },

        login() {
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                    this.$axios.post("http://localhost:8080/login", this.loginForm).then(res => {
                        console.log(res);
                        this.logining = true
                        // jwt 登录验证
                        if (res.data.code === 200) {
                            // window.localStorage.setItem("token", res.headers.token);
                            if (this.rememberpwd) {
                //保存帐号到cookie，有效期7天
                setCookie('user', this.loginForm.loginName, 7)
                //保存密码到cookie，有效期7天
                setCookie('pwd', this.loginForm.password, 7)
              } else {
                delCookie('user')
                delCookie('pwd')
              }

              //如果请求成功就让他2秒跳转路由
              setTimeout(() => {
                this.logining = false
                // 缓存token
                localStorage.setItem('Authorization', res.data.data.token)
                // 缓存用户个人信息
                console.log(res.data.data);
                localStorage.setItem('userdata', JSON.stringify(res.data.data))
                // this.$store.commit('login', 'true')
                this.$router.push("/home");
              }, 500)
              this.logining=true;
                        } else {
                            this.logining=false,
                            this.$message.error("登录失败")
                        }
                        // session 登录验证
                        // if(resp.data.code===200) {
                        //     this.$router.push("/emp");
                        // } else {
                        //     this.$message.error("登录失败")
                        // }
                    })
                } else {
                    console.log('error submit!!');
                    // return false;
                }
            });
        },
    },
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
    border: 0
}

h2 {
    display: inline-block;
    position: relative;
    background: rgba(64, 158, 255,0.8);
    color: white;
    text-align: center;
    padding: 0px 50px;
    height: 45px;
    line-height: 45px;
    border-radius: 10px 0px 10px 0px;
    letter-spacing: 2px;
}

.login_box {
    height: 350px;
    display: grid;
    place-items: center;
    box-shadow: 0 2px 15px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    backdrop-filter: blur(4px);
    /* backdrop-filter: brightness(0.5); */
    /* backdrop-filter: contrast(0.7); */
    background-color: rgba(255, 255, 255, 0.545);
    border-radius: 10px;

}

.backgroud {
    background: url("../assets/background.jpg");
    width: 100%;
    height: 100%;
    /* height: 100vh; */
    position: fixed;
    background-size: 100% 100%;
}
</style>