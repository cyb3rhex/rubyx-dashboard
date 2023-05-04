import React from 'react'

function Main({ children }) {
  return (
    <main className="h-screen overflow-y-auto">
      <div className="px-6 mx-auto">{children}</div>
    </main>
  )
}

export default Main
