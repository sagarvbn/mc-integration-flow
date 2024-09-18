import { AUTH_TOKEN, HOSTED_URL, MERCHANT_NAME } from '@/config'
import { NextResponse } from 'next/server'
import { axiosInterceptorInstance } from '../../axiosInterceptor'

export const POST = async (request) => {
  const payload = await request.json()
  
  let response, status
  try {
    const result = await axiosInterceptorInstance.post(
      `/session`,
      {
        apiOperation: 'INITIATE_CHECKOUT',
        interaction: {
          operation: 'PURCHASE',
          cancelUrl: `${HOSTED_URL}/hosted/cart`,
          // returnUrl: `${HOSTED_URL}/`,
          merchant: {
            name: `${MERCHANT_NAME}`,
            url: 'https://payrx-uat.bajajfinservhealth.in'
          },
          displayControl: {
            billingAddress: 'HIDE'
          }
        },
        order: {
          amount: payload.amount,
          currency: payload.currency,
          id: payload.orderId,
          description: payload.orderDescription
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${AUTH_TOKEN}`
        }
      }
    )

    console.log(' ---- INITIATE CHECKOUT ---')
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
