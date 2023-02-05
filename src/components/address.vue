<template>
    <el-dialog title="添加地址" width="400px" center v-model="isAdd">
        <el-form :model="address" status-icon ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="linkman">
                <el-input :prefix-icon="User" placeholder="请输入联系人!" v-model="address.linkman"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input :prefix-icon="View" type="text" placeholder="请输入练习电话"
                    v-model="address.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item prop="address">
                <el-input :prefix-icon="View" type="text" placeholder="请再输入详细地址!" v-model="address.address"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save()" style="width:100%;">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>

<script setup>
import { reactive, ref, inject, defineExpose } from 'vue';
import instance from '../axios/axios';
import { User, View } from '@element-plus/icons-vue'
import useUserStore from '../stores/userStore';


const getAddress = inject("getAddress")
const userStore = useUserStore()
const isAdd = ref(false) // 控制注册组件是否显示
const address = reactive({
    linkman: "",
    phoneNumber: "",
    address: "",
    userId: userStore.userId
})
const add = () => {
    isAddAddress.value = isAddAddress.value ? false : true

}

const save = () => {
    // 通过element自定义表单校验规则，校验用户输入的用户信息

    //如果通过校验开始注册
    instance({
        url: '/user/address/add',
        data: address
    }).then(res => {
        getAddress()
    })
}

defineExpose({
    add
})
</script>

<style lang='scss' scoped>

</style>