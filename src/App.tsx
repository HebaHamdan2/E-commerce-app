import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import SendCode from './pages/SendCode'
import NotFound from './pages/NotFound'
import AllReviews from './pages/AllReviews'
import AllOrders from './pages/AllOrders'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'
import AuthRedirectRoute from './components/ProtectedRoute/AuthRedirectRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import ProductsByCatg from './pages/ProductsByCatg'
import ProductDetails from './pages/ProductDetails'
import ManageUserAccount from './pages/ManageUserAccount'
import WhishList from './pages/WhishList'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
         <Route element={<AuthRedirectRoute />}>
         <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/sendcode' element={<SendCode />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/products/:categoryId' element={<ProductsByCatg/>} />
        <Route path='/products/:categoryId/:slug' element={<ProductDetails/>} />
        <Route path='/whishlist' element={<WhishList/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path='/account' element={<ManageUserAccount />} />
          <Route path='/reviews' element={<AllReviews />} />
          <Route path='/orders' element={<AllOrders />} />
        </Route>
         
          <Route path="*" element={<NotFound />} />
      </Route>
    )
  )
  return (
    <> 
    <AuthProvider>
    <Provider store={store}>
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

    </Provider>
    </AuthProvider>
   
    </>
  )
}
export default App
