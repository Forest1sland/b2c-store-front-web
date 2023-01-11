<template>

    <Head ref="head" />
    <div id="main">

        <div id="title">
            <div class="container" id="title-text">
                我的购物车
            </div>
        </div>
        <div class="container" id="blank" v-if="!userStore.loginState">
            <h1>您的购物车还是空的！</h1>
            <h3>
                登录后将显示您之前加入的商品
            </h3>
            <div class="btns">
                <div id="loginBtn">
                    <a @click="fnCallChild">立即登录</a>
                </div>
                <div id="buyBtn">
                    <a @click="toAll">马上去购物</a>
                </div>
            </div>

        </div>
        <div id="cart" v-else>
            <div class="container" id="list">

                <el-table ref="multipleTableRef" :data="products.data" style="width: 100%"
                    :header-row-style="{ height: '70px' }" @selection-change="handleSelectionChange"
                    :row-style="{ height: '117px' }" size="large">
                    <el-table-column type="selection" width="110" />
                    <el-table-column width="120">
                        <template #default="scope">
                            <img :src="scope.row.productImg.includes('http:') ? scope.row.productImg : 'http://127.0.0.1:3000/' + scope.row.productImg"
                                class="img" height="80" width="80" :alt="scope.row.productName">
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" width="380">
                        <template #default="scope">{{ scope.row.productName }}</template>
                    </el-table-column>
                    <el-table-column property="price" label="单价" width="120">
                        <template #default="scope">{{ scope.row.price }}元</template>
                    </el-table-column>
                    <el-table-column label="数量" width="180" align="center">
                        <template #default="scope">
                            <div class="change-goods-num ">
                                <a @click="if (scope.row.num + 1 > scope.row.maxNum) {
                                    scope.row.num = scope.row.maxNum
                                } else {
                                    scope.row.num++
                                    changeNum(scope.row.productId, scope.row.num)
                                }; ">
                                    <svg t="1673346738719" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2690" width="15" height="15">
                                        <path
                                            d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
                                            fill="#444444" p-id="2691"></path>
                                    </svg>
                                </a>
                                <input type="text" autocomplete="off" class="goods-num" v-model="scope.row.num" @change="if (scope.row.num > scope.row.maxNum) {
                                    scope.row.num = scope.row.maxNum
                                } else if (scope.row.num < 1) { scope.row.num = 1 } else {
                                    changeNum(scope.row.productId, scope.row.num)
                                };">
                                <a @click="if (scope.row.num - 1 < 1) { scope.row.num = 1 } else {
                                    scope.row.num--
                                    changeNum(scope.row.productId, scope.row.num)
                                }; ">
                                    <svg t="1673346768608" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3737" width="15" height="15">
                                        <path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#444444"
                                            p-id="3738"></path>
                                    </svg>
                                </a>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column label="小计" width="200" align="center">
                        <template #default="scope">{{ scope.row.price * scope.row.num }}元</template>
                    </el-table-column>
                    <el-table-column property="address" label="操作" width="100" align="center">
                        x
                    </el-table-column>

                </el-table>
                <div class="cart-bar">
                    <div class="continue" @click="toAll">
                        继续购物
                    </div>
                    <div class="shu">
                        |
                    </div>
                    <div class="count">
                        已选择 {{ count }} 件
                    </div>

                    <div class="btn" @click="toConfirmOrder">
                        去结算
                    </div>
                    <div class="sum">
                        合计：{{ sum }}元
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import Head from '../components/head.vue'


import { ref, reactive, watch, computed } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore';
import Login from '../components/login.vue';
import { useRouter, useRoute } from 'vue-router';
import useCartStore from '../stores/cartStore'
const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const products = reactive({ data: [] })


/**
 * 根据登录状态是否获取数据
 */
if (userStore.loginState) {
    instance({
        url: '/cart/get',
        data: {
            userId: userStore.userId
        }
    }).then(res => {
        products.data = res
        console.log(res);
    })
}


const multipleTableRef = ref()
const multipleSelection = ref([])
//总数
const count = ref(0)
//合计
const sum = ref(0)
const handleSelectionChange = (val) => {
    multipleSelection.value = val
    if (val.length > 1) {
        count.value = multipleSelection.value.reduce((prev, cur, index, arr) => {
            return prev.num + cur.num
        })
        sum.value = multipleSelection.value.reduce((prev, cur, index, arr) => {
            return prev.num * prev.price + cur.num * cur.price
        })
    } else if (val.length == 1) {
        count.value = val[0].num
        sum.value = val[0].num * val[0].price
    } else {
        count.value = 0
        sum.value = 0
    }

}

