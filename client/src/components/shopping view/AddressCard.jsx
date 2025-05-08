import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, editAddress, getAddress } from '@/redux/shop/address-slice'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent } from '../ui/dialog'
import CommonForm from '../common/Form'
import { addressFormControls } from '@/config'

const AddressCard = ({addressInfo}) => {
  const dispatch = useDispatch()
  const{user} = useSelector(state=>state.auth)
  const { toast } = useToast();
  const [showEditDilog, setshowEditDilog] = useState(false);
  const [formData, setformData] = useState(
    {address : addressInfo?.address,
    city : addressInfo?.city,
    pincode : addressInfo?.pincode,
    phoneno : addressInfo?.phoneno,
    landmark : addressInfo?.landmark});

  const handleDelete = async()=>{
    await dispatch(deleteAddress({
      addressId : addressInfo?._id,
      userId : user?._id
    }))
    await dispatch(getAddress({userId : user?._id}))
    toast({
      title : 'Address deleted',
      variant : 'success'
     })
  }

  const isFormValid = ()=>{
    return Object.keys(formData).map(key=> formData[key] !== '').every(item=>item)
   }

const handleEditAddress = async(e)=>{
e.preventDefault()
try {
  await dispatch(editAddress({
    userId : user?._id,
    formData,
    addressId : addressInfo?._id
   }))
   setshowEditDilog(false)
   await dispatch(getAddress({userId : user?._id}))
   toast({
     title : 'Address edited successfully',
     variant : 'success'
    })
} catch (error) {
  console.log(error)
}
}


  return (
    <>
 <Dialog
    open={showEditDilog}
    onOpenChange={() => {
      setshowEditDilog(false)  
    }}
  >
    <DialogContent className=" overflow-y-auto">
    <CommonForm
     formControls={addressFormControls}
     formData={formData}
     setFormData={setformData}
     buttonText="Edit"
     onSubmit={handleEditAddress}
     isBtnDisabled={!isFormValid()}
     />
    </DialogContent>
  </Dialog>

    <Card className='min-h-[200px] grid grid-rows-[1fr_auto]'>
        <CardContent className='grid gap-4 pt-2'>
        <Label className='line-clamp-2'>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phoneno}</Label>
        <Label>Landmark: {addressInfo?.landmark}</Label>
        </CardContent>
      <CardFooter className="p-3 flex justify-between ">
        <Button onClick={()=>setshowEditDilog(true)}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </CardFooter>

    </Card>
    </>
  )
}

export default AddressCard