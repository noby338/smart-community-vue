<template >
    <el-container>
        <el-main class="backgroud">
            <el-row type="flex" justify="center" align="middle" style="height: 100%;">
                <el-col :span="8" class="login_box">
                    <el-form ref="loginFormRef" label-position="left" label-width="80px" :model="loginForm"
                        :rules="loginRules" class="login_form" @keyup.enter.native="enterKey">
                    <h2>登录</h2>

                        <el-form-item prop="username" label="用户名:">
                            <el-input v-model="loginForm.username" prefix-icon="iconfo6nt icondenglu"
                                placeholder="请输入用户名">
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password" label="密 码:">
                            <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" placeholder="请输入密码"
                                type="password">
                            </el-input>
                        </el-form-item>
                        <el-button type="" @click="resetLoginForm">重 置</el-button>
                        <el-button type="primary" @click="login">登 录</el-button>

                    </el-form>

                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            loginRules: {
                username: [
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
                    this.$axios.get("http://localhost:8080/login", {
                        params: {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        }
                    }).then(resp => {
                        // jwt 登录验证
                        if (resp.data.code === 200) {
                            // window.localStorage.setItem("token", resp.headers.token);
                            this.$router.push("/dep");
                        } else {
                            this.$message.error("请求错误")
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