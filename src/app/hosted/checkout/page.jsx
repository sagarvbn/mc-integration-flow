'use client'

import { CHECKOUT_SESSION_KEY } from '@/config'
import { useEffect } from 'react'

const HostedCheckoutPage = () => {
  // Configure Checkout
  useEffect(() => {
    if (window) {
      setTimeout(() => {
        window.Checkout.configure({
          session: {
            id: sessionStorage.getItem(CHECKOUT_SESSION_KEY).toString()
          }
        })
        window.Checkout.showEmbeddedPage('#mpgs-embedded')
      }, 1000)
    }
  }, [])

  return <div id="mpgs-embedded" className="max-w-3xl mx-auto"></div>
}

export default HostedCheckoutPage
