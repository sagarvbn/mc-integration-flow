import { AUTH_TOKEN } from '@/config'
import { NextResponse } from 'next/server'
import { axiosInterceptorInstance } from '../axiosInterceptor'

export const GET = async (request) => {
  const orderId = request.nextUrl.searchParams.get('orderId')

  let response, status
  try {
    const result = await axiosInterceptorInstance.get(`/order/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${AUTH_TOKEN}`
      }
    })

    response = {
      data: result.data,
      is_success: true
    }
    status = 200
  } catch (error) {
    response = {
      error: error.response.data.error,
      is_success: false
    }
    status = 400
  }

  return NextResponse.json(response, { status: status })
}
