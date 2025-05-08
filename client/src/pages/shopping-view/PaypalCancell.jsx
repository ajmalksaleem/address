import { XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const PaypalCancell = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center h-screen bg-red-50">
      <Card className="w-full max-w-md shadow-lg p-6 rounded-2xl border-red-200">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <XCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-semibold text-red-700">Payment Cancelled</h2>
          <p className="text-gray-600">It looks like your PayPal payment was not completed.</p>
          <Button variant="outline" onClick={() => navigate("/shop/checkout")}>
            Retry Checkout
          </Button>
          <Button variant="ghost" onClick={() => navigate("/shop")}>
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaypalCancell
