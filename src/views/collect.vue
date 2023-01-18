<template>

    <Head />
    <div id="main">

        <div id="title">
            <div class="container" id="title-text">
                我的收藏
            </div>
        </div>
        <div class="body container">
            <div class="row">
                <el-row :gutter="0">
                    <el-col v-for="(item, index) in products" :key="index" :span="6" :offset="index > 0 ? 2 : 0">
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
            <div class="page">
                <el-pagination background layout="prev, pager, next" :total="1000" center />
            </div>

        </div>

    </div>
</template>

<script setup>
import Head from '../components/head.vue'
import instance from '../axios/axios';
import useUserStore from '../stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const products = ref([])
instance({
    url: '/collect/get',
    data: {
        userId: userStore.userId
    }
}).then(res => {
    products.value = res
})


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

.row {
    margin-top: 30px;
    margin-bottom: 20px;
}

.page {
    display: flex;
    justify-content: center;

}
</style>