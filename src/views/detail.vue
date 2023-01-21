<template>

    <Head ref="head" />

    <div id="main">

        <div id="title">
            <div class="container" id="title-text">
                {{ product.data.productName }}
            </div>

        </div>
        <div id="product">
            <div id="product-box" class="container">
                <div id="pic">
                    <el-carousel trigger="click" id="carousel" height="606px">
                        <el-carousel-item v-for="(item, index) in picture.data" :key="index">
                            <img :src="item.productPicture.includes('http:') ? item.productPicture : 'http://127.0.0.1:3000/' + item.productPicture"
                                class="img">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div id="option">
                    <div id="product-name" class="product-text">
                        {{ product.data.productName }}
                    </div>
                    <div id="product-intro" class="product-text">
                        {{ product.data.productIntro }}
                    </div>
                    <div id="product-price" class="product-text">

                        {{ product.data.productPrice }}<br />
                        {{ product.data.productSellingPrice }}
                    </div>
                    <div class="line"></div>
                    <div id="price">

                        <div id="name">
                            {{ product.data.productName }}
                        </div>
                        <div id="selling-price">
                            {{ product.data.productSellingPrice }}元
                        </div>

                    </div>
                    <div id="buttons">
                        <div id="addCart">
                            <a @click="addCart">加入购物车</a>
                        </div>
                        <div id="addCollect">
                            <a @click="addCollect" v-if="isCollect">收藏</a>
                            <a @click="addCollect" v-else>取消收藏</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Head from '../components/head.vue'
import { useRoute } from 'vue-router';
import instance from '../axios/axios';
import { reactive, ref } from 'vue';
import useUserStore from '../stores/userStore';

const userStore = useUserStore()
const route = useRoute()

const product = reactive({ data: '' })
const picture = reactive({ data: '' })

const isCollect = ref(true)
const check = () => {
    instance({
        url: '/collect/check',
        data: {
            userId: userStore.userId,
            productId: route.params.productId
        }
    }).then(res => {
        if (res == 1) {
            isCollect.value = false
        } else {
            isCollect.value = true
        }
    })
}
check()
instance({
    url: '/product/detail',
    data: {
        productId: route.params.productId
    }
}).then(res => {
    product.data = res
})


instance({
    url: '/product/picture/get',
    data: {
        productId: route.params.productId
    }
}).then(res => {
    picture.data = res
    console.log(picture.data);
})

const head = ref(null);     //RefChilde 要和Son组件上的class名相同
const fnCallChild = () => {
    head.value.getCount();      //changeLogin是子组件里的方法
};

const addCart = () => {
    instance({
        url: '/cart/add',
        data: {
            userId: userStore.userId,
            productId: route.params.productId
        }
    }).then(res => {
        fnCallChild()
    })

}
const addCollect = () => {
    instance({
        url: '/collect/add',
        data: {
            userId: userStore.userId,
            productId: route.params.productId
        }
    }).then(res => {
        check()
    })


}
</script>

<style lang='scss' scoped>
#main {
    font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
}

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
    padding-bottom: 20px;
    font-size: 18px;
}

#product-box {
    display: flex;
    margin-top: 20px;
}

#carousel {
    width: 606px;
}

#option {
    margin-left: 20px;
}

.img {
    width: 100%;
}

.product-text {
    margin-top: 20px;
}

#product-name {
    font-size: 24px;

}

#product-intro {}

#product-price {}

.line {
    margin-top: 12px;
    border-bottom: 1px solid #e0e0e0;
}

#price {
    margin: 40px 0 40px 0;
    padding-bottom: 20px;
    background-color: #f9f9fa;
}

#buttons {
    display: flex;

    align-items: center;
}

#name {
    padding: 20px 0 0 20px;
}

#selling-price {
    margin: 20px 0 0 20px;
    font-size: 24px;
    color: #f25807;
}

#buttons {
    margin-top: 20px;
}

#addCart a,
#addCollect a {
    color: #fff;
    display: inline-block;
    line-height: 52px;
    margin-right: 10px;
}

#addCart a {

    background-color: #f25807;
    width: 298px;
    height: 52px;
    text-align: center;
}

#addCollect a {
    background-color: #757575;
    width: 140px;
    height: 52px;
    text-align: center;
}
</style>