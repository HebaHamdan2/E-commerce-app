import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import SendCode from './pages/SendCode'
import NotFound from './pages/NotFound'
import UserAccount from './pages/UserAccount'
import AllReviews from './pages/AllReviews'
import AllOrders from './pages/AllOrders'
import Favourite from './pages/Favourite'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/sendcode' element={<SendCode />} />
          <Route path='/account' element={<UserAccount />} />
          <Route path='/reviews' element={<AllReviews />} />
          <Route path='/orders' element={<AllOrders />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="*" element={<NotFound />} />
      </Route>
    )
  )
  
  return (
    <>
    
      <RouterProvider router={router} />
       <Toaster 
       toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: '#363636',
          color: '#fff',
        },
    
        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
       />
    </>
  )
}
export default App
