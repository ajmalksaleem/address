import { Card, CardContent} from '@/components/ui/card'
import { capturePayment } from '@/redux/shop/order-slice'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturn = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')


  useEffect(() => {
  if(paymentId && payerId){
   const currentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
    dispatch(capturePayment({paymentId, payerId, orderId : currentOrderId})).then((data)=>{
      if(data?.payload?.success){
       sessionStorage.removeItem('currentOrderId')
       window.location.href = '/shop/payment-success'
      }
    })
  }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
    <Card className="w-full max-w-md shadow-lg p-6 rounded-2xl border-slate-200">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <h2 className="text-xl font-semibold text-slate-700">Processing Payment...</h2>
        <p className="text-gray-500">Please wait while we confirm your transaction.</p>
      </CardContent>
    </Card>
  </div>
  )
}

export default PaypalReturn