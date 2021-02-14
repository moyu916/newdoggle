import axios from './axios'

export function getHomeInfo() {
    return axios.get('/index-infos')
}