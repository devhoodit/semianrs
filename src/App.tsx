import React from 'react'
import './App.sass'
import Scheduler from './components/scheduler/Scheduler'

function App(): React.ReactNode {
  return (
    <div
      style={{
        height: '70vh',
        width: '70vw',
        backgroundColor: '#202020',
      }}
    >
      <Scheduler></Scheduler>
    </div>
  )
}

export default App
