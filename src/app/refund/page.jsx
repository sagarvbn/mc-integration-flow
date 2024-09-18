'use client'

import { getOrderTransaction, refundPayment } from '@/api-requests'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RefundPage = () => {
  const router = useRouter()

  const [refundDetails, setRefundDetails] = useState({
    orderId: '',
    orderAmount: '',
    orderStatus: '',
    refundAmount: '',
    currency: 'USD'
  })

  const [getOrderLoading, setGetOrderLoading] = useState(false)
  const [refundLoading, setRefundLoading] = useState(false)

  const [refundResponse, setRefundResponse] = useState({})

  const handleChange = (key, val) => {
    setRefundDetails((prev) => ({
      ...prev,
      [key]: val
    }))
  }

  const handleGetOrder = async () => {
    setGetOrderLoading(true)
    setRefundDetails((prev) => ({
      ...prev,
      orderAmount: 0
    }))
    setRefundResponse({})

    await getOrderTransaction({ orderId: refundDetails.orderId })
      .then((res) => {
        setGetOrderLoading(false)
        setRefundDetails((prev) => ({
          ...prev,
          orderAmount: res?.data?.totalCapturedAmount || 0,
          orderStatus: res?.data?.status || '',
          refundAmount: res?.data?.totalCapturedAmount || 0
        }))
      })
      .catch((err) => {
        setGetOrderLoading(false)
        alert(err.error || err.message)
      })
  }

  const handleInitRefund = async () => {
    setRefundLoading(true)

    await refundPayment({
      orderId: refundDetails.orderId,
      refundAmount: refundDetails.refundAmount
    })
      .then((res) => {
        const order = res?.data?.order || {}
        setRefundLoading(false)
        setRefundResponse({
          'Order ID': order?.id,
          Status: order?.status,
          'Captured amount': `$${order?.totalCapturedAmount}`,
          'Refund amount': `$${order?.totalRefundedAmount}`
        })
      })
      .catch((err) => {
        setRefundLoading(false)
        setRefundResponse(err.error)
        alert(err.error.cause || 'Error while initiating refund')
      })
  }

  const inputCommonClass = 'border border-slate-500 rounded-md text-base px-2 py-1'

  return (
    <>
      <Button
        className={'bg-white text-black hover:text-black hover:border-none md:absolute'}
        style={{
          color: 'black'
        }}
        onClick={() => {
          router.back()
        }}>
        {'< Back'}
      </Button>
      <div className="container md:max-w-lg mx-auto mt-3">
        <p className="mb-5 text-lg font-semibold">Initiate Refund</p>
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2 mb-5">
            <p className="">Enter Order ID</p>
            <div className="w-full flex flex-col sm:flex-row gap-5">
              <input
                type="text"
                name="order-id"
                className={`${inputCommonClass} flex-1`}
                value={refundDetails.orderId}
                onChange={(e) => handleChange('orderId', e.target.value)}
              />
              <Button loading={getOrderLoading} onClick={handleGetOrder}>
                Get Order
              </Button>
            </div>
          </div>
          <hr className={'border-slate-300'} />
          {!!refundDetails.orderAmount && (
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="flex gap-5 items-center">
                <p className="font-semibold">Captured Amount:</p>
                <p className="">${refundDetails.orderAmount}</p>
              </div>
              <div className="flex gap-5 items-center">
                <p className="font-semibold">Order Status:</p>
                <p className="">{refundDetails.orderStatus}</p>
              </div>
              <div className="w-full flex flex-col gap-2 mt-5">
                <p className="">Enter Refund amount</p>
                <input
                  type="number"
                  name="order-id"
                  className={`${inputCommonClass} flex-1`}
                  value={refundDetails.refundAmount}
                  onChange={(e) => handleChange('refundAmount', e.target.value)}
                />
              </div>
              <Button
                className={'w-3/6 mx-auto mt-5'}
                loading={refundLoading}
                onClick={handleInitRefund}>
                Refund &nbsp; {refundDetails.refundAmount > 0 && `$${refundDetails.refundAmount}`}
              </Button>
              <div className="mt-10">
                <p className="font-semibold">Response:</p>
                {Object.keys(refundResponse).map((key) => (
                  <div className="flex gap-3" key={key}>
                    <p className="">{key}:</p>
                    <p className="">{refundResponse[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default RefundPage
