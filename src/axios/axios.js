import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

const instance = axios.create({
    baseURL: '/api',
    method: 'post'
});

instance.interceptors.response.use((response, error) => {
    if (response.data.code == '200') {
        ElMessage(response.data.msg)
        return response.data.data;

    } else {

        return Promise.reject(error);
    }


}, error => {
    if (error.response.data.status != '200') {
        ElMessage.error(error.message)
    }
    return Promise.reject(error);
});

export default instance