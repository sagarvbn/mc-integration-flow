import { NextResponse } from 'next/server'
import { checkPGConnection, authoriseTransaction, captureTransaction } from './mpgs-direct'

const TRANSACTION_CAPTURE_SUCCESS_STATUS = ['CAPTURED', 'PARTIALLY_CAPTURED']

export const POST = async (request) => {
  const payload = await request.json()

  let response, status

  try {
    // -- Check PG Connection
    const pgConnection = await checkPGConnection()
    if (pgConnection.status !== 'OPERATING') {
      const errorObj = {
        error: `MPGS not responding!`,
        explanation: `Connection Status: ${pgConnection.status}`
      }
      console.log(errorObj)
      throw errorObj
    }
    console.log(' ---- PG Connection Working! ----')

    // -- Authorise transaction
    const transactionAuthorisation = await authoriseTransaction(payload)
    if (
      !transactionAuthorisation?.is_success ||
      transactionAuthorisation?.data?.order?.status !== 'AUTHORIZED'
    ) {
      const errorObj = {
        error: 'Transaction Authorisation Failed!',
        ...(transactionAuthorisation.error || {})
      }
      console.log(errorObj)
      throw errorObj
    }
    console.log(' ---- Transaction Authorised! ----')

    // -- Capture Transaction
    const transactionCapture = await captureTransaction(payload)
    if (
      !transactionCapture?.is_success ||
      !TRANSACTION_CAPTURE_SUCCESS_STATUS.includes(transactionCapture?.data?.order?.status)
    ) {
      const errorObj = {
        error: 'Transaction Capture Failed!',
        ...(transactionCapture.error || {})
      }
      console.log(errorObj)
      throw errorObj
    }
    console.log(' ---- Transaction Captured! ----')

    response = transactionCapture
    status = 200
  } catch (error) {
    response = {
      error: error.error,
      cause: error.cause || '',
      message: error.explanation || ''
    }
    status = 400
  }

  return NextResponse.json(response, { status: status })
}
