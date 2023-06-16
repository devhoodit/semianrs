import React from 'react'
import './App.sass'
import SchedularHandler from './pages/scheduler/schedularHandler'

function App(): React.ReactNode {
  return (
    <div>
      <SchedularHandler QuaterListLink="https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/seminar.json"></SchedularHandler>
    </div>
  )
}

export default App
