<template>
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
                    message: '注册成功！',
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