<template>
    <!-- head.vue组件 -->

    <Head />

    <!-- 白 -->
    <div id="up">
        <div class="container">
            <!-- 类别+轮播图 -->
            <div id="category-carousel">


                <!-- 类别 -->
                <div id="category">
                    <div class="category-item" v-for="item in category" :key="item"
                        @mouseenter="getItem(item.categoryName)">
                        <div class="category-item-title">
                            {{ item.categoryName }}
                        </div>
                        <div class="arrow">
                            <svg t="1671948944647" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4465" width="14" height="14">
                                <path
                                    d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z"
                                    fill="#e0e0e0" p-id="4466"></path>
                            </svg>
                        </div>
                    </div>
                    <!-- 类别hover -->
                    <div id="category-hover">
                        <el-row>
                            <el-col v-for="(o, index) in item" :key="o" :span="6" :offset="index > 0 ? 2 : 0">
                                <el-card :body-style="{ height: '76px', padding: '0' }" shadow="never">
                                    <div class="item" @click="toDetail(o.productId)">
                                        <img :src="o.productPicture.includes('http:') ? o.productPicture : 'http://127.0.0.1:3000/' + o.productPicture"
                                            class="category-img">
                                        {{ o.productName }}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 轮播图 -->
                <div id="carousel">
                    <a-carousel effect="fade" autoplay arrows>
                        <template #prevArrow>
                            <div class="custom-slick-arrow" style="left: 240px;">
                                <svg t="1672108477789" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2275" width="40" height="40">
                                    <path
                                        d="M316.28 514.711L699.53 131.46c17.574-17.573 17.574-46.066 0-63.64-17.573-17.573-46.066-17.573-63.64 0L189 514.712l446.891 446.892c17.574 17.573 46.067 17.573 63.64 0 17.574-17.574 17.574-46.066 0-63.64L316.28 514.711z"
                                        fill="#f5f5f5" p-id="2276"></path>
                                </svg>
                            </div>
                        </template>
                        <template #nextArrow>
                            <div class="custom-slick-arrow" style="right: 14px">
                                <svg t="1672108559058" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2633" width="40" height="40">
                                    <path
                                        d="M766.504 515.072L383.252 131.82c-17.574-17.574-17.574-46.066 0-63.64 17.573-17.573 46.066-17.573 63.64 0l446.891 446.892-446.892 446.891c-17.573 17.574-46.066 17.574-63.64 0-17.573-17.573-17.573-46.066 0-63.64l383.253-383.251z"
                                        fill="#f5f5f5" p-id="2634"></path>
                                </svg>
                            </div>
                        </template>
                        <div class="carousel-item" v-for="(item, index) in carousel" :key="index"
                            @click="toDetail(item.productId)">
                            <img :src="item.imgPath.includes('http:') ? item.imgPath : 'http://127.0.0.1:3000/' + item.imgPath"
                                class="carousel-img">
                        </div>
                    </a-carousel>



                </div>
            </div>
        </div>
    </div>
    <!-- 黑 -->



    <div id="down">
        <div class="container">
            <!-- 分类 -->
            <div id="page-main" v-for="( item, index)  in categorySlice" :key="index">
                <!-- 每个分类 -->
                <div class="brick">
                    <div class="title">
                        {{ item.categoryName }}
                    </div>
                    <div class="more" @click="toCategory(item.categoryName)">
                        查看更多
                        <svg t="1671871407810" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4250" width="20" height="20">
                            <path
                                d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m200.746667-478.506667l1.749333-1.664 30.165333-30.165333-330.496-330.581333a42.837333 42.837333 0 0 0-60.288 0 42.538667 42.538667 0 0 0 0 60.330666l270.08 270.165334-270.08 269.952a42.496 42.496 0 0 0 0 60.288c16.64 16.64 43.861333 16.469333 60.288 0.042666l298.581334-298.368z"
                                fill="#b0b0b0" p-id="4251"></path>
                        </svg>
                    </div>
                    <!-- 分类中的单独商品 -->
                    <div class="row">
                        <el-row :gutter="0">
                            <el-col v-for="(item, index) in products[index]" :key="index" :span="6"
                                :offset="index > 0 ? 2 : 0">
                                <el-card shadow="hover" class="product-item" @click="toDetail(item.productId)">
                                    <img :src="item.productPicture.includes('http:') ? item.productPicture : 'http://127.0.0.1:3000/' + item.productPicture"
                                        class="img">
                                    <div style="padding: 14px">
                                        <div class="card-text">
                                            <span>{{ item.productName }}</span>
                                        </div>
                                        <div class="card-text">
                                            <span>{{ item.productIntro }}</span>
                                        </div>
                                        <div class="card-text">
                                            {{ item.productPrice }}
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>


                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import Head from '../components/head.vue'
