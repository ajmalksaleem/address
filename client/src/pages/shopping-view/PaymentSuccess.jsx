import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const PaymentSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/shop")
    }, 3000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <Card className="w-full max-w-md shadow-xl p-6 rounded-2xl border-green-200">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="text-green-500 w-16 h-16 animate-bounce" />
          <h2 className="text-2xl font-semibold text-green-700">Payment Successful!</h2>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentSuccess
