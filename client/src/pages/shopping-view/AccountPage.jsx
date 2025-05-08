import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShoppingOrders from '../../components/shopping view/Orders'
import Address from '../../components/shopping view/Address'


const AccountPage = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
         className="h-full w-full object-cover object-center"
          src='https://i.postimg.cc/htVg7Zxt/Chat-GPT-Image-Apr-15-2025-10-22-05-AM.jpg'
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="address">
            <TabsList>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="address">
              <Address />
            </TabsContent>
            <TabsContent value="orders">
            <ShoppingOrders />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default AccountPage