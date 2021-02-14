import axios from './axios'

// 创建订单
export function createOrder(params) {
    return axios.post('/saveOrder',params)
}

// 支付接口
export function payOrder(params) {
    return axios.get('/paySuccess', { params })
}

// 获取订单列表
export function getOrderList(params) {
    return axios.get('/order', { params });
}



