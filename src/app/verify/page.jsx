'use client'

import { getOrderTransaction } from '@/api-requests'
import Button from '@/components/Button'
import CodeEditor from '@/components/CodeEditor'
import Input from '@/components/Input'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Verify = () => {
  const router = useRouter()
  const [orderId, setOrderId] = useState('')
  const [getOrderLoading, setGetOrderLoading] = useState(false)
  const [orderDetailedResponse, setOrderDetailedResponse] = useState({})

  const orderDetails = {
    'Order ID': orderDetailedResponse?.id,
    'Order Amount': `$${orderDetailedResponse?.amount}`,
    'Order Status': orderDetailedResponse?.status,
    'Created At': dayjs(orderDetailedResponse?.creationTime).format('DD-MM-YYYY || hh:mm a'),
    'Authorised Amount': `$${orderDetailedResponse?.totalAuthorizedAmount}`,
    'Captured Amount': `$${orderDetailedResponse?.totalCapturedAmount}`,
    'Refunded Amount': `$${orderDetailedResponse?.totalRefundedAmount}`,
    'Card Details': '',
    '  - Brand': orderDetailedResponse?.sourceOfFunds?.provided?.card?.brand,
    '  - Number': orderDetailedResponse?.sourceOfFunds?.provided?.card?.number,
    '  - Method': orderDetailedResponse?.sourceOfFunds?.provided?.card?.fundingMethod
  }

  const handleChange = (val) => {
    setOrderId(val)
  }

  const handleGetOrder = async () => {
    setGetOrderLoading(true)
    setOrderDetailedResponse({})

    await getOrderTransaction({ orderId })
      .then((res) => {
        setGetOrderLoading(false)
        setOrderDetailedResponse(res.data)
      })
      .catch((err) => {
        setGetOrderLoading(false)
        alert(err.error || err.message)
      })
  }

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
        <p className="mb-5 text-lg font-semibold">Verify Payment</p>
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2 mb-5">
            <p className="">Enter Order ID</p>
            <div className="w-full flex flex-col sm:flex-row gap-5">
              <Input
                type={'text'}
                name={'orderId'}
                className="flex-1"
                value={orderId}
                onChange={handleChange}
              />
              <Button loading={getOrderLoading} onClick={handleGetOrder}>
                Get Order
              </Button>
            </div>
          </div>
          {Object.keys(orderDetailedResponse).length > 0 && (
            <>
              <div className="mt-5">
                <p className="font-bold text-lg mb-3">Order Summary:</p>
                <div className="grid grid-cols-1 divide-y border px-5 py-2 rounded-md">
                  {Object.keys(orderDetails).map((key) => (
                    <div className="flex gap-3 border-b-1 py-1" key={key}>
                      <p className="font-semibold">{key}:</p>
                      <p className="">{orderDetails[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4  border-t-2 pt-4">
                <p className="font-semibold">Full Response:</p>
                <pre className="bg-slate-200 rounded-xl p-4 overflow-hidden">
                  {JSON.stringify(orderDetailedResponse, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Verify
