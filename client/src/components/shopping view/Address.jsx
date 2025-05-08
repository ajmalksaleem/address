import React, { useEffect, useState } from 'react' ;
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card' ;
import CommonForm from '../common/Form' ;
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, getAddress } from '@/redux/shop/address-slice';
import { useToast } from '@/hooks/use-toast';
import AddressCard from './AddressCard';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';


const Address = () => {
  const initialAddress =  {
    address : '',
    city : '',
    pincode : '',
    phoneno : '',
    landmark : ''
  }
  const [formData, setformData] = useState(initialAddress);
const [showNewAddress, setshowNewAddress] = useState(true);
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)
  const {addressData} = useSelector(state=>state.address)
    const { toast } = useToast();


const handleManageAddress = async(e)=>{
 try {
  e.preventDefault()
 const data = await dispatch(addAddress({
    ...formData, userId : user?._id
  }))
  setformData(initialAddress)
  toast({
    title : 'New address added',
    variant : 'success'
   })
await dispatch(getAddress({userId : user?._id}))
setshowNewAddress(true)
 } catch (error) {
  console.log(error)
 }
}

useEffect(() => {
 dispatch(getAddress({userId : user?._id}))
}, [dispatch]);

const handleShowAddAddress = ()=>{
  if(addressData?.length === 3){
    return toast({
      title : 'maximum 3 address can be added',
      variant : 'destructive'
     })
  }else{
    setshowNewAddress(false)
  }
}

const isFormValid = ()=>{
  return Object.keys(formData).map(key=> formData[key] !== '').every(item=>item)
 }


  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          addressData && addressData.length > 0 && addressData.map((address)=>(
            <AddressCard addressInfo ={address}/>
          ))
        }
      </div>
      {showNewAddress ? (
        <div className="flex justify-center p-4">       
          <Button variant="outline" onClick={ handleShowAddAddress}> <Plus/>Add New Address</Button>
        </div>
  ) : (
    <> 
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setformData}
          buttonText="Add"
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </>
  )}
      
    </Card>
  )
}

export default Address