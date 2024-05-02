"use client"

import dynamic from 'next/dynamic'
import React from 'react'


const Toast = () => {
  return (
    <div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body">
      Hello, world! This is a toast message.
    </div>
    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
  )
}

export default dynamic(() => Promise.resolve(Toast), {
    ssr: false,
  });
  