import instance from '../axios/axios'
import { reactive, ref } from 'vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter()

/**
 * 获取轮播图资源，类别资源，静态图片，商品资源
 */
const carousel = ref([])
instance({
    url: '/carousel/get',
}).then(res => {
    carousel.value = res
    console.log(carousel.value);

});

const category = ref([])
const categorySlice = ref([])
const products = ref([])
instance({
    url: '/category/all',
}).then(res => {
    category.value = res
    console.log(category.value);
    categorySlice.value = category.value.slice(0, 2);
    for (let i = 0; i < 2; i++) {
        instance({
            url: '/product/byCategory',
            data: {
                categoryName: res[i].categoryName
            }
        }).then(res => {
            products.value[i] = res.slice(0, 4)

            console.log(products);
        })
    }



})

const item = ref([])
const getItem = categoryName => {
    instance({
        url: '/product/byCategory',
        data: {
            categoryName: categoryName
        }
    }).then(res => {
        item.value = res
        console.log(res);
    })
}


const toCategory = categoryName => {
    router.push({
        name: 'category',
        params: {
            categoryName: categoryName
        }
    })
}
const toDetail = productId => {
    router.push({
        name: 'detail',
        params: {
            productId: productId
        }
    })
}
</script>
<style lang='scss' scoped>
#up {
    margin-bottom: 20px;
}

.container {
    width: 1226px;
    margin: 0 auto;
}

#category-carousel {

    height: 460px;

}

#category {
    width: 234px;
    background: rgba(105, 101, 101, .6);
    height: 460px;
    position: absolute;
    padding: 20px 0 20px 0;
    z-index: 2;
}

.category-item {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.category-item:hover~#category-hover {
    display: inline-block;
}

.category-item-title {
    margin-left: 30px;
    color: #fff;
}

#category-hover {
    display: none;
    width: 992px;
    left: 234px;
    height: 460px;
    position: absolute;
    background-color: #fff;
    z-index: 2;
    top: 0;
}

#category-hover:hover {
    display: block;
}

.item {
    height: 76px;
    padding: 14px;
    cursor: pointer;
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
}

.item:hover {
    color: #ff6700;
}

.category-img {
    width: 52px;
    height: 52px;

}

.carousel-img {
    width: 1226px;
    height: 460px;


}

.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 460px;
    line-height: 460px;
    background: #364d79;
    overflow: hidden;
}



.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    z-index: 1;

}

.ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
}

.ant-carousel :deep(.custom-slick-arrow) {
    transition-property: background;
    transition-duration: .25s, 1s;
    width: 40px;
    height: 40px;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
    background: rgba(105, 101, 101, .6);
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}

.ant-carousel .slick-dots {
    margin-right: 0;
}

.arrow {
    margin-right: 10px;
}



#carousel {
    position: absolute;
    width: 1226px;
}

.carousel-item {
    cursor: pointer;
}

#down {
    background-color: #f5f5f5;
    height: auto;
}

#down::after {

    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

.title {
    margin: 20px 0 10px 0;

    font-size: 20px;
    float: left;
}

.product-item {
    text-align: center;
    margin: 10px;
    cursor: pointer;
}

.more {
    float: right;
    cursor: pointer;
    margin: 25px 0 15px 0;
    font-size: 16px;
    transition: all .4s;

    svg {
        top: 4px;
        position: relative;
    }

    path {
        transition: all .4s;


    }
}

.more:hover {
    color: #ff6700;

    path {
        fill: #ff6700
    }
}

.row {
    width: 100%;
    float: left;
}

.card-text {
    text-align: center;
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;

}

img {
    width: 100%;
}

.el-col-offset-2 {
    margin-left: 0;
}

.el-card {
    border: none;
}
</style>