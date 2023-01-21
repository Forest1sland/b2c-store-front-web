<template>

    <Head />
    <div id="main">

        <div id="title">
            <div class="container" id="title-text">
                我的订单
            </div>
        </div>

        <div class="body">

            <div class="main container">
                <div v-for="(item, index ) in orders" :key="index">
                    <el-table :data="item.detailList" style="width: 100%">

                        <el-table-column label="商品名称" width="686" center>
                            <template #default="scope">
                                <div class="item-picname">
                                    <div class="item-pic">
                                        <img :src="scope.row.productPicture.includes('http:') ? scope.row.productPicture : 'http://127.0.0.1:3000/' + scope.row.productPicture"
                                            class="img" height="80" width="80" :alt="scope.row.productName">
                                    </div>
                                    <div class="item-name">
                                        {{ scope.row.productName }}
                                    </div>

                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="productPrice" label="单价" width="180" />
                        <el-table-column prop="productNum" label="数量" width="180" />
                        <el-table-column label="小计" width="180">
                            <template #default="scope">
                                {{ scope.row.productNum * scope.row.productPrice }}
                            </template>
                        </el-table-column>


                    </el-table>
                </div>

            </div>
        </div>


    </div>

</template>

<script setup>
import instance from '../axios/axios';
import Head from '../components/head.vue'
import useUserStore from '../stores/userStore'
import { ref } from 'vue';


const userStore = useUserStore()
const orders = ref([])
instance({
    url: '/order/get',
    data: {
        userId: userStore.userId,
        currentPage: 1,
        pageSize: 10
    }
}).then(res => {
    orders.value = res
    console.log(orders);
})


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

.body {
    background-color: #f5f5f5;
    height: 2000px;
    padding-top: 38px;
}

.body::after {
    content: '';
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

.main {
    background-color: #fff;
}

.item-picname {
    display: flex;
}

.item-pic {
    display: flex;
}

.item-name {
    line-height: 80px;
    margin-left: 20px;
}
</style>