'use client'

import { createOrderTransaction } from '@/api-requests'
import Button from '@/components/Button'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const DirectCheckoutPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderAmount = searchParams.get('amount')
  const orderId = searchParams.get('orderId')

  const [transactionResponse, setTransactionResponse] = useState({})
  const [loading, setLoading] = useState(false)

  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    number: '',
    securityCode: '',
    expiry: {
      month: '',
      year: ''
    }
  })

  const handleChange = (key, val) => {
    setCardDetails((prev) => ({
      ...prev,
      [key]: val
    }))
  }

  const handlePay = async () => {
    setLoading(true)
    setTransactionResponse({})
    await createOrderTransaction({
      orderId: orderId,
      orderDescription: `Test Order for OrderId: ${orderId}`,
      amount: orderAmount,
      currency: 'USD',
      paymentDetails: cardDetails
    })
      .then((res) => {
        setLoading(false)
        setTransactionResponse({
          'Order Id': res?.data?.order?.id,
          Amount: `$${res?.data?.order?.amount}`,
          Currency: res?.data?.order?.currency,
          Status: res?.data?.order?.status
        })
        alert('Transaction Successful!')
      })
      .catch((err) => {
        setLoading(false)
        setTransactionResponse(err)
        alert(err.error || err.message)
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
        <p className="mb-5 text-lg font-semibold">Enter card details</p>
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <p className="">Cardholder name</p>
            <input
              type="text"
              name="cardholder-name"
              className={`${inputCommonClass}`}
              value={cardDetails.cardholderName}
              onChange={(e) => handleChange('cardholderName', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="">Card number</p>
            <input
              type="number"
              name="card-number"
              className={`${inputCommonClass}`}
              value={cardDetails.number}
              onChange={(e) => handleChange('number', e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between gap-10 md:gap-20">
            <div className="flex flex-col gap-2">
              <p className="">Expiry</p>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="expiry-month"
                  placeholder="MM"
                  className={`w-[65px] ${inputCommonClass}`}
                  value={cardDetails.expiry.month}
                  onChange={(e) =>
                    setCardDetails((prev) => ({
                      ...prev,
                      expiry: {
                        ...prev.expiry,
                        month: e.target.value
                      }
                    }))
                  }
                />
                <p className="text-lg">/</p>
                <input
                  type="number"
                  name="expiry-month"
                  placeholder="YY"
                  className={`w-[65px] ${inputCommonClass}`}
                  value={cardDetails.expiry.year}
                  onChange={(e) =>
                    setCardDetails((prev) => ({
                      ...prev,
                      expiry: {
                        ...prev.expiry,
                        year: e.target.value
                      }
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="">Security Code</p>
              <input
                type="number"
                name="security-code"
                className={`${inputCommonClass}`}
                value={cardDetails.securityCode}
                onChange={(e) => handleChange('securityCode', e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button
          type={'submit'}
          className={'w-full mx-auto mt-10'}
          onClick={handlePay}
          loading={loading}
          disabled={
            !cardDetails.number ||
            !cardDetails.securityCode ||
            !cardDetails.expiry.month ||
            !cardDetails.expiry.year ||
            !cardDetails.cardholderName
          }>
          Pay &nbsp; ${orderAmount}
        </Button>
        <div className="mt-10">
          <p className="font-semibold">Response:</p>
          {Object.keys(transactionResponse).map((key) => (
            <div className="flex gap-3" key={key}>
              <p className="">{key}:</p>
              <p className="">{transactionResponse[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DirectCheckoutPage
