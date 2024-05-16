import axios from 'axios'

let token = sessionStorage.getItem('token')

export const axiosWithToken = axios.create({
    headers: {Authorization: `Bearer ${token}`}
})