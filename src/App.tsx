import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        {/* <Route path='/home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} /> */}
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
