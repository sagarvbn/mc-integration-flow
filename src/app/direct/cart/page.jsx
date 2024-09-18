'use client'

import { useState } from 'react'
import Cart from '@/components/Cart'
import { useRouter } from 'next/navigation'

const DirectCartPage = () => {
  const router = useRouter()
  const [totalAmount, setTotalAmount] = useState(0)

  const handleProceedToCheckout = () => {
    const orderId = `test-order-${Math.floor(1000 + Math.random() * 9000)}`
    router.push(`/direct/checkout?orderId=${orderId}&amount=${totalAmount}`)
  }

  return (
    <>
      <h3 className="text-2xl font-semibold mb-5">Direct Checkout Journey</h3>
      <Cart
        checkoutFun={handleProceedToCheckout}
        loading={false}
        setTotalAmount={setTotalAmount}
        totalAmount={totalAmount}
      />
    </>
  )
}

export default DirectCartPage
