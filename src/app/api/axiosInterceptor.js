import { MERCHANT_ID, PG_BASE_URL } from '@/config'
import axios from 'axios'

export const axiosInterceptorInstance = axios.create({
  baseURL: `${PG_BASE_URL}/merchant/${MERCHANT_ID}`
})
