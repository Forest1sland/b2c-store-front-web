import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = axios.create({
    baseURL: '/api',
    method: 'post'
});

instance.interceptors.response.use(function (response) {
    if (response.data.code == '200') {
        return response.data.data;
    }
    ElMessage(response.data.msg)
    return Promise.reject(error);

}, function (error) {
    if (error.response.data.status != '200') {
        ElMessage.error(error.message)
    }
    return Promise.reject(error);
});

export default instance