import { AUTH_TOKEN, PG_BASE_URL } from '@/config'
import axios from 'axios'
import { axiosInterceptorInstance } from '../../axiosInterceptor'

// --- Check PG Connection
export const checkPGConnection = async () => {
  try {
    const response = await axios.get(`${PG_BASE_URL}/information`)
    return response.data
  } catch (error) {
    return error
  }
}

// --- Authorise transaction
export const authoriseTransaction = async (payload) => {
  const transactionId = 'transId-authorise'

  let response

  try {
    const result = await axiosInterceptorInstance.put(
      `/order/${payload.orderId}/transaction/${transactionId}`,
      {
        apiOperation: 'AUTHORIZE',
        order: {
          amount: payload.authAmount || payload.orderAmount || payload.amount,
          currency: payload.currency
        },
        sourceOfFunds: {
          provided: {
            card: {
              number: payload.paymentDetails?.card?.number,
              securityCode: payload.paymentDetails?.card?.securityCode,
              expiry: {
                month: payload.paymentDetails?.card?.expiry?.month,
                year: payload.paymentDetails?.card?.expiry?.year
              },
              storedOnFile: payload.paymentDetails?.card?.storedOnFile
            }
          },
          type: 'CARD'
        },
        transaction: {
          source: 'INTERNET'
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
  } catch (error) {
    response = {
      error: error.response.data.error,
      is_success: false
    }
  }
  return response
}

// --- Capture Transaction
export const captureTransaction = async (payload) => {
  const transactionId = 'transId-capture'

  let response

  try {
    const result = await axiosInterceptorInstance.put(
      `/order/${payload.orderId}/transaction/${transactionId}`,
      {
        apiOperation: 'CAPTURE',
        transaction: {
          amount: payload.orderAmount || payload.amount,
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
  } catch (error) {
    response = {
      error: error.response.data.error,
      is_success: false
    }
  }

  return response
}
