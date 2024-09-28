import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Providers({children} : {children: React.ReactNode}) {
  return (
    <NextUIProvider>
      <ToastContainer position='top-center' hideProgressBar className='z-50'/>
      {children}
    </NextUIProvider>
  )
}

export default Providers