<template>
    <div id="head">
        <div class="container">
            <div id="left">
                <div>
                    <router-link to="/">商城首页</router-link>
                </div>
            </div>
            <div id="right">

                <div id="btns" v-if="!userStore.loginState">
                    <a @click="changeLogin">登录 </a>
                    <span>|</span>
                    <a @click="changeRegister"> 注册</a>
                </div>

                <div v-if="userStore.loginState">
                    <a @click="toOrder"> 我的订单 </a>
                    <span>|</span>
                    <a @click="toCollect">查看收藏</a>
                </div>

                <div id="cartCenter" @click="toCart">
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
    <Login v-model="isLogin" />
    <Register v-model="isRegister" />







</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, View } from '@element-plus/icons-vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Login from './login.vue';
import Register from './register.vue';

const userStore = useUserStore()



const isLogin = ref(false)
const changeLogin = () => {
    isLogin.value = isLogin.value ? false : true
}

const isRegister = ref(false)
const changeRegister = () => {
    isRegister.value = isRegister.value ? false : true
}
/**
 * 暴露给父组件调用登录窗口
 */
defineExpose({
    changeLogin
})


const router = useRouter()

const toOrder = () => {
    router.push({
        name: 'order'
    })
}
const toCollect = () => {
    router.push({
        name: 'collect'
    })
}
const toCart = () => {
    if (userStore.loginState) {
        router.push({
            name: 'cart'
        })
    } else {
        ElMessage({
            message: '请先登录。',
            type:
                'error'
        })
    }

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

