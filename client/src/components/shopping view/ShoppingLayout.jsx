import { Navigate, Outlet } from 'react-router-dom'
import ShHeader from './ShHeader'
import { useSelector } from 'react-redux'

const ShoppingLayout = () => {
  const {isAuthenticated ,user} = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  if ( user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <ShHeader/> 
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout
