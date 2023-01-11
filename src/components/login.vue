<template>
    <el-dialog title="登录" width="300px" center>

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
</template>

<script setup>

import { ref, reactive } from 'vue';
import { User, View } from '@element-plus/icons-vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

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
                userStore.setLoginState(true)
                //用户id
                userStore.setUserId(res)
                //隐藏登录页面
                isLogin.value = false
                //弹窗
                ElMessage({
                    message: '登录成功！',
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

</style>