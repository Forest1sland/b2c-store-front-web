<template>
    <div id="head">
        <div class="container">
            <div id="left">
                <div>
                    <router-link to="/">商城首页</router-link>
                </div>
            </div>
            <div id="right">

                <div id="btns">
                    <a @click="changeLogin">登录 </a>
                    <span>|</span>
                    <a @click="changeRegister"> 注册</a>
                </div>

                <div id="cartCenter">
                    <div id="cart">
                        <svg t="1671768704396" class="icon" viewBox="0 0 1028 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2734" width="18" height="16">
                            <path
                                d="M332.8 790.528q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM758.784 792.576q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM930.816 210.944q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.84t-38.4 14.336l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-12.288l103.424 0q20.48 0 32.768 6.144t19.456 15.36 10.24 18.944 5.12 16.896q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM892.928 302.08l-641.024-2.048 35.84 185.344 535.552 1.024z"
                                p-id="2735" fill="#b0b0b0"></path>
                        </svg>
                        <span> 购物车 (0)</span>

                    </div>

                </div>
            </div>

        </div>


    </div>
    <!-- logo+搜索框 -->
    <div id="logoSearch" class="container">
        <!-- logo -->
        <div id="logo">
            <img src="../assets/head.jpg">
        </div>
        <!-- 类别下拉 -->
        <div>

        </div>
        <!-- 搜索框 -->
        <div id="search">
            <input type="text">
            <button>
                <svg t="1671850201508" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3227" width="30" height="30">
                    <path
                        d="M800.325189 757.224937l-74.466018-74.466018a276.037189 276.037189 0 1 0-41.550414 51.956468l69.281441 69.262991a33.210811 33.210811 0 0 0 46.734991 0 33.210811 33.210811 0 0 0 0-46.753441z m-309.118847 0.664216A220.058523 220.058523 0 1 1 711.264865 537.830631a220.058523 220.058523 0 0 1-220.058523 220.058522z"
                        p-id="3228" fill="#616161"></path>
                </svg>
            </button>
        </div>

    </div>
    <el-dialog title="登录" width="300px" center v-model="isLogin">

        <el-form ref="ruleForm" :model="LoginUser" status-icon :rules="LoginRules">
            <el-form-item prop="userName">
                <el-input :prefix-icon="User" placeholder="请输入账号" v-model="LoginUser.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="View" placeholder="请输入密码" v-model="LoginUser.password" type="password"
                    autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="Login(ruleForm)" style="width:100%;">登录</el-button>

            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog title="注册" width="300px" center v-model="isRegister">
        <el-form :model="RegisterUser" :rules="RegisterRules" status-icon ref="ruleForm">
            <el-form-item prop="userName">
                <el-input :prefix-icon="User" placeholder="请输入账号" v-model="RegisterUser.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="View" type="password" placeholder="请输入密码"
                    v-model="RegisterUser.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input :prefix-icon="View" type="password" placeholder="请再次输入密码"
                    v-model="RegisterUser.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item prop="userPhoneNumber">
                <el-input :prefix-icon="View" placeholder="请输入手机号" v-model="RegisterUser.userPhoneNumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Register(ruleForm)" style="width:100%;">注册</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>





</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, View } from '@element-plus/icons-vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore'
import { ElMessage } from 'element-plus';

const userStore = useUserStore()



/**
 * 登录
 */

const isLogin = ref(false)
const changeLogin = () => {
    isLogin.value = isLogin.value ? false : true
}
const LoginUser = reactive({
    userName: '',
    password: ''
})

const ruleForm = ref()
let validateUserName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入用户名"));
    }
    // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
    const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (userNameRule.test(value)) {
        return callback();
    } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
    }
};
// 密码的校验方法
let validatePassword = (rule, value, callback) => {
    if (value === "") {
        return callback(new Error("请输入密码"));
    }
    // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
    const passwordRule = /^[a-zA-Z]\w{5,17}$/;
    if (passwordRule.test(value)) {
        return callback();
    } else {
        return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
    }
};


const LoginRules = {
    userName: [{ validator: validateUserName, trigger: "blur" }],
    password: [{ validator: validatePassword, trigger: "blur" }],

}


const Login = formEl => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            instance({
                url: '/user/login',
                data: {
                    userName: LoginUser.userName,
                    password: LoginUser.password
                }
            }).then(res => {
                //登录状态
                userStore.loginState = true
                //用户id
                userStore.userId = res
                //隐藏登录页面
                isLogin.value = false
                //弹窗
                ElMessage({
                    message:'登录成功！',
                    type: 'success',
                })
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

/**
 * 注册
 */
const isRegister = ref(false)
const changeRegister = () => {
    isRegister.value = isRegister.value ? false : true
}
const RegisterUser = reactive({
    userName: '',
    password: '',
    confirmPassword: '',
    userPhoneNumber: ''
})


let validateConfirmPassword = (rule, value, callback) => {
    if (value === "") {
        return callback(new Error("请输入确认密码"));
    }
    // 校验是否以密码一致
    if (RegisterUser.password != "" && value === RegisterUser.password) {
        return callback();
    } else {
        return callback(new Error("两次输入的密码不一致"));
    }
};
//手机号校验规则
let validatePhoneNumber = (rule, value, callback) => {
    if (value === "") {
        return callback(new Error("请输入手机号"));
    }

    const phoneNumberRule = /^\d{11}$/;
    if (phoneNumberRule.test(value)) {
        return callback();
    } else {
        return callback(
            new Error("手机号格式不正确")
        );
    }
};

const RegisterRules = {
    userName: [{ validator: validateUserName, trigger: "blur" }],
    password: [{ validator: validatePassword, trigger: "blur" }],
    confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],
    userphoneNumber: [{ validator: validatePhoneNumber, trigger: 'blur' }]
}


const Register = formEl => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            instance({
                url: '/user/register',
                data: {
                    userName: RegisterUser.userName,
                    password: RegisterUser.password,
                    userphoneNumber: RegisterUser.userPhoneNumber
                }
            }).then(res => {
                //弹窗
                ElMessage({
                    message:'注册成功！',
                    type: 'success',
                })
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}









</script>

<style lang='scss' scoped>
div {
    font-size: 12px;
}

#head {
    background-color: #333;
    height: 40px;
}

.container {
    height: 100%;
    width: 1226px;
    margin: 0 auto;

}

#left,
#right {
    display: flex;
    align-items: center;
    height: 100%;
}

#left {
    float: left;
}

#right {
    float: right;
}



#cartCenter {
    width: 120px;
    align-items: center;
    background-color: #424242;
    height: 100%;
    margin-left: 20px;
    cursor: pointer;
    color: #b0b0b0;
    display: flex;
    justify-content: center;

}

#cart {
    text-align: center;
    height: 18px;
    display: flex;
}

#logoSearch {
    position: relative;
    height: 100px;
}

#logo {
    margin-top: 12px;
    width: 80px;
    float: left;
}

#search {
    border: 1px solid #e0e0e0;
    height: 50px;
    width: 300px;
    float: right;
    margin-top: 20px;
    position: relative;
}

input {
    height: 48px;
    position: relative;
    border: 0px;
    outline: 0px;
    margin-left: 12px;
    font-size: 13px;
    width: 234px;
}

#search button {
    border: none;
    border-left: 1px solid #e0e0e0;
    height: 48px;
    background-color: #fff;
    float: right;
    width: 50px;
    cursor: pointer;
}

img {
    width: 70px;
    height: 70px;
}


a {
    text-decoration: none;
    color: #b0b0b0;
}

a:hover {
    color: #fff;
}
</style>

