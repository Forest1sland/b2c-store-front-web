<template>

    <Head />
    <div id="main">

        <div class="container">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'all' }">全部分类</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!isAll">{{ route.params.categoryName }}</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <!-- 选择类别 -->
        <div class="category-choice" v-if="isAll">
            <div id="choice" class="container">
                <div class="category-title">
                    分类：
                </div>
                <div class="category-item" v-for="(item, index) in category" :key="index"
                    @click="toCategory(item.categoryName)">
                    {{ item.categoryName }}
                </div>
            </div>
        </div>
        <div id="result-item" class="container">
            <el-row :gutter="20">
                <el-col v-for="(item, index,) in product" :key="index" :span="6" :offset="index > 0 ? 2 : 0">
                    <el-card class="product-item" shadow="hover" @click="toDetail(item.productId)">
                        <img :src="item.productPicture.includes('http:') ? item.productPicture : 'http://127.0.0.1:3000/' + item.productPicture"
                            class="carousel-img">
                        <div style="padding: 14px">
                            <div class="card-text">
                                {{ item.productName }}
                            </div>
                            <div class="card-text">
                                原价： {{ item.productPrice }}
                            </div>
                            <div class="card-text">
                                促销价： {{ item.productSellingPrice }}
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>

</template>

<script setup>
import Head from '../components/head.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import instance from '../axios/axios';
import { ref, inject } from 'vue';
const route = useRoute()
const router = useRouter()

const reload = inject('reload')

console.log(router.currentRoute.value.name);


const isAll = ref(true)
const product = ref([])
const category = ref([])

/**
 * 获取当前router名
 */
if (router.currentRoute.value.name == 'all') {
    /**
    * 组件显示
    * 如为全部类型true不显示面包屑类别
    * 如为单独类型false显示面包屑类别
    * 
    */
    isAll.value = true
    /**
    * 获取当前类别商品
    */
    instance({
        method: 'get',
        url: '/product/getAll'
    }).then(res => {
        product.value = res
        console.log(product);
    })

    instance({
        url: '/category/all',
    }).then(res => {
        category.value = res
        console.log(category.value);
    })

} else {
    isAll.value = false
    instance({
        url: '/product/byCategory',
        data: {
            categoryName: route.params.categoryName
        }
    }).then(res => {
        product.value = res
        console.log(product);
    })

}
/**
 * 跳转页面
 * @param {*} categoryName 
 */
const toCategory = categoryName => {
    router.push({
        name: 'category',
        params: {
            categoryName: categoryName
        }
    })

}
/**
 * 跳转详情页
 */
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
.container {
    width: 1226px;
    margin: 0 auto;
}

#main {
    background-color: #f5f5f5;
    padding-top: 20px;
}

.category-choice {
    margin-top: 20px;
    background-color: #fff;
}

#choice {
    display: flex;

}

.category-title,
.category-item {
    margin: 30px 40px 30px 0;
}

.category-title {
    color: #b0b0b0;
}

.category-item {
    cursor: pointer;
}

#result-item {
    padding-top: 40px;
}

.product-item {
    text-align: center;
    margin: 5px;
    cursor: pointer;
}

.card-text {
    text-align: center;
}

img {
    height: 200px;
    width: 200px;
}

.el-col-offset-2 {
    margin-left: 0;
}

.el-card {
    border: none;
}
</style>