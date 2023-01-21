<template>

    <Head />
    <div>

        <div id="title">
            <div class="container" id="title-text">
                确认订单
            </div>
        </div>
        <div id="body">
            <div id="list" class="container">
                <div id="address">
                    <div class="title">
                        收货地址
                    </div>
                    <div id="address-items">
                        <div class="address-item" :class="{ active_address: checkAddress == item.addressId }"
                            v-for="(item, index) in addresses" :key="index" @click="checkAddress = item.addressId">
                            <div class="linkman">
                                {{ item.linkman }}
                            </div>

                            <div class="phoneNumber">
                                {{ item.phoneNumber }}
                            </div>

                            <div class="address">
                                {{ item.address }}
                            </div>
                        </div>
                        <div id="addAddress" @click="add">
                            <div id="icon">
                                <svg t="1673408410824" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4708" width="40" height="40">
                                    <path
                                        d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z"
                                        fill="#e0e0e0" p-id="4709"></path>
                                </svg>
                                <div>
                                    添加新地址
                                </div>

                            </div>

                        </div>
                    </div>
                    <div id="product">
                        <div class="title">
                            商品
                        </div>
                        <div id="product-items">
                            <div class="product-item" v-for="(item, index) in products" :key="index">


                                <div class="product-item-img">
                                    <img :src="item.productPicture.includes('http:') ? item.productPicture : 'http://127.0.0.1:3000/' + item.productPicture"
                                        class="img">
                                </div>
                                <div class="product-item-title">
                                    {{ item.productName }}
                                </div>
                                <div class="product-item-price">
                                    {{ item.productPrice }} 元 x {{ item.productNum }}
                                </div>
                                <div class="product-item-total">
                                    {{ item.productPrice * item.productNum }}元
                                </div>


                            </div>
                        </div>
                    </div>

                    <div id="count">
                        <div class="bill-detail">
                            <div class="bill-value">
                                {{ count }} 件
                            </div>
                            <div class="bill-key">
                                商品件数：
                            </div>

                        </div>
                        <div class="bill-detail">
                            <div class="bill-value">
                                {{ sum }} 元
                            </div>
                            <div class="bill-key">
                                商品总价：
                            </div>
                        </div>
                        <div class="bill-detail bill-big">
                            <div class="bill-key">
                                应付总额：
                            </div>
                            <div class="bill-sum">
                                <div class="sum">
                                    {{ sum }}
                                </div>

                                元
                            </div>
                        </div>
                    </div>
                </div>
                <div id="btns">
                    <div id="buy-btn">
                        <a @click="buy">立即下单</a>
                    </div>
                    <div id="back-btn">
                        <a @click="backCart">返回购物车</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <Address v-model="isAddAddress" />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import useCartStore from '../stores/cartStore';
import Head from '../components/head.vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore';
import { ref, provide } from 'vue';
import Address from '../components/address.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const products = cartStore.orderProducts



const userStore = useUserStore()
const addresses = ref([])
const checkAddress = ref()

const getAddress = () => {
    instance({
        url: '/user/address/get',
        data: {
            userId: userStore.userId
        }
    }).then(res => {
        addresses.value = res
        if (res.length > 0) {
            checkAddress.value = res[0].addressId
        }
        console.log(checkAddress);
        isAddAddress.value = false
    })
}
getAddress()
provide("getAddress", getAddress)
const isAddAddress = ref(false)

const add = () => {
    isAddAddress.value = isAddAddress.value ? false : true
}

//总数
const count = ref(0)
//合计
const sum = ref(0)

if (products.length > 1) {
    count.value = products.reduce((prev, cur, index, arr) => {
        return prev.productNum + cur.productNum
    })
    sum.value = products.reduce((prev, cur, index, arr) => {
        return prev.productNum * prev.productPrice + cur.productNum * cur.productPrice
    })
} else if (products.length == 1) {
    count.value = products[0].productNum
    sum.value = products[0].productNum * products[0].productPrice
} else {
    count.value = 0
    sum.value = 0
}


const backCart = () => {
    router.push({
        name: 'cart'
    })
}

const buy = () => {
    instance({
        url: '/order/add',
        data: {
            userId: userStore.userId,
            addressId: checkAddress.value,
            detailList: products
        }
    })
}
</script>

<style lang='scss' scoped>
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

.container {
    width: 1226px;
    margin: 0 auto;
}

#body {
    background-color: #f5f5f5;
    height: 2000px;
    padding-top: 38px;
}

#body::after {
    #cart::after {
        content: '';
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }


}

#list {
    background-color: #fff;
    padding: 25px;

}

#address {
    padding: 30px 0 30px 0px;

}

.title {
    color: #333;
    font-size: 18px;
    line-height: 20px;
}

.address-item {
    display: inline-block;

    width: 268px;
    height: 178px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    margin-right: 17px;
    margin-bottom: 20px;
    vertical-align: top;
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
}

.linkman {
    margin: 20px 0 10px 30px;
    font-size: 18px;

}

.phoneNumber {
    margin: 20px 0 10px 30px;
}

.address {
    margin: 20px 0 10px 30px;
}

#address-items {
    margin: 20px 0 0 0;
    display: flex;
}

#addAddress {
    display: inline-block;
    text-align: center;
    width: 268px;
    height: 178px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    margin-right: 17px;
    margin-bottom: 20px;
    vertical-align: top;
    -webkit-transition: all .4s ease;
    transition: all .4s ease;

}

#addAddress:hover,
.address-item:hover {
    border-color: #b0b0b0;

    path {
        fill: #b0b0b0;
    }
}

path {
    transition: all .4s ease;
}

.active_address {
    border: 1px solid #ff6700;
}

#icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

#product-items {
    margin: 30px 0 20px 0px;
    border-bottom: 1px solid #e0e0e0;
}

.product-item {
    margin: 30px 0 16px 0;
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
}

.product-item::after {
    content: "";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

#product-items::after {
    content: "";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

.product-item-img {
    float: left;
}

.product-item-img img {
    width: 30px;
    height: 30px;
}

.product-item-title {
    padding-left: 10px;
    float: left;
    width: 650px;
}

.product-item-price {
    float: left;
    width: 150px;
    text-align: center;
}

.product-item-total {
    float: left;
    width: 290px;
    text-align: right;
    color: #ff6700;
}


.bill-detail {
    position: relative;
}

.bill-detail::after {
    content: "";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

.bill-key {
    float: right;
    right: 150px;
    position: absolute;
}

.bill-value {
    float: right;
    right: 30px;
    position: relative;
    color: #ff6700;
}

.bill-big {
    margin-top: 25px;
    position: relative;
}

.bill-sum {

    float: right;
    right: 30px;
    position: relative;
    color: #ff6700;
    position: relative;
    bottom: 22px;
}

.sum {
    font-size: 34px;
    display: inline-block;

}

#btns {
    padding-bottom: 20px;
}

#btns::after {
    content: "";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}


#back-btn a,
#buy-btn a {

    // display: inline-block;
    line-height: 38px;
    margin-right: 10px;
    text-align: center;
    width: 158px;
    height: 38px;
    float: right;
}

#buy-btn a {
    background-color: #f25807;
    color: #fff;
}

#back-btn a {
    color: #757575;
    background-color: #fff;
    border: 1px solid #757575;
}
</style>