const head = ref(null);     //RefChilde 要和Son组件上的class名相同
const fnCallChild = () => {
    head.value.changeLogin();      //changeLogin是子组件里的方法
};

const toAll = () => {
    router.push({
        name: 'all'
    })
}

const changeNum = (productId, num) => {
    console.log(productId, num)

    instance({
        url: '/cart/update',
        data: {
            userId: userStore.userId,
            productId: productId,
            num: num,
        }
    }).then(res => {
        // ElMessage(res)
    })

}
const cartStore = useCartStore()
const toConfirmOrder = () => {
    if (count.value > 0) {
        // cartStore.orderProducts = multipleSelection.value
        cartStore.setOrderProducts(multipleSelection.value)
        router.push({
            name: 'confirmOrder'

        })
    }
}



// watch(() => [...products.data], (newProducts, products) => {
//     console.log(newProducts, products);
//     instance({
//         url: '/cart/update',
//         data: {
//             userId: userStore.userId,
//             productId: productId,
//             num: num
//         }
//     }).then(res => {

//     })
// }, { deep: true })


</script>

<style lang='scss' scoped>
.container {
    width: 1226px;
    margin: 0 auto;
}

#title {

    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    ;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .07);
}

#title-text {
    padding-top: 20px;
    padding-bottom: 24px;
    font-size: 28px;
}

#cart {
    background-color: #f5f5f5;
    height: 2000px;
    padding-top: 38px;
}

#cart::after {
    content: '';
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

#blank {
    margin-top: 30px;
    text-align: center;
}

.btns {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.btns div {

    width: 170px;
}

#loginBtn a,
#buyBtn a {
    color: #fff;
    display: inline-block;
    line-height: 48px;
    margin-right: 10px;
    border: 1px solid #f25807;
}

#loginBtn a {

    background-color: #f25807;
    width: 170px;
    height: 48px;
    text-align: center;
}

#buyBtn a {
    background-color: #f5f5f5;
    width: 170px;
    height: 48px;
    text-align: center;
    color: #f25807;
}

#list-head {
    height: 70px;
    background-color: #fff;
}

.col {
    float: left;
    display: block;
    text-align: center;
    line-height: 70px;
}

.col-check {
    width: 110px;
}

.col-img {
    width: 120px;
}

.col-name {
    width: 380px;
    text-align: left;
}

.col-price {
    width: 140px;
}

.col-num {
    width: 150px;
}

.change-goods-num {
    width: 150px;
    height: 38px;
    border: 1px solid #e0e0e0;
    text-align: center;
    background-color: #fff;
    position: relative;
    zoom: 1;
}

.change-goods-num a {
    float: left;
    width: 38px;
    height: 38px;
    line-height: 35px;
    color: #757575;
    font-size: 20px;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.change-goods-num a:hover {
    background-color: #e0e0e0;
}

.goods-num {
    float: left;
    width: 72px;
    height: 36px;
    line-height: 36px;
    padding: 0;
    border-width: 0;
    color: #424242;
    font-size: 16px;
    text-align: center;
    border: none;
    outline: none;
}

.col-total {
    width: 120px;
}

.col-action {
    width: 80px;
}

.cart-bar {
    margin-top: 30px;
    height: 50px;

    background-color: #fff;
    -webkit-transition: background .3s ease, top .3s ease;
    transition: background .3s ease, top .3s ease;
    position: sticky;
    bottom: 0px;
    z-index: 10;
}

.continue {
    float: left;
    line-height: 48px;
    margin: 0 20px 0 20px;
    color: #757575;
    transition: color .3s;
    cursor: pointer;
}

.continue:hover {
    color: #ff6700;
}

.shu {
    float: left;
    line-height: 48px;
    color: #757575;
}

.count {
    float: left;
    line-height: 48px;
    margin: 0 20px 0 20px;
    color: #757575;
}

.sum {
    float: right;
    line-height: 48px;
    color: #ff6700;
}

.btn {
    width: 200px;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    margin-left: 50px;
    vertical-align: top;
    background: #ff6700;
    border-color: #ff6700;
    color: #fff;
    float: right;
    text-align: center;
    cursor: pointer;
}
</style>