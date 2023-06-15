import React from 'react'
import './App.sass'
import Scheduler from './components/scheduler/Scheduler'

function App(): React.ReactNode {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <Scheduler></Scheduler>
    </div>
  )
}

export default App
