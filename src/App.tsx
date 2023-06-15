import React from 'react'
import './App.sass'
import SchedulerHandler from './pages/scheduler/schedulerHandler'

function App(): React.ReactNode {
  return (
    <div>
      <SchedulerHandler QuaterListLink="https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/seminar.json"></SchedulerHandler>
    </div>
  )
}

export default App
