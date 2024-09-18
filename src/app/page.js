'use client'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="max-w-lg mx-auto mt-20 flex flex-col items-center gap-10">
      <Button
        className={'w-5/6'}
        onClick={() => {
          router.push('/hosted/cart')
        }}>
        Hosted Checkout Journey
      </Button>

      <Button
        className={'w-5/6'}
        onClick={() => {
          router.push('/direct/cart')
        }}>
        Direct Checkout Journey
      </Button>

      <Button
        className={'w-5/6'}
        onClick={() => {
          router.push('/verify')
        }}>
        Verify a Payment
      </Button>

      <Button
        className={'w-5/6'}
        onClick={() => {
          router.push('/refund')
        }}>
        Initiate Refund
      </Button>
    </div>
  )
}
