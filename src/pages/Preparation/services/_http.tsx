import axios from "axios";
import { BASE_URL, getAdminProcessValues } from '../../../globals/GlobalVariables';

const axiosApi = axios.create({ baseURL: BASE_URL });

axiosApi.interceptors.request.use(async (config: any) => {
    const token = getAdminProcessValues("authToken");
    config.headers = { 'Authorization': `Bearer ${token}` };
    return config;
}, error => {  Promise.reject(error); });

export async function get(url: string, config = {}) {
    return await axiosApi.get(url, { ...config })
    .then(response => { return response.data; })
    .catch(err => { return err; });
}

export async function post(url: string, data: any, config = {}) {
    return axiosApi.post(url, { ...data }, { ...config })
    .then(response => response.data)
    .catch(err => { return err; });
}

export async function patch(url: string, data: any, config = {}) {
    return axiosApi.patch(url, { ...data }, { ...config })
    .then(response => response.data).catch(err => err)
    .catch(err => { return err; });
}

export async function put(url: string, data: any, config = {}) {
    return axiosApi.put(url, { ...data }, { ...config })
    .then(response => response.data)
    .catch(err => { return err; });
}
