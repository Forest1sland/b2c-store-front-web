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
                    <div id="address-title">
                        收货地址
                    </div>
                    <div id="address-items">
                        <div class="address-item" v-for="(item, index) in addresses" :key="index">
                            {{ item }}
                        </div>
                        <div id="addAddress">
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
                        <div id="product-title">
                            商品
                        </div>
                        <div id="prpduct-items">
                            <div class="product-item" v-for="(item, index) in products" :key="index">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import useCartStore from '../stores/cartStore';
import Head from '../components/head.vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore';
import { ref } from 'vue';


const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
console.log( cartStore.orderProducts);
const products = cartStore.orderProducts
console.log(products);


const userStore = useUserStore()
const addresses = ref([])
instance({
    url: '/user/address/get',
    data: {
        userId: userStore.userId
    }
}).then(res => {
    addresses.value = res
})



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

}

#address {
    padding: 30px 0 30px 27px;

}

#address-title {
    color: #333;
    font-size: 18px;

    line-height: 20px;
}

#address-item {
    height: 180px;
    float: left;

}

#address-items {
    margin: 20px 0 0 0;
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

#icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}
</style>