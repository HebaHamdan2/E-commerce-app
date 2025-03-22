import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import SendCode from './pages/SendCode'
import NotFound from './pages/NotFound'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/sendcode' element={<SendCode />} />
          <Route path="*" element={<NotFound />} />
      </Route>
    )
  )
  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
