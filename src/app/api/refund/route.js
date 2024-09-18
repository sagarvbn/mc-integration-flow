import { AUTH_TOKEN } from '@/config'
import { NextResponse } from 'next/server'
import { axiosInterceptorInstance } from '../axiosInterceptor'

export const POST = async (request) => {
  const transactionId = 'transId-refund'
  const payload = await request.json()

  let response, status
  try {
    const result = await axiosInterceptorInstance.put(
      `/order/${payload.orderId}/transaction/${transactionId}`,
      {
        apiOperation: 'REFUND',
        transaction: {
          amount: payload.amount,
          currency: payload.currency
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${AUTH_TOKEN}`
        }
      }
    )

    response = {
      data: result.data,
      is_success: true
    }
    status = 200
    console.log(`Order refunded orderId: ${payload.orderId} & transactionId: ${transactionId}`)
  } catch (error) {
    response = {
      error: error.response.data.error,
      is_success: false
    }
    status = 400
  }

  return NextResponse.json(response, { status: status })
}
