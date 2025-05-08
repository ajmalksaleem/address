import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const AddressMenu = ({addressItem, addressInfo, setaddressInfo}) => {
  return (
    <Card 
      className={`border rounded-lg cursor-pointer transition-colors `}
        
    >
      <CardContent className="p-4 grid grid-cols-[auto_1fr] gap-4 items-start">
        <RadioGroup 
        value={addressInfo?._id} // check if current address is selected
        onValueChange={(value) => {
          if (value === addressItem._id) {
            setaddressInfo(addressItem);
          }
        }}
        >
          <RadioGroupItem
        value={addressItem._id}
          />
        </RadioGroup>

        <div className="space-y-1">
          <p className="text-sm">{addressItem?.address}</p>
          <p className="text-sm">
            {addressItem?.city}, {addressItem?.state} - {addressItem?.pincode}
          </p>
          <p className="text-sm">Phone: {addressItem?.phoneno}</p>
            <p className="text-sm text-muted-foreground">
              Landmark: {addressItem?.landmark}
            </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AddressMenu