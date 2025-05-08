import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {

const dispatch = useDispatch()
const navigate = useNavigate()

  const LogoutUser = async()=>{
   await dispatch(logoutUser())
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
      <Menu onc/>
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1">
    <Button onClick={LogoutUser} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium '>
    <LogOut />
    Logout
    </Button>
      </div>
    </header>
  )
}

export default AdminHeader