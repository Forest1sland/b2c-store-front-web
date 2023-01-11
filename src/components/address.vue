<template>
    <div id="addressadd">
        <el-dialog title="添加地址" width="400px" center :visible.sync="isAdd">
            <el-form :model="address" status-icon ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="linkman">
                    <el-input prefix-icon="el-icon-user-solid" placeholder="请输入联系人!"
                        v-model="address.linkman"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input prefix-icon="el-icon-view" type="text" placeholder="请输入练习电话"
                        v-model="address.phone"></el-input>
                </el-form-item>
                <el-form-item prop="address">
                    <el-input prefix-icon="el-icon-view" type="text" placeholder="请再输入详细地址!"
                        v-model="address.address"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="medium" type="primary" @click="save()" style="width:100%;">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import instance from '../axios/axios';

const isAdd = ref(false) // 控制注册组件是否显示
const address = reactive({
    linkname: "",
    phone: "",
    address: ""
})


const save = () => {
    // 通过element自定义表单校验规则，校验用户输入的用户信息

    //如果通过校验开始注册
    instance({
        url: '/api/user/address/save',
        data: address
    })
}
</script>

<style lang='scss' scoped>

</